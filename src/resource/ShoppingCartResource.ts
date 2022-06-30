import {firebaseAuthServiceGetAccessToken} from "../service/AuthService";
import axios, {AxiosResponse} from "axios";
import {CarouselItem} from "react-bootstrap";
import {ShoppingCartData} from "../data/ShoppingCartData";
import {ProductDetailedData} from "../data/ProductData";
import getEnvConfig from "../config/Config";

export function getShoppingCartItem(setShoppingCartDataList: (shoppingCartDataList: ShoppingCartData[] | null) => void) {
    firebaseAuthServiceGetAccessToken()
        ?.then((token) => {
            axios.get(`${getEnvConfig().baseUrl}/cart`,
                {headers: {Authorization: "Bearer " + token}}).then((response: AxiosResponse<ShoppingCartData[]>) => {
                setShoppingCartDataList(response.data);
            }).catch((error) => {
                console.log(error);
                setShoppingCartDataList(null);
            })
        })
}

export function removeShoppingCartItem(product_id: number, onApiRemoveCartItem: (isSuccess: boolean, product_id?: number) => void,) {
    firebaseAuthServiceGetAccessToken()
        ?.then((token) => {
            return axios.delete(`${getEnvConfig().baseUrl}/cart/${product_id}`,
                {
                    headers: {Authorization: "Bearer " + token}
                }).then(() => {
                onApiRemoveCartItem(true, product_id);
            }).catch((error) => {
                onApiRemoveCartItem(false);
            })
        })
}

export function updateShoppingCartItem(product_id: number, quantity: number, onApiUpdateCartItemQuantity: (isSuccess: boolean, product_id?: number, cartQuantity?: number) => void) {
    firebaseAuthServiceGetAccessToken()
        ?.then((token) => {
            return axios.patch(`${getEnvConfig().baseUrl}/cart/${product_id}/${quantity}`, undefined,
                {
                    headers: {Authorization: "Bearer " + token}
                }).then(() => {
                onApiUpdateCartItemQuantity(true, product_id, quantity);
            }).catch((error) => {
                onApiUpdateCartItemQuantity(false);
            })
        })
}


export function putShoppingCartItem(product_id: number, quantity: number, onApiPutCartItem: (isSuccess: boolean) => void) {
    console.log(product_id, quantity);
    firebaseAuthServiceGetAccessToken()
        ?.then((token) => {
            console.log("find user");
            return axios.put(`${getEnvConfig().baseUrl}/cart/add-item/${product_id}/${quantity}`, undefined, {headers: {Authorization: "Bearer " + token}})
        })
        .then(
            () => {onApiPutCartItem(true);
    console.log("add to cart");}
    )
        .catch(() => onApiPutCartItem(false))
}





