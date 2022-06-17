import {Button} from "react-bootstrap";

type Props = {
    quantity:number;
    setQuantityMinusOne: ()=> void;
    setQuantityPlusOne: ()=>void;
}

export default function Selector(props: Props){
    return(
        <div>
            <Button onClick={props.setQuantityMinusOne}>
                -
            </Button>
            <Button className={"quantity"}>
                {props.quantity}
            </Button>
            <Button onClick={props.setQuantityPlusOne}>
                +
            </Button>
        </div>
    )
}