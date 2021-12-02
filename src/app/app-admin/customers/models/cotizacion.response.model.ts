export interface ICotizacionResponseModel {
    operationId: number;
    typeOperation: string;
    date: string;
    hour: string;
    numberDocument: number;
    client: Client;
    detail: Detail[];
    totalAmount: number;
}

export interface Client {
    typeDocument: string;
    typePerson: string;
    name: string;
    lastName1: string;
    lastName2: string;
    socialReason?: any;
    address: string;
    email: string;
    phone: number;
}

export interface Product {
    category: string;
    subCategory: string;
    brand: string;
    description: string;
    origin: string;
    material: string;
    dimensions: string;
    color: string;
    image: string;
}

export interface NewStyleProduct {
    newStyleId: number;
    color: string;
    dimention: string;
}

export interface Detail {
    detailId: number;
    operationId: number;
    model: string;
    product: Product;
    newStyleProduct: NewStyleProduct[];
    quantity: number;
    priceUnit: number;
    totalDetailAmount: number;
    newStyleProductDescription?: string;
}