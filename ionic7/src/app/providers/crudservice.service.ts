import { Injectable } from '@angular/core';
import * as firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { limit, OrderByDirection } from 'firebase/firestore';
import { QuerySnapshot } from 'firebase/firestore';
import { UserAdmDto } from '../core/dto/user-adm.dto';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Injectable({
  providedIn: 'root'
})
export class CrudService<TMain, TSub = any, TSub2 = any, TSub3 = any> {

  private collection: AngularFirestoreCollection<TMain>;

  private downloadURL: string = '';
  private snapshotChangesSubscription: any;

  private table = 'NoTable';
  private subTable = 'NoSubtable';
  private subTable2 = 'NoSubtable2';
  private subTable3 = 'NoSubtable3';


  constructor(public afs: AngularFirestore, private afStorage: AngularFireStorage,
    private auth: AngularFireAuth) {
    this.collection = this.afs.collection<TMain>('nombreDeLaColeccion');
  }

  getSubcollectionPagination(docId: string, last:string) {
      
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable, ref => ref
        .orderBy("number")
        .startAfter(last)
        .limit(20)
      )
      .snapshotChanges()
      .pipe<TSub[]>(
        map(
          changes => {
            return changes
              .map(a => {
                const data: any = a.payload.doc.data();
                data['id'] = a.payload.doc.id;

                return data as TSub;
              });
          }
        ));
  }

  querySubCollectionPagination(mainId: string, field: string, comparer: any = 'array-contains', value: any, last: string) {
    let ref = this.afs.collection<TSub>(`${this.table}/${mainId}/${this.subTable}`).ref;

    return ref
      .where(field, comparer, value)
      .orderBy("number")
      .startAfter(last)
      .limit(20)
      .get()
      .then(sShot => {
        let docs: TSub[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data: any  = m.data();
              data['id'] = m.id;

              return data as TSub;
            });
        }

        return docs;
      });
  }

  querySubCollectionPaginationOrder(mainId: string, field: string, comparer: any = 'array-contains', value: any,order:string, last: string,limit:number,direction:OrderByDirection = 'asc') {
    let ref = this.afs.collection<TSub>(`${this.table}/${mainId}/${this.subTable}`).ref;

    if(last){
      return ref
      .where(field, comparer, value)
      .orderBy(order,direction)
      .startAfter(last)
      .limit(limit)
      .get()
      .then(sShot => {
        let docs: TSub[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data: any  = m.data();
              data['id'] = m.id;

              return data as TSub;
            });
        }

        return docs;
      });
    }else{
      return ref
      .where(field, comparer, value)
      .orderBy(order,direction)
      .limit(limit)
      .get()
      .then(sShot => {
        let docs: TSub[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data: any  = m.data();
              data['id'] = m.id;

              return data as TSub;
            });
        }

        return docs;
      });
    }
    
  }

  newCrudInstance<T1, T2 = any, T3 = any>() {
    return new CrudService<T1, T2, T3>(this.afs, this.afStorage, this.auth);
  }

  setTable(name: string) {
    this.table = name;
    this.collection = this.afs.collection<TMain>(`/${this.table}`);
  }

  setSubtable(collection: string) {
    this.subTable = collection;
  }

  setSubtable2(collection: string) {
    this.subTable2 = collection;
  }

  setSubtable3(collection: string) {
    this.subTable3 = collection;
  }

  uploadBase64(file: any, country: any, name:any){
    const randomId = Math.random().toString(36).substring(2);
    const storageRef = this.afs.firestore.app.storage().ref();
    const uploadTask = storageRef.child(`/${this.table}/${country}/${name}`).putString(file, 'base64', {contentType:'application/pdf'});
    return new Promise<any>((resolve, reject) => {
      uploadTask.on(
        // firebase.storage.TaskEvent.STATE_CHANGED,
        'state_changed',
        (snapshot) => { 
          //console.log('SNA::>',snapshot) 
        },
        (error) => { 
          //console.log(error)
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.downloadURL = downloadURL;
            //console.log('File available at', downloadURL);
            resolve(this.downloadURL);
          });
        }
      );
    });
  }

  uploadAvt(file:any) {
    const randomId = Math.random().toString(36).substring(2);

    const storageRef = this.afs.firestore.app.storage().ref();
    const uploadTask = storageRef.child(`/${this.table}/` + randomId).put(file);

    return new Promise<any>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => { },
        (error) => { },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.downloadURL = downloadURL;
            //console.log('File available at', downloadURL);
            resolve(this.downloadURL);
          });
        }
      );
    });
  }

  uploadPhoto(TMainDocId: string, fileName: string, file: string, storagePath?: string) {


    let filePath = '';

    if (storagePath) {
      filePath = `${storagePath}/${fileName}`;
    } else {
      filePath = `/${this.table}` +
        `${(TMainDocId) ? '/' + TMainDocId : ''}` +
        `${(this.subTable) ? '/' + this.subTable : ''}` +
        `/${fileName}`;
    };

    /*     const imageRef = storageRef.child(filePath);

        return imageRef.putString('data:image/jpeg;base64,' + file, firebase.storage.StringFormat.DATA_URL); */

    return <Promise<string>>this.afStorage
      .ref(filePath)
      .putString('data:image/jpeg;base64,' + file, firebase.default.storage.StringFormat.RAW)
      .then(data => {
        return data.ref.getDownloadURL();
      });
  }

  getCollection() {
    return this.collection
      .snapshotChanges()
      .pipe<TMain[]>(
        map(changes => {
          return changes
            .map(a => {
              const data: any  = a.payload.doc.data();
              data['id'] = a.payload.doc.id;

              return data as TMain;
            });
        }
        ));
  }

  queryCollectionPaginationOrder(field: any[], comparer: any[] = ['array-contains'], value: any[],
                             last: any , order:any[], limit: any , direction = 'asc'): Promise<TMain[]> {

    let query: any = this.collection.ref;
    for (let i = 0; i < field.length; i++) {
      query = query.where(field[i], comparer[i], value[i])
    }

    for (let e = 0; e < order.length; e++){
      query = query.orderBy(order[e],direction);
    }

    if(last){
      return query
      // .orderBy(order,direction)
      .startAfter(last)
      .limit(limit)
      // .where(field, comparer, value)
      .get()
      .then((sShot: QuerySnapshot<any>) => {
        let docs: TMain[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
    }else{
      return query
      // .orderBy(order,direction)
      .limit(limit)
      // .where(field, comparer, value)
      .get()
      .then((sShot: QuerySnapshot<any>) => {
        let docs: TMain[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
    }

    
  }

  queryCollectionPagination2(field: any[], comparer: any[] = ['array-contains'], value: any[],
                             last: any , order: any , limit: any , direction = 'asc'): Promise<TMain[]> {

    let query: any = this.collection.ref;
    for (let i = 0; i < field.length; i++) {
      query = query.where(field[i], comparer[i], value[i])
    }

    if(last){
      return query
      .orderBy(order,direction)
      .startAfter(last)
      .limit(limit)
      // .where(field, comparer, value)
      .get()
      .then((sShot: QuerySnapshot<any>) => {
        let docs: TMain[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
    }else{
      return query
      .orderBy(order,direction)
      .limit(limit)
      // .where(field, comparer, value)
      .get()
      .then((sShot: QuerySnapshot<any>) => {
        let docs: TMain[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
    }

    
  }

  querySubcollectionPagination2(mainId: string,field: any[], comparer: any[] = ['array-contains'], value: any[],
                             last: any , order: any , limit: any , direction = 'asc'): Promise<TSub[]> {

    let query: any = this.afs.collection<TSub>(`${this.table}/${mainId}/${this.subTable}`).ref;
    for (let i = 0; i < field.length; i++) {
      query = query.where(field[i], comparer[i], value[i])
    }

    if(last){
      return query
      .orderBy(order,direction)
      .startAfter(last)
      .limit(limit)
      // .where(field, comparer, value)
      .get()
      .then((sShot: QuerySnapshot<any>) => {
        let docs: TSub[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TSub;
            });
        }

        return docs;
      });
    }else{
      return query
      .orderBy(order,direction)
      .limit(limit)
      // .where(field, comparer, value)
      .get()
      .then((sShot: QuerySnapshot<any>) => {
        let docs: TMain[] = [];
      
        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;
      
              return data as TMain;
            });
        }
      
        return docs;
      });
    }

    
  }

  querySubCollection2Pagination(mainId: string,mainId2: string, field: string, comparer: any = 'array-contains', value: any, order: any, last: any, number: any,direction: any = 'desc') {
    let ref = this.afs.collection<TSub2>(`${this.table}/${mainId}/${this.subTable}/${mainId2}/${this.subTable2}`).ref;

    if(last){
      return ref
      .orderBy(order,direction)
      .startAfter(last)
      .limit(number)
      .where(field, comparer, value)
      .get()

      .then(sShot => {
        let docs: TSub2[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data: any  = m.data();
              data['id'] = m.id;

              return data as TSub2;
            });
        }

        return docs;
      });
    }else{
      return ref
      .orderBy(order,direction)
      .limit(number)
      .where(field, comparer, value)
      .get()

      .then(sShot => {
        let docs: TSub2[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data: any  = m.data();
              data['id'] = m.id;

              return data as TSub2;
            });
        }

        return docs;
      });
    }
    
  }

  

  queryCollection2(field: any, comparer: any, value: any) {
    let query: any = this.collection.ref;
    for (let i = 0; i < field.length; i++) {
      query = query.where(field[i], comparer[i], value[i])
    }
    return query
    // .orderBy('nombreCompleto').startAt(value[0]).endAt(value[0]+'\uf8ff')
      // .limit(10000)
      .get()
      .then((sShot: QuerySnapshot<any>) => {
        let docs: TMain[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
  }

  queryCollection(field: string, comparer: any = 'array-contains', value: any) {
    return this.collection.ref
      .where(field, comparer, value)
      .get()
      .then(sShot => {
        let docs: TMain[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data: any  = m.data();
              data['id'] = m.id;

              return data as TMain;
            });
        }

        return docs;
      });
  }

  querySubCollection(mainId: string, field: string, comparer: any = 'array-contains', value: any) {
    let ref = this.afs.collection<TSub>(`${this.table}/${mainId}/${this.subTable}`).ref;

    return ref
      .where(field, comparer, value)
      .get()
      .then(sShot => {
        let docs: TSub[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data: any  = m.data();
              data['id'] = m.id;

              return data as TSub;
            });
        }

        return docs;
      });
  }

  addToCollection(data: TMain) {
    let d: any = data;
    return this.collection.add({ ...d });
  }

  copyTo(path: string, data: any) {
    let d: any = data;
    let ref = this.afs.doc(path);

    return ref.set({ ...d });
  }

  copyToCollection(data: TMain) {
    let path = `/${this.table}/${(data as any).id}`;

    return this.copyTo(path, data);
  }

  getDocument(id: string) {
    return this.collection.doc<TMain>(id)
      .valueChanges()
      .pipe<TMain>(
        map<TMain | undefined, TMain>(a => {
          if (a) {
            (a as any).id = id;
          }
  
          return a as TMain;
        })
      );
      }

  updateDocument(doc: Partial<TMain>) {
    const id = (doc as any).id;
    return this.collection.doc<TMain>(id).update(doc);
  }

  deleteDocument(id: string) {
    return this.collection.doc<TMain>(id)
      .delete();
  }

  getSubcollection(docId: string, ) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .snapshotChanges()
      .pipe<TSub[]>(
        map(
          changes => {
            return changes
              .map(a => {
                const data: any  = a.payload.doc.data();
                data['id'] = a.payload.doc.id;

                return data as TSub;
              });
          }
        ));
  }

  

  getSubcollectionByTable<T>(table: string, docId: string) {
    return this.collection.doc<TMain>(docId)
      .collection<T>(table)
      .snapshotChanges()
      .pipe<T[]>(
        map(
          changes => {
            return changes
              .map(a => {
                const data: any  = a.payload.doc.data();
                data['id'] = a.payload.doc.id;

                return data as T;
              });
          }
        ));
  }

  getSubcollection2(docId: string, SubId: string) {

    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable).doc(SubId)
      .collection<TSub2>(this.subTable2)
      .snapshotChanges()
      .pipe<TSub2[]>(
        map(
          changes => {
            return changes
              .map(a => {
                const data: any  = a.payload.doc.data();
                data['id'] = a.payload.doc.id;

                return data as TSub2;
              });
          }
        ));
  }

  getSubcollection3(docId: string, SubId: string, Sub2Id: string) {

    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable).doc(SubId)
      .collection<TSub2>(this.subTable2).doc(Sub2Id)
      .collection<TSub3>(this.subTable3)
      .snapshotChanges()
      .pipe<TSub3[]>(
        map(
          changes => {
            return changes
              .map(a => {
                const data: any  = a.payload.doc.data();
                data['id'] = a.payload.doc.id;

                return data as TSub3;
              });
          }
        ));
  }

  getSubcollectionDoc(docId: string, subDocId: string) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc<TSub>(subDocId)
      .valueChanges()
      .pipe<TSub>(
        map<TSub | undefined, TSub>((a:any) => {
          if (a) {
            (a as any).id = subDocId;
          }

          return a;
        })
      );
  }



  getSubcollectionDoc2(docId: string, subDocId: string, _id: string) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(subDocId)
      .collection<TSub2>(this.subTable2)
      .doc<TSub2>(_id)
      .valueChanges()
      .pipe<TSub2>(
        map<TSub2 | undefined, TSub2>((a:any) => {
          if (a) {
            a['id'] = _id;
          }

          return a;
        })
      );
  }

  addToSubcollection(docId: string, data: TSub) {
    let d: any = data;
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .add({ ...d });
  }

  copyToSubcollection(docId: string, data: TSub) {
    let path = `/${this.table}/${docId}/${this.subTable}/${(data as any).id}`;

    return this.copyTo(path, data);
  }

  copyToSubcollectionWithTable(subTable: string, docId: string, data: TSub) {
    let path = `/${this.table}/${docId}/${subTable}/${(data as any).id}`;

    return this.copyTo(path, data);
  }

  addToSubcollection2(docId: string, SubId: string, data: TSub2) {
    let d: any = data;
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(SubId)
      .collection<TSub2>(this.subTable2)
      .add({ ...d });
  }

  copyToSubcollection2(docId: string, data: any) {
    let path = `/${this.table}/${docId}/${this.subTable2}/${data['id']}`;

    return this.copyTo(path, data);
  }

  updateSubcollectionDoc(docId: string, data: Partial<TSub>) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc<TSub>((data as any).id)
      .update(data);
  }

  updateSubcollectionDoc2(docId: string, subId: string, data: Partial<TSub2>) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(subId)
      .collection<TSub2>(this.subTable2)
      .doc<TSub2>((data as any).id)
      .update(data);
  }

  deleteSubcollectionDoc(docId: string, subDocId: string) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc<TSub>(subDocId)
      .delete();
  }

  deleteSubcollectionDoc2(docId: string, subDocId: string, _id: string) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(subDocId)
      .collection<TSub2>(this.subTable2)
      .doc(_id)
      .delete();
  }

  deleteSubcollectionDoc3(docId: string, subDocId: string, sub3DocId: any, _id: string) {
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(subDocId)
      .collection<TSub2>(this.subTable2)
      .doc(sub3DocId)
      .collection<TSub3>(this.subTable3)
      .doc(_id)
      .delete();
  }

  
  queryAnyTablePagination<T>(tablePath: string, field: any[], comparer: any[] = ['array-contains'], value: any[],
                              last: any = undefined, order: any = undefined, rowLimit: number, direction = 'desc'): Promise<T[]> {

    let query: any = this.afs.collection<T>(tablePath).ref;

    for (let i = 0; i < field.length; i++) {
      query = query.where(field[i],comparer[i],value[i])
    }

    if (order) {
      query = query.orderBy(order, direction);
    }

    if (rowLimit) {
      query = query.limit(rowLimit);
    }

    if (last) {
      query = query.startAfter(last);
    }

    if(last){
      return query
      // .orderBy(order, direction)
      // .limit(rowLimit)
      // .startAfter(last)
      //.where(field, comparer, value)
      .get()
      .then((sShot: QuerySnapshot<any>) => {
        let docs: T[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as T;
            });
        }

        return docs;
      });
    }else{
      return query
      // .orderBy(order, direction)
      // .limit(rowLimit)
      //.where(field, comparer, value)
      .get()
      .then((sShot: QuerySnapshot<any>) => {
        let docs: T[] = [];

        if (!sShot.empty) {
          docs = sShot.docs
            .map(m => {
              let data = m.data();
              data['id'] = m.id;

              return data as T;
            });
        }

        return docs;
      });
    }

  }



  addToSubcollection3(docId: string, SubId: string, Sub2Id: string, data: TSub3) {
    let d: any = data;
    return this.collection.doc<TMain>(docId)
      .collection<TSub>(this.subTable)
      .doc(SubId)
      .collection<TSub2>(this.subTable2)
      .doc(Sub2Id)
      .collection<TSub3>(this.subTable3)
      .add({ ...d });
  }

  deleteWord:any = ['a','e','y','o','u','la','de','el','mi','es','un','en','uno','una','por','las','los','del','con','por','que','nos','son','']
  getArraySearch(listString:string[]){
    let returnArray:any = [];
    listString.forEach(list => {
      // Convertir todo en minuscula y quitar acentos
      if(list){
        list = this.removeAccents(list.toLocaleLowerCase());
        // Convertir en array
        let arrayWord = list.split(' ');
        arrayWord = arrayWord.filter(word =>{
          return this.goDeleteWord(word);
        })      
        // console.log(arrayWord);
        arrayWord.forEach(aw =>{
          if(this.goSaveWord(aw,returnArray)){
            returnArray.push(aw);
          }
        }) 
      }
      
    });    
    return returnArray;   
  }

  getArraySearchDes(listString:string[]){
    let returnArray:any = [];
    listString.forEach(list => {
      // Convertir todo en minuscula y quitar acentos
      if(list){
        list = this.removeAccents(list.toLocaleLowerCase());
        // Convertir en array
        let arrayWord = list.split(' ');
        arrayWord = arrayWord.filter(word =>{
          return this.goDeleteWord(word);
        })      
        // console.log(arrayWord);
        arrayWord.forEach(aw =>{
          if(this.goSaveWord(aw,returnArray)){
            // returnArray.push(aw);
            // let p = aw.substring(0,aw.length-1);
            // while(p.length > 2){
            //   returnArray.push(p);
            //   p = aw.substring(0,p.length-1);
            // }
            let p0 = aw;
            while(p0.length > 2){              
              returnArray.push(p0);
              let p1 = p0;
              p1 = p1.substring(0,p1.length-1);
              while(p1.length > 2){
                returnArray.push(p1);
                p1 = p1.substring(0,p1.length-1);
              }
              let p2 = p0;
              p2 = p2.substring(1,p2.length);
              while(p2.length > 2){
                returnArray.push(p2);                
                p2 = p2.substring(1,p2.length);
              }
              p0 = p0.substring(1,p0.length - 1);
            }
          }
        }) 
      }
      
    });    
    return returnArray;   
  }

  goSaveWord(word: any ,returnArray: any ){
    let filter = true;
    returnArray.forEach((w: any) =>{
      if(w == word){
        filter = false;
      }
    })
    return filter;
  }

  removeAccents(input: any ) {
    var acentos = "ãàáäâèéëêìíïîòóöôùúüûÇç";
    var original= "aaaaaeeeeiiiioooouuuucc";
    for (var i = 0; i < acentos.length; i++) {
      input = input.replace(acentos.charAt(i), original.charAt(i)).toLowerCase();
    };
    return input;
  }

  goDeleteWord(word: any ){
    if(word.length<3){
      return false;
    }
    let filter = true;
    this.deleteWord.forEach((w:any) =>{
      if(w == word){
        filter = false;
      }
    })
    return filter;
  }

  Login(user: any) {
    return this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  getCurrentUser() {
      return this.auth.currentUser;
    }

  logout(){
    return this.auth.signOut();
  }  

  resetPassword(email: any) {
    return this.auth.sendPasswordResetEmail(email);
  }


}
