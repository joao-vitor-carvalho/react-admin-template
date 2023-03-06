import { IProduct } from "../../store/models/product.interface";

export type OnChangeModel = {
    value: string | number | boolean,
    error: string,
    touched: boolean,
    field: string
};

export interface IFormStateField<T> {error: string, value: T};

export interface IProductFormState {
    name: IFormStateField<string>;
    description: IFormStateField<string>;
    amount: IFormStateField<number>;
    price: IFormStateField<number>;
    hasExpiryDate: IFormStateField<boolean>; 
    category: IFormStateField<string>;
}

export  interface IOrderFormState {
    titulo: IFormStateField<string>;
    corpo: IFormStateField<string>;
    meta_title: IFormStateField<string>;
    meta_description: IFormStateField<string>;
    rodape: IFormStateField<string>;
};