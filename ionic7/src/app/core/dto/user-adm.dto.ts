export class UserAdmDto {
    id?: string;
    email?: string;
    fullName?: string;
    phone?: string;
    location?: string; //Mantenimiento correctivo, Mantenimiento preventivo, Garantía
    isDelete?= false;
    isAdmin?= false;
    country?: string;
    level?: number; //1 superadmin - 2 admin country - 3 user bodega - 4 user taller
    password?: string;
}
