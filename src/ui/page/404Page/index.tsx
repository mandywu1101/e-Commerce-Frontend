import BasicNavbar from "../../component/NavbarTop";
import error from './error.png';
import './index.css';
import Footer from "../../component/Footer";

export default function PageNotFound(){
    return(
        <>
        <BasicNavbar/>
            <img className={"error-image"} src={error}/>
            <Footer/>
        </>
    )
}