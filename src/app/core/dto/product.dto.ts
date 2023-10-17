export class ProductDto {
    id?: number;
    name?: string;
    image?: any;
    images?: [];
    extract?: string;
    description?: string;
    price?: number;
    discountPrice?: number;
    category?: string;
    arraySearch?: any = [];
}