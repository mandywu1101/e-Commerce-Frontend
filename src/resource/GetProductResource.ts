import axios, {AxiosResponse} from "axios";
import {ProductDetailedData, ProductListData} from "../data/ProductData";

export function getProductResource(setProductListData : (inData : ProductListData[]) => void) {
    axios.get(`http://localhost:8080/public/product`).then((response:AxiosResponse<ProductListData[]>)=>{
        setProductListData(response.data);
    })
}

export function getProductDetail(product_ID: string, onLoadProductDetailData : (inData : ProductDetailedData | null) => void) {
    axios.get(`http://localhost:8080/public/product/${product_ID}`).then((response:AxiosResponse<ProductDetailedData>)=>{
        onLoadProductDetailData(response.data)
    }).catch((error)=>{
        console.log(error.message)
        // have value == got the details successfully
        // null = the type has empty value
        // undefined = there is no type
    })
}
