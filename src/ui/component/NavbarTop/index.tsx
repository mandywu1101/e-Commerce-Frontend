import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './index.css';
import profileImage from './icon/profile-user.png';
import cartImage from './icon/shopping-cart.png';
import heartImage from './icon/heart.png';
import magnifier from './icon/magnifying-glass-search.png';
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {firebaseAuthServiceOnAuthStateChanged, firebaseAuthServiceSignOut} from "../../../service/AuthService";
import {UserData} from "../../../data/UserData";
import {Button, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

function BasicNavbar() {
    const [currentUser, setCurrentUser] = useState<UserData | undefined | null>(undefined);
    let navigate = useNavigate();

    const onLoadedCurrentUser = (currentUser: UserData | null) => {
        setCurrentUser(currentUser)
    }
    useEffect(() => {
        firebaseAuthServiceOnAuthStateChanged(onLoadedCurrentUser);
    },[])

    const onLoginSuccess =()=>{
        if (currentUser){
            return (<>
                <button type="button" className="btn btn-default" aria-label="Left Align" onClick={userSignOut}>
                    {/*<span><FontAwesomeIcon icon={solid('user') } /> </span>*/}
                    <span><img className={"profile-icon"} src={profileImage}/></span>
                    {/*{currentUser.email}*/}
                    <p>Logout</p>
                </button>
                </>)
        } else {
            return (<>
                <button type="button" className="btn btn-default" aria-label="Left Align">
                    {/*<span><FontAwesomeIcon icon={solid('user')} size={"1x"}/> </span>*/}
                    <span><img className={"profile-icon"} src={profileImage}/></span>
                    {/*{currentUser.email}*/}
                    <p>Login</p>
                </button>
                </>)
        }
    }

    const userSignOut=()=>{
        firebaseAuthServiceSignOut();
    }


    return (
        < div className={"whole-navbar"}>
            <Container>
                <nav className={"nav-bar"}>
                    <div className={"search-bar"}>
                        <button type="button" className="btn btn-default" aria-label="Left Align">
                            <span><img className={"magnifier-icon"} src={magnifier}/></span>
                        </button>
                        <input type="text" className="form-control" placeholder="Search" aria-label="Search"
                               aria-describedby="basic-addon1"/>
                    </div>
                    <div className={"main-bar"}>
                        <Link to={"/"} style={{textDecoration: "none"}}>
                            <Navbar.Brand href="#home" className={"main-bar-button"}>H Y G G E</Navbar.Brand></Link>
                        <Nav.Link href="#home" className={"main-bar-button"}>Home</Nav.Link>
                        <Nav.Link href="#link" className={"main-bar-button"}>Shop</Nav.Link>
                        <NavDropdown title="2022 Spring" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Top</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Bottom
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Shirt</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Shoes</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">
                                Special Edition
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                    <div className={"personal-bar"}>
                        <Link to={`/login/`}>
                            {onLoginSuccess()}
                        </Link>
                        <Link to={`/shoppingcart/`}><button type="button" className="btn btn-default" aria-label="Left Align">
                            <span>
                                 <img className={"cart-icon"} src={cartImage}/>
                            </span>
                                {/*<FontAwesomeIcon icon={solid('cart-shopping') } />*/}
                            <p>Shopping Cart</p>

                        </button>
                        </Link>
                        <button type="button" className="btn btn-default" aria-label="Left Align">
                            <span>
                                {/*<FontAwesomeIcon icon={solid('heart') } />*/}
                                <img className={"heart-icon"} src={heartImage}/>
                            </span>
                            <p>Wishlist</p>
                        </button>
                    </div>
                </nav>
            </Container>
        </div>

    )
        ;
}

export default BasicNavbar;

{/*<Navbar bg="light" expand="lg">*/
}
{/*    <Container>*/
}
{/*        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/
}
{/*        <Navbar.Toggle aria-controls="basic-navbar-nav" />*/
}
{/*        <Navbar.Collapse id="basic-navbar-nav">*/
}
{/*            <Nav className="me-auto">*/
}
{/*                <Nav.Link href="#home">Home</Nav.Link>*/
}
{/*                <Nav.Link href="#link">Link</Nav.Link>*/
}
{/*                <NavDropdown title="Dropdown" id="basic-nav-dropdown">*/
}
{/*                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/
}
{/*                    <NavDropdown.Item href="#action/3.2">*/
}
{/*                        Another action*/
}
{/*                    </NavDropdown.Item>*/
}
{/*                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/
}
{/*                    <NavDropdown.Divider />*/
}
{/*                    <NavDropdown.Item href="#action/3.4">*/
}
{/*                        Separated link*/
}
{/*                    </NavDropdown.Item>*/
}
{/*                </NavDropdown>*/
}
{/*            </Nav>*/
}
{/*        </Navbar.Collapse>*/
}
{/*    </Container>*/
}
{/*</Navbar>*/
}

