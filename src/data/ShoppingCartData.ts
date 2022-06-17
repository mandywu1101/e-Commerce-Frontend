import {firebaseAuthServiceGetAccessToken} from "../service/AuthService";

export type ShoppingCartData = {
    product_id: number,
    product_name: string,
    image_url: string,
    price: number;
    cart_quantity: number;
    stock: number;
}