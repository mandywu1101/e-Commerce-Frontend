import {Spinner} from "react-bootstrap";
import './index.css';
export default function LoadingSpinner(){
    return(
        <div className={"loading-spinner"}>
        <Spinner animation="border" variant="primary" />
        </div>
    )
}