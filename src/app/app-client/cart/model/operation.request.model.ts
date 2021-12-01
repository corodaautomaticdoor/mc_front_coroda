export interface IOperationRequestModel{
    typeOperation: number;
    numberDocument: string;
    detail: IDetailProduct[]
}

export interface IDetailProduct{
    model: string;
    quantity: number;
    newStyleProduct: INewStyleProduct[]
}

export interface INewStyleProduct{
    color: string;
    dimention: string;
}