export class CompanyDto {
    id?: string;
    name?: string;
    rut?: string;
    phone?: string;
    contact?: string;
    email?: string;
    logo?: string;
    dateCreated?:number = Date.now();    
    
    active?: boolean;
    address?: string;
    comments?: string;
    company?: string;
    contactName?: string;
    contactPhone?: string;
    contactPosition?: string;
    authorizedUsers?: string[];
    fechaReg?: any;
    status?: string;
    licenses?: number;
    plan?: string;
}