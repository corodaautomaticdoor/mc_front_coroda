import { ILoginResponseModel } from "./login.response.model";

export class LoginModel{
    email: string;
    password: string;
    rolId: string;
    constructor(model: ILoginResponseModel){
        this.email = model.email;
        this.password = model.password;
        this.rolId = model.rolId;
    }
}