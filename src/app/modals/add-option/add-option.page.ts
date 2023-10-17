import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DbTables } from 'src/app/core/constants/db-tables.constant';
import { CardsDto } from 'src/app/core/dto/cards.dto';
import { CategoryDto } from 'src/app/core/dto/category.dto';
import { CrudService } from 'src/app/providers/crud.service';

@Component({
  selector: 'app-add-option',
  templateUrl: './add-option.page.html',
  styleUrls: ['./add-option.page.scss'],
})
export class AddOptionPage implements OnInit {

  @Input() option:any = {};
  @Input()
  categories!: CategoryDto[];
  category:CategoryDto = new CategoryDto();
  cards:CardsDto[] = [];
  nameBottom:string = '';
  categoryColor: any;
  optionType:any;
  types:any = [{
    value:'No',
    id:0
  },{
    value:'Si',
    id:1
  },{
    value:'Continuar',
    id:2
  },{
    value:'Otro',
    id:3
  }]

  constructor(
    private modalCtrl:ModalController,
    private crudCards:CrudService<CardsDto>,
  ) {
    this.crudCards = this.crudCards.newCrudInstance();
    this.crudCards.setTable(DbTables.Cards);
  }

  ngOnInit() {
    // console.log(this.option);
    if(this.option.categoryId){
      this.categories.forEach(c =>{
        if(c.id == this.option.categoryId){
          this.category = c;
          this.getCategory();
        }
      })
    }  
  }

  changeOption(){
    // console.log(this.optionType);
    this.option.title = '';
    
  }

  selectedCards(item:CardsDto){
    this.option.cardsId = item.id;
    this.option.cardsQuestion = item.question;
    this.option.categoryId = this.category.id;
    this.option.categoryName = this.category.name;
  }
   
  goCategory(category:CategoryDto){
    this.category = category;
    this.getCategory();
  }

  getCategory(){
    this.crudCards.queryCollection('categoryId','==',this.category.id).then(data =>{
      // console.log(data);
      this.cards = data;
    })
  }

  add(){
    if(this.optionType){
      this.option.type = this.optionType.id;
      if(this.optionType.id < 3) {
        this.option.title = this.optionType.value;
      }
      // console.log(this.option);      
      this.modalCtrl.dismiss(this.option);
    }
    
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
