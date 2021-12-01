import { PaginatorModel } from "./paginator.model";

export interface ProductoRequestModel extends PaginatorModel {
    categoriaId: number;
}