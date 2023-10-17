export class CardsDto {//Si
    id?: string;
    codigo?:string;
    categoryId?: string;
    categoryName?:string;
    categoryColor?:string;
    categoryIcon?:string;
    photo?:any;
    video?:string;
    length?: string;
    link?:string;
    lottie?:string;
    finish?:boolean = false;
    initiation?:boolean;//no
    textarea?:boolean;//no
    uniqueOption:boolean = false
    help?: string;
    question?: string;
    options:any;//{{title:'', cardsId:'',cardsQuestion:'', counts:0, finish:false, textarea:bolean}}
    isActive: boolean = true;
    dateCreated: number = Date.now();
    reflection?:string;
    recommendation?:string;
    arraySearch?: [];
}