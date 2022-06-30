export interface TransactionData {
    userId: number;
    transaction_id: number;
    date_time: string;
    status: string;
    total: number;
    item: TransactionProductItem[];
}

export interface TransactionProductItem {
    transaction_product: number;
    items: ProductItemInfo;
    quantity: number;
    subtotal: number;
}

export interface ProductItemInfo {
    productId: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
}