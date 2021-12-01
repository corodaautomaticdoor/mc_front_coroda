import { ILoginResponseModel, LoginInformationUser } from "./login.response.model";

export class LoginModel{
    loginId: number;
    rol: string;
    email: string;
    idPerson: number;
    typeDocument: string;
    typePerson: string;
    numberDocument: number;
    name: string;
    lastName1: string;
    lastName2: string;
    socialReason: string;
    address: string;
    phone: number;
    constructor(model: ILoginResponseModel){
        this.loginId = model.loginId;
        this.rol = model.rol;
        this.idPerson = model.information.idPerson;
        this.typeDocument = model.information.typeDocument;
        this.typePerson = model.information.typePerson;
        this.numberDocument = model.information.numberDocument;
        this.name = model.information.name;
        this.lastName1 = model.information.lastName1;
        this.lastName2 = model.information.lastName2;
        this.socialReason = model.information.socialReason;
        this.address = model.information.address;
        this.email = model.information.email;
        this.phone = model.information.phone;
    }
}