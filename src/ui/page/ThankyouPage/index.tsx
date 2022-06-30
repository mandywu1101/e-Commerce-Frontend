import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import BasicNavbar from "../../component/NavbarTop";
import thanks from "./Thanks.png";


export default function ThankYouPage(){
    const navigate = useNavigate();
    const [count, setCount] = useState<number>(5);

    useEffect(()=>{
        setTimeout(()=>{
            if (count > 1){
                setCount(count -1 )
            } else{
                navigate("/")
            }
        },1000)
    })

    return(
        <>
        <BasicNavbar/>
        {/*<div>Thank you so much !</div>*/}
        {/*    <strong>Return Home Page in {count} seconds</strong>*/}
            <img className={"thanks-image"} src={thanks}/>
        </>

    )

}