import BasicNavbar from "../../component/NavbarTop";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Button, Card, Container} from "react-bootstrap";
import Selector from "../../component/Selector";
import {getShoppingCartItem, removeShoppingCartItem} from "../../../resource/ShoppingCartResource";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createTransaction, finishTransaction} from "../../../resource/TransactionResource";
import {TransactionData} from "../../../data/TransactionData";
import {ShoppingCartData} from "../../../data/ShoppingCartData";
import MockData from './prepareTransaction.json';
import './index.css';
import {Form} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

type Params = {
    transactionId: string;
}

export default function TransactionPage() {
    const params = useParams<Params>();
    const [transactionData, setTransactionData] = useState<TransactionData | undefined | null>(undefined);


    useEffect(() => {
        if (params.transactionId) {
            createTransaction(params.transactionId, setTransactionData);
        }
    }, [])

    // check MockData
    // useEffect(() => {
    //     setTransactionData(MockData);
    // }, [])

    // const onApiPrepareTransaction = (isSuccess: boolean) => {
    //     if (isSuccess && transactionData) {
    //         setTransactionData(transactionData)
    //     }
    // }

    const navigate = useNavigate();
    const onApiFinishTransaction = (isSuccess: boolean) => {
        if (isSuccess) {
            navigate("/thankyou");
        } else {
            navigate("/404");
        }
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (params.transactionId) {
            finishTransaction(params.transactionId, onApiFinishTransaction)
        }
    }


    return (
        <div>
            <BasicNavbar/>
            <div className={"each-transaction-column"}>
                <Container className={"transaction-inner-container"}>
                    <div className={"transaction-details"}>
                        <Card className={"tranaction-card"}>
                            <Card.Header as="h5" className={"card-header"}>Shopping Cart Item</Card.Header>
                            <Row xs={1} md={1} className="g-5">
                                {transactionData?.item?.map((value) => (
                                    <Col className={"each-shopping-column"}>
                                        <Card>
                                            <div className={"each-shopping-cart"}>
                                                <div className={"cart-image"}>
                                                    <Card.Img className={"cart-photo"} variant="top"
                                                              src={value.items.imageUrl}/>
                                                </div>
                                                <div className={"cart-body"}>
                                                    <div className={"cart-body-main"}>
                                                        <Card.Title>
                                                            <h3>Product Name:<br/><br/><p>{value.items.name}</p>
                                                            </h3>
                                                        </Card.Title>
                                                    </div>
                                                    <div className={"cart-body-side"}>
                                                        <Card.Text>
                                                            <li>Product Number: {value.items.productId}</li>
                                                            <li>Price: ${value.items.price}</li>
                                                            <li>Quantity: {value.quantity}</li>
                                                        </Card.Text>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                        <hr/>
                                        <p>Subtotal: {value.subtotal}</p>
                                    </Col>
                                ))}
                            </Row>
                        </Card>
                    </div>
                    <div className={"transaction-summery"}>
                        <div className={"credit-card-part"}>
                            <Card className={"credit-card-card"}>
                                <Card.Header as="h5" className={"card-header"}>Pay Method</Card.Header>
                                <Form className={"credit-card-form"}>

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Card Number</Form.Label>
                                        <Form.Control type="password" placeholder="Enter card number"/>
                                    </Form.Group>
                                    <br/>

                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>CVC / CVV</Form.Label>
                                            <Form.Control />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Expiry Date</Form.Label>
                                            <Form.Control type="text" placeholder="Expiry Date"/>
                                        </Form.Group>
                                    </Row>

                                    <Row className="mb-3">
                                        <Form.Group className="mb-3" controlId="formGridAddress2">
                                            <Form.Label>Cardholder Name</Form.Label>
                                            <Form.Control placeholder="Enter your name"/>
                                        </Form.Group>
                                    </Row>

                                    <Button variant="primary" type="submit" > Submit </Button>
                                </Form>
                            </Card>
                        </div>
                        <div className={"checkout-part"}>
                            <Card className={"checkout-card"}>
                                <Card.Header as="h5" className={"card-header"}>Transaction Summery</Card.Header>
                                <Card.Body>
                                    <Card.Title>Transaction
                                        Number: {transactionData?.transaction_id}</Card.Title>
                                    <Card.Text>
                                        <li>Date: {transactionData?.date_time}</li>
                                        <li>Bill Status: {transactionData?.status}</li>
                                        <li>Total: {transactionData?.total}</li>
                                    </Card.Text>
                                    <button type="button" className="pay-button"
                                            aria-label="Left Align" onClick={(event)=>{
                                        {handleSubmit(event)}
                                    }}><span>
                                <FontAwesomeIcon icon={solid('money-bill-1')} style={{color: "white"}}/> Pay </span>
                                    </button>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}