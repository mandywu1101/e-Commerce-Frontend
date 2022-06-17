import {firebaseAuthServiceGetAccessToken} from "../service/AuthService";
import axios, {AxiosResponse} from "axios";
import {CarouselItem} from "react-bootstrap";
import {ShoppingCartData} from "../data/ShoppingCartData";
import {ProductDetailedData} from "../data/ProductData";

export function getShoppingCartItem(setShoppingCartDataList: (shoppingCartDataList: ShoppingCartData[] | null) => void) {
    firebaseAuthServiceGetAccessToken()
        ?.then((token) => {
            axios.get(`http://localhost:8080/cart`,
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
            return axios.delete(`http://localhost:8080/cart/${product_id}`,
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
            return axios.patch(`http://localhost:8080/cart/${product_id}/${quantity}`, undefined,
                {
                    headers: {Authorization: "Bearer " + token}
                }).then(() => {
                onApiUpdateCartItemQuantity(true, product_id, quantity);
            }).catch((error) => {
                onApiUpdateCartItemQuantity(false);
            })
        })
}

export function putShoppingCartItem(product_id: number, quantity: number, onApiPutCartItem: (isSuccess: boolean)=> void){
    firebaseAuthServiceGetAccessToken()
        ?.then((token)=>{
            return axios.put(`http://localhost:8080/cart/add-item/${product_id}/${quantity}`, undefined,{
                headers: {Authorization: "Bearer " + token}
            })
        }).then(() => onApiPutCartItem(true))
        .catch(() => onApiPutCartItem(false))
}
