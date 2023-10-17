export class WallDto {
    id?:string;
    userId?:string;
    userName?:string;
    problem?:string;
    text?:string;
    photo?: string;
    dateCreated?:number = Date.now();
    status?:number = 1; //1:active, 0:no-active
    like?:any = []; //{userId:'',userName:'',dateCreated:''}
    comment?:any = [] //{text:'',userId:'',userName:'',dateCreated:''} 
}