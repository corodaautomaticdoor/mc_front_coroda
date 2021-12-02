export interface ICheckoutRequestModel{
    survey: ISurvey[];
}

export interface ISurvey{
    numberQuestion: string;
    question: string;
    valor: string;
}