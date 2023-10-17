import { UserInteractionSummary } from "./user-interaction-summary.dto";

export class AnswerDto {
    id?: string; //dto de los desafíos
    userId?:string;
    userName?:string;
    title?:string;
    dateCreated?:number = Date.now();
    dateEnd?:number;
    problem?:string;
    cardQuestionStart?:string;
    cardIdStart?:string;
    identifier?:string;
    cardQuestionNext?:string;
    cardCategoryIcon?:string;
    cardCategoryColor?:string;
    cardIdNext?:string;
    cardCounts?:number = 0;
    nivelSolution?:number = 0;
    status?:number = 1; //1:Activa, 0:Solucionado
    answers?:any = []; //{{ codeId, cardId:'', cardQuestion:'', answer:'', dateCreated:'', dateEnd:'',text:'', answerType: bool, continue: bool, modelQuestion:'', typeResolution: 'individual,mixta,colectiva'}}
    users?:any = [];
    userInteractionSummary?: UserInteractionSummary;

    arraySearch?:any = [];
    resultSearch?:number = 0;
}
