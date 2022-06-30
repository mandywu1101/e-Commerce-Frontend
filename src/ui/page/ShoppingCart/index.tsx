import BasicNavbar from "../../component/NavbarTop";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Card, Container} from "react-bootstrap";
import './index.css'
import Selector from "../../component/Selector";
import {useEffect, useState} from "react";
import {ProductDetailedData} from "../../../data/ProductData";
import {Link, Params, useNavigate, useParams} from "react-router-dom";
import {getProductDetail} from "../../../resource/GetProductResource";
import hyggeImage from '../LoginPage/hygge.png';
import heartImage from "../../component/NavbarTop/icon/heart.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import {ShoppingCartData} from "../../../data/ShoppingCartData";
import {firebaseAuthServiceOnAuthStateChanged} from "../../../service/AuthService";
import {
    getShoppingCartItem, putShoppingCartItem,
    removeShoppingCartItem, updateShoppingCartItem
} from "../../../resource/ShoppingCartResource";
import {prepareTransaction} from "../../../resource/TransactionResource";

export default function ShoppingCart() {
    const [shoppingCartDataList, setShoppingCartDataList] = useState<ShoppingCartData[] | undefined | null>(undefined);

    const setQuantityPlusOne = (product_id: number, cartQuantity: number, stock: number): void => {
        if(cartQuantity < stock){
            updateShoppingCartItem(product_id, cartQuantity+1, onApiUpdateCartItemQuantity);
        }
        // updateShoppingCartItem(product_id, cartQuantity, stock)
    }
    const setQuantityMinusOne = (product_id: number, cartQuantity: number, stock: number): void => {
        if (cartQuantity > 1) {
            updateShoppingCartItem(product_id, cartQuantity-1, onApiUpdateCartItemQuantity);
        }
        // setQuantity(cartQuantity - 1)
    }


    const onApiUpdateCartItemQuantity = (isSuccess: boolean, product_id?: number, cartQuantity?: number) => {
        if (isSuccess && shoppingCartDataList) {
            setShoppingCartDataList(shoppingCartDataList.map((value) => {
                if (value.product_id === product_id) {
                    value.cart_quantity = cartQuantity!;
                }
                return value;
            }))
        }
    }

    useEffect(() => {
        getShoppingCartItem(setShoppingCartDataList);
    }, [])

    const onApiRemoveCartItem = (isSuccess: boolean, product_id?: number) => {
        if (isSuccess && shoppingCartDataList) {
            // let newCartItemDataList = cartItemDataList.filter((value) => {
            //     if (value.pid !== pid) {
            //         return value;
            //     }
            // })
            // setCartItemDataList(newCartItemDataList);
            //
            setShoppingCartDataList(
                shoppingCartDataList.filter((value: ShoppingCartData) => {
                    if (value.product_id !== product_id) {
                        return value;
                    }
                }))
        }
    }
    const  navigate = useNavigate();

    const onApiPrepareTransaction = (transactionId: number)=>{
        navigate(`/checkout/${transactionId}`)
    }

    const handleCheckoutOnClick = (event:any) =>{
        event.currentTarget.disabled = false;
        prepareTransaction(onApiPrepareTransaction);
    }



    const calTotalPrice = (): number => {
        let totalPrice: number = 0;
        if (shoppingCartDataList) {
            for (const shoppingCartItemData of shoppingCartDataList) {
                totalPrice += shoppingCartItemData.price * shoppingCartItemData.cart_quantity;
            }
        }
        return totalPrice;
    }

    return (
        <div>
            <BasicNavbar/>
            {/*<div className={"each-column"}>*/}
            {/*    <div className={"inner-container"}>*/}
            <Card.Header as="h5" className={"shopping-cart-header"}>Shopping Cart Item</Card.Header>
                    <Row xs={1} md={1} className="g-4">
                        {shoppingCartDataList?.map((value) => (
                            <Col className={"each-shopping-column"}>
                                <Card>
                                    <div className={"each-shopping-cart"}>
                                        <div className={"cart-image"}>
                                            <Card.Img className={"cart-photo"} variant="top"
                                                      src={value.image_url}/>
                                        </div>
                                        <div className={"cart-body"}>
                                            <div className={"cart-body-main"}>
                                                <Card.Title>
                                                    <h3>Product Name:<br/><br/><p>{value.product_name}</p></h3>
                                                </Card.Title>
                                            </div>
                                            <div className={"cart-body-side"}>
                                                <Card.Text>
                                                    <li>Product Number: {value.product_id}</li>
                                                    <li>Price: ${value.price}</li>
                                                </Card.Text>

                                                <Selector quantity={value.cart_quantity}

                                                          setQuantityPlusOne={() => {
                                                              setQuantityPlusOne((value.product_id), (value.cart_quantity), (value.stock))
                                                          }}
                                                          setQuantityMinusOne={() => {
                                                              setQuantityMinusOne((value.product_id), (value.cart_quantity), (value.stock))
                                                          }}/>

                                                <button type="button" className="trash-can-button"
                                                        aria-label="Left Align" onClick={() => {
                                                    removeShoppingCartItem(value.product_id, onApiRemoveCartItem)
                                                }}><span>
                                <FontAwesomeIcon icon={solid('trash-can')} style={{color: "white"}}/></span>
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </Card>
                                <hr/>
                                <p>Subtotal: ${value.cart_quantity * value.price}</p>
                            </Col>
                        ))}
                    </Row>
                {/*</div>*/}
                {/*<div className={"total-column"}>*/}
                    <div className={"total-part"}>
                    <hr/>
                    <p>Total: ${calTotalPrice()}</p>
                        <div className={"checkout-part"}>
                            <button type="button" className="checkout-button"
                                    aria-label="Left Align"  onClick={(event)=>{handleCheckoutOnClick(event)}} ><span>
                                <FontAwesomeIcon icon={solid('money-bill-1')} style={{color: "white"}}/> Confirm</span>
                            </button>
                        </div>
                    </div>

                {/*</div>*/}

            {/*</div>*/}
        </div>
    )
}