import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Ac1 from './img1.jpg';
import './index.css';
import {Button, Container, Navbar} from "react-bootstrap";
import {useEffect, useState} from "react";
import {ProductListData} from "../../../data/ProductData";
import MockData from './response2.json';
import BasicNavbar from "../../component/NavbarTop";
import ProductDetails from "../ProductDetails";
import {Link} from "react-router-dom";
import {getProductResource, getProductResourceLowToHigh} from "../../../resource/GetProductResource";
import IndividualIntervalsExample from "../../component/Carousel";
import {DropdownButton} from 'react-bootstrap';
import {Dropdown} from 'react-bootstrap';
import Footer from "../../component/Footer";


export default function ProductListing() {
    const [productListData, setProductListData] = useState<ProductListData[] | undefined>(undefined)

    useEffect(() => {
        if (productListData === undefined){
            getProductResource(setProductListData);
        }
    }, [])

    //try to do the sorting through backend query
    const sortProductLowToHigh = () => {
        getProductResourceLowToHigh(setProductListData);
    }

    //try to do the sorting through frontend
    const [sortByHighToLow, setPriceHightoLow] = useState<ProductListData[] | undefined>(undefined)

    const sortProductHighToLow = () =>{
        const sort = productListData?.sort((a, b) => b.price - a.price)
        setProductListData(sort);
        setPriceHightoLow(sort);
        console.log(sort)
    }

    return (
        <>
            <BasicNavbar/>
            <IndividualIntervalsExample/>
            <div className={"sorting"}>
                <DropdownButton id="sorting-button" title="Sort By">
                    <Dropdown.Item onClick={sortProductLowToHigh}>Price: Low to High</Dropdown.Item>
                    <Dropdown.Item onClick={sortProductHighToLow}>Price: High to Low</Dropdown.Item>
                </DropdownButton>
            </div>
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
                                            <Link to={`/product/${value.product_id}`}><a href="#"
                                                                                         className="btn btn-primary">Details</a></Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        )

                    })
                }

            </Container>
            <Footer/>
        </>
    );
}
