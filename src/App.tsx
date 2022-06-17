import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ProductListing from "./ui/page/ProductListing";
import ProductDetails from "./ui/page/ProductDetails";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PageNotFound from "./ui/page/404Page";
import LoginPage from "./ui/page/LoginPage";
import {firebaseAuthServiceOnAuthStateChanged} from "./service/AuthService";
import LoadingSpinner from "./ui/component/LoadingSpinner";
import ShoppingCartPage from "./ui/page/ShoppingCart";
import ShoppingCart from "./ui/page/ShoppingCart";


function App() {
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useEffect(() => {
        firebaseAuthServiceOnAuthStateChanged(()=>{
            setIsInitialized(true);
        })
    })

    return (
        <>
            {(isInitialized)?
                <div className="App">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<ProductListing/>}/>
                            <Route path="/product/:productId" element={ <ProductDetails/>}/>
                            <Route path="/shoppingcart/" element={<ShoppingCart/>}/>
                            <Route path="/login/" element={<LoginPage/>}/>
                            {/*<Route path="/checkout/:transactionId" element={<Checkout/>}/>*/}
                            {/*<Route path="/thankyou" element={<ThankYou/>}/>*/}
                            <Route path="/404" element={<PageNotFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </div> : <LoadingSpinner/>
            }

        </>
    );
}

export default App;
