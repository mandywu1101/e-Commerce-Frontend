import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Ac1 from './img1.jpg';
import './index.css';
import {Container, Navbar} from "react-bootstrap";
import {useEffect, useState} from "react";
import {ProductListData} from "../../../data/ProductData";
import MockData from './response2.json';
import BasicNavbar from "../../component/NavbarTop";
import ProductDetails from "../ProductDetails";
import {Link} from "react-router-dom";
import {getProductResource} from "../../../resource/GetProductResource";


export default function ProductListing() {
    const [productListData, setProductListData] = useState<ProductListData[] | undefined>(undefined)

    useEffect(() => {
        getProductResource(setProductListData);
    }, [])

    // let moveToProductDetails=()=>{
    //     return(
    //         <ProductDetails/>
    //     )
    // }

    return (
        <>
            <BasicNavbar/>
            <Container className={"product-container"}>
                {
                    productListData?.map((value) => {
                        return (
                            <Row xs={1} md={2} lg={3} className="g-4">
                                <Col className={"column1"}>
                                    <Card key={value.product_id} className={"each-card"}>
                                        <Card.Img className={"card-img"} variant="top" src={value.image_url}/>
                                        <Card.Body>
                                            <Card.Title>{value.product_name}</Card.Title>
                                            <Card.Text>
                                                🎐${value.price}
                                                {
                                                    (value.hasStock)
                                                        ?
                                                        <p>Only a few stock left</p>
                                                        : <p>Sold out</p>
                                                }
                                            </Card.Text>
                                            {/*<a href="#" className="btn btn-primary" onClick={moveToProductDetails}>Details</a>*/}
                                          <Link to ={`/product/${value.product_id}`}><a href="#" className="btn btn-primary" >Details</a></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        )

                    })
                }

            </Container>
        </>
    );
}
