import {ShoppingCartData} from "../data/ShoppingCartData";
import {firebaseAuthServiceGetAccessToken} from "../service/AuthService";
import axios, {AxiosResponse} from "axios";
import {TransactionData} from "../data/TransactionData";
import {ProductListData} from "../data/ProductData";
import getEnvConfig from "../config/Config";

export function prepareTransaction(onApiPrepareTransaction: (transactionID: number) => void) {
    firebaseAuthServiceGetAccessToken()
        ?.then((token) => {
            return axios.post<TransactionData>(`${getEnvConfig().baseUrl}/transaction/prepare`, undefined, {headers: {Authorization: "Bearer " + token}})
        }).then((response) => {
        onApiPrepareTransaction(response.data.transaction_id);
    })
}

export function createTransaction(transactionId: string, setTransactionData: (inDate: TransactionData | null) => void) {
    firebaseAuthServiceGetAccessToken()
        ?.then((token) => {
            return axios.get<TransactionData>(`${getEnvConfig().baseUrl}/transaction/${transactionId}`,
                {headers: {Authorization: "Bearer " + token}})
        }).then((response) => {
        console.log(response.data.status)
        setTransactionData(response.data);
    }).catch((error) => {
        console.log(error);
        setTransactionData(null);
    })
}

export function finishTransaction(tid: string, onApiFinishTransaction: (isSuccess: boolean) => void) {
    let idToken: string = "";

    firebaseAuthServiceGetAccessToken() // 1 promise: getAccessToken
        ?.then((token) => {
            idToken = token;
            return axios.patch<TransactionData>(`${getEnvConfig().baseUrl}/transaction/${tid}/pay`, undefined, {headers: {Authorization: "Bearer " + idToken}})
        }).catch(() => {
        onApiFinishTransaction(false);
    }).then(() => { // 2 promise: transaction pay
        return axios.patch<TransactionData>(`${getEnvConfig().baseUrl}/transaction/${tid}/finish`, undefined, {headers: {Authorization: "Bearer " + idToken}})
    }).catch(() => {
        onApiFinishTransaction(false);
    }).then(() => {  // 3 promise: transaction finished
        onApiFinishTransaction(true);
    }).catch(() => {
        onApiFinishTransaction(false);
    })
}
