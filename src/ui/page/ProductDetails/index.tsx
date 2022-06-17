import {useEffect, useState} from "react";
import {ProductDetailedData, ProductListData} from "../../../data/ProductData";
import {Button, Container, Toast} from "react-bootstrap";
import BasicNavbar from "../../component/NavbarTop";
import Selector from "../../component/Selector";
import './index.css';
import MockData from './response.json';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import LoadingSpinner from "../../component/LoadingSpinner";
import {getProductDetail} from "../../../resource/GetProductResource";
import Row from "react-bootstrap/Row";
import {putShoppingCartItem} from "../../../resource/ShoppingCartResource";


type Params = {
    productId?: string;
}

export default function ProductDetails() {
    const [quantity, setQuantity] = useState<number>(1);
    const [productDetailedData, setProductDetailedData] = useState<ProductDetailedData | undefined | null>(undefined);
    const params = useParams<Params>();
    let navigate = useNavigate();


    const onLoadProductDetailedData = (data: ProductDetailedData | null) => {
        setProductDetailedData(data);
    }

    useEffect(() => {
        if (params.productId) {
            getProductDetail(params.productId, onLoadProductDetailedData)
        } else {
            navigate("/404")
        }
    }, [])


    const [show, setShow] = useState(false);

    const onApiPutCartItem = (isSuccess: boolean) => {
        if(isSuccess){
            setShow(true);
        }
    }

    const setQuantityPlusOne = (): void => {
        if (productDetailedData && quantity < productDetailedData.stock)
            setQuantity(quantity + 1);
    }
    const setQuantityMinusOne = (): void => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <>
            <BasicNavbar/>
            {(productDetailedData) ?
                <Container className={"product-container"}>
                    <Row>
                        <div className={"product-image"}>
                            <img id={"photo"} src={"https://bit.ly/3xKnsZg"}/>
                        </div>
                    </Row>
                    <Row>
                        <div className={"product-description"}>
                            <h2>Name:{productDetailedData?.product_name}</h2>
                            <h3>Price: ${productDetailedData?.price}</h3>
                            <h3>Description: {productDetailedData?.description}
                            </h3>
                            <h3>Availability Stock : {productDetailedData?.stock}</h3>
                            {
                                (productDetailedData.stock > 0)
                                    ? <>  <Selector quantity={quantity} setQuantityPlusOne={setQuantityPlusOne}
                                                    setQuantityMinusOne={setQuantityMinusOne}/>
                                        <br/>
                                        <Button onClick={() => {
                                            putShoppingCartItem(productDetailedData.product_id, quantity, onApiPutCartItem)
                                        }}>
                                            Add to Cart
                                        </Button></> :
                                    <Button disabled variant={"secondary"}>
                                        Out of stock
                                    </Button>
                            }
                        </div>
                    </Row>
                </Container>
                : (productDetailedData == undefined)
                    ? <LoadingSpinner/>
                    : <Navigate to="/404" replace/>
            }

            <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide
                   style={{position:"absolute", right:24, bottom:24}}
            >
                <Toast.Header>
                    <strong className="me-auto">Added to Cart</strong>
                </Toast.Header>
                <Toast.Body>Woohoo, {quantity} item(s) have been added to cart</Toast.Body>
            </Toast>
        </>

    )
}