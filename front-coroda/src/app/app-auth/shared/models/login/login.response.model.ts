export interface ILoginResponseModel{
    loginId: number;
    rol: string;
    email: string;
    information: LoginInformationUser;
}


export interface LoginInformationUser{
    idPerson: number;
    typeDocument: string;
    typePerson: string;
    numberDocument: number;
    name: string;
    lastName1: string;
    lastName2: string;
    socialReason: string;
    address: string;
    email: string;
    phone: number;
   
}