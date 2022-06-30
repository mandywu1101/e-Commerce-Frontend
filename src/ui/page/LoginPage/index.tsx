import './index.css';
import BasicNavbar from "../../component/NavbarTop";
import React, {ChangeEvent, FormEvent, FormEventHandler, useEffect, useState} from "react";
import hyggeImage from './newimage.png';
import error from './error.png';
import topBanner2 from './topBanner2.png';
import {Container} from "react-bootstrap";
import {
    firebaseAuthServiceOnAuthStateChanged,
    firebaseAuthServiceSignInWithEmailAndPassword, firebaseAuthServiceSignInWithGoogle
} from "../../../service/AuthService";
import {useNavigate} from "react-router-dom";


export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    let navigate = useNavigate();

    const onUsernameChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    }

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }

    const onLoadedSignedIn = (isSuccess: boolean)=>{
        if(isSuccess){
            navigate(-1 );
        }
    }

    const handleSubmit = (event:React.SyntheticEvent) =>{
        event.preventDefault();
        firebaseAuthServiceSignInWithEmailAndPassword(email, password,onLoadedSignedIn);
    }

    return (
        <>
            <BasicNavbar/>
            <div className={"whole-page"}>
                <Container className={"login-container"}>
                    <div className={"emptybox"}></div>
                    <div className="login">
                        <h2>Log In to My Account</h2>
                        <form id="login-form" onSubmit={handleSubmit}>
                            <br/>
                            <label htmlFor="username">Email Address</label>
                            <input id="username" type="text" name="email" value={email}
                                   onChange={onUsernameChange}
                                   placeholder={"Enter Email"}/>
                            <br/>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password" value={password}
                                   onChange={onPasswordChange}
                                   placeholder={"Enter Password"}/>
                            <br/>
                            <input id="submit" type="submit" value="Login"/>
                            <hr/>
                            {/*<GoogleLoginButton onClick={() =>*/}
                            {/*    firebaseAuthServiceSignInWithGoogle(onLoadedSignedIn)} />*/}
                        </form>
                    </div>

                </Container>
            </div>
        </>
    )
}