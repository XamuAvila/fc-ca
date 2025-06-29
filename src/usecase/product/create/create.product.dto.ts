export interface InputCreateProductInterface {
    type: string;
    name: string;
    price: number;
}

export interface OutputCreateProductInterface {
    id: string;
    name: string;
    price: number;
    type: string;
}
