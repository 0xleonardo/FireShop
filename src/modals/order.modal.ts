export interface OrderTransaction {
    id: number;
    items: string;
    total: number;
    delivery: string;
    orderTimestamp: string;
    idUser?: number;
}

export interface NewOrder {
    items: string;
    total: number;
    delivery: string;
    idUser?: number;
}