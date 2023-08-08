import { Card,Button, Row, Col } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext";
import {PiHandHeartDuotone} from "react-icons/pi";

export default function ProductGrid(props){
    const product = props.product;
    const {state,dispatch} = useContext(UserContext);// connect to global 
    const addToCart = ()=>{
        const cart = state.cart;
        let check = true;
        cart.map(e=>{
            if(e.id == product.id){
                e.buy_qty = e.buy_qty +1;
                check = false;
            }
            return e;
        })
        if(check){
            product.buy_qty = 1;
            cart.push(product);
        }
        dispatch({type:"UPDATE_CART",payload:cart});
        setTimeout(() => {
            dispatch({type:"HIDE_LOADING"})
        }, 1000);
        alert("Added to cart");

    }
    const addToWishList = ()=>{
        const wishlist = state.wishlist;
        let check = true;
        wishlist.map(e=>{
            if(e.id == product.id){
                e.buy_qty = e.buy_qty +1;
                check = false;
            }
            return e;
        })
        if(check){
            product.buy_qty = 1;
            wishlist.push(product);
        }

        dispatch({type:"UPDATE_CART",payload:wishlist});
        setTimeout(() => {
            dispatch({type:"HIDE_LOADING"})
        }, 1000);
        alert("Added to wishlist");
    }
    return (
        <Card className="">
            <Card.Img variant="top" src={product.thumbnail} />
            <Card.Body>
                <Card.Title style={{textDecoration: 'none'}}>
                    <NavLink to={"/product/"+product.id} style={{textDecoration:"none"}}>
                    {product.title}
                    </NavLink>
                    </Card.Title>
                <Card.Text>
                    {product.description}
                </Card.Text>
            </Card.Body>
            <Row className="mt-auto mb-4">
                    <Col><Button className="mt-1" onClick={addToCart} variant="primary" style={{width:"100%",height:"40px",borderRadius:"8px"}}>Add To Cart</Button></Col>
                    <Col><Button className="mt-1" variant="primary" style={{width:"100%",height:"40px",borderRadius:"8px"}}><PiHandHeartDuotone fill="rgb(255,255,255)" onClick={addToWishList}/></Button></Col>
            </Row>
        </Card>
    )
}