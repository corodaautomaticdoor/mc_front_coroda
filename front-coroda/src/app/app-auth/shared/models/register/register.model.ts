import { IRegisterResponseModel } from "./register.response.model";

export class RegisterModel{
    typeDocument: number;
    typePerson: number;
    numberDocument: number;
    name: string;
    lastName1: string;
    lastName2: string;
    socialReason: string;
    address: string;
    email: string;
    phone: number;
    constructor(model: IRegisterResponseModel){
        this.email = model.email;
        this.typeDocument = model.typeDocument;
        this.typePerson = model.typePerson;
        this.numberDocument = model.numberDocument;
        this.name = model.name;
        this.lastName1 = model.lastName1;
        this.lastName2 = model.lastName2;
        this.socialReason = model.socialReason;
        this.address = model.address;
        this.email = model.email;
        this.phone = model.phone;
    }
}

