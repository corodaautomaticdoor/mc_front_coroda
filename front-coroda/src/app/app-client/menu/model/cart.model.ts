import { ICartResponseModel } from "./cart.response.model";

export class CartModel{
    id: number;
    category: string;
    subCategory: string;
    model: string;
    brand: string;
    description: string;
    origin: string;
    material: string;
    dimensions: string;
    color: string;
    priceUnit: number;
    image: string;
    constructor(model: ICartResponseModel){
        this.id = model.id;
        this.category = model.category;
        this.subCategory = model.subCategory;
        this.model = model.model;
        this.brand = model.brand;
        this.description = model.description;
        this.origin = model.origin;
        this.material = model.material;
        this.dimensions = model.dimensions;
        this.color = model.color;
        this.priceUnit = model.priceUnit;
        this.image = model.image;
    }
}