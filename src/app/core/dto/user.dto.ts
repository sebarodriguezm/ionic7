export class UserDto {
  id?: string;
  email?: string;
  fullName?: string;
  phone?: string;
  isDelete?= false;
  isAdmin?= false;
  isUser?:boolean;
  isSuperAdmin?:boolean = false;
  country?: string;
  warehouseName?: string;
  warehouseId?: string;
  positionName?: string;
  positionId?: string;
  location?: string;
  level?: string;
  dateCreated?:number = Date.now(); 
  address?: string;
  position?: string;
  customerId?: string;
  company?: string;
  companyId?: string;
  deviceLogin?:any;
  deviceAll?:any;
  arraySearch?:any = [];
  photo?: any;
  sex?:string;
  birthday?:number;
  commune?:string;
  region?:string;

  challengeCompleted?:number = 0;
  challengeProccess?:number = 0;
  congratulations?:number = 0;
}
