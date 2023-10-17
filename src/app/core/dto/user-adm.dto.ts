export class UserAdmDto {
    id?: string;
    email?: string;
    fullName?: string;
    phone?: string;
    isDelete?= false;
    isAdmin?= true;
    dateCreated?:number = Date.now();
arraySearch?: [];
    level?: number; //1 Admin
    location?: string; 
    country?: string;
}
