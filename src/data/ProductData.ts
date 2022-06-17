export type ProductListData = {
    product_id: number;
    product_name: string;
    price: number;
    hasStock: boolean;
    image_url: string;
}

export type ProductDetailedData ={
    product_id:   number;
    product_name: string;
    image_url?:    string;
    price:        number;
    stock:        number;
    description?:  string;
}