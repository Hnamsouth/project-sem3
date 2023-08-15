import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Plus, Dash } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import {deleteCart, getProductInCart, update} from '../../Service/cart.service'
import { useEffect } from 'react';
import { getProduct } from '../../Service/product.service';


const Cart = () => {
    const [cart,setCart] = useState([]);

    // lấy userId
    const findProductInCart = async ()=>{
        const c = await getProductInCart();
        setCart(c);
    }

    useEffect(()=>{
       findProductInCart();
    },[]);

    const deleteProductInCart = async(id)=>{
        const d = await deleteCart(id);
        const c = await getProductInCart();
        setCart(c);  
    }

    const updateCart = async(data)=>{
        await update(data)
    }

    const onQuantityChange = (action,id) => {
        var listCart=[];
        listCart = cart.map((e)=>{
            if(id==e.id){
                if( action.includes("plus")){
                    e.buyQty++
                }else{
                    if(e.buyQty>1){
                        e.buyQty--
                    }
                }
                updateCart(e);
            }
            return e;
          })
        setCart(listCart)
    }

    const subtotal =cart.reduce((total, item)=>total+(item.product.price*item.buyQty),0)

    return (
        <main class="main">
                <div class="page-header text-center" style={{ backgroundImage: "url(../user/assets/images/page-header-bg.jpg)" }}>
                    <div class="container">
                        <h1 class="page-title">Shopping Cart<span>Shop</span></h1>
                    </div>
                </div>
                <nav aria-label="breadcrumb" class="breadcrumb-nav">
                    <div class="container">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                            <li class="breadcrumb-item"><a href="#">Shop</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Shopping Cart</li>
                        </ol>
                    </div>
                </nav>

                <div class="page-content">
                    <div class="cart">
                        <div class="container">
                            <div class="row">  
                                <div class="col-lg-9">
                                        <table class="table table-cart table-mobile">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                    <th></th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                    {cart.map((c,i)=>{
                                                        return(
                                                            <tr key={i}>
                                                                <td class="product-col">
                                                                    <div class="product">
                                                                        <figure class="product-media">
                                                                            <a href="#">
                                                                                <img src="assets/images/products/table/product-1.jpg" alt="Product image" />
                                                                            </a>
                                                                        </figure>

                                                                        <h3 class="product-title">
                                                                            {c.product.name}
                                                                        </h3>
                                                                    </div>
                                                                </td>
                                                                <td class="price-col">${c.product.price}</td>
                                                                <td class="quantity-col">
                                                                    <InputGroup>
                                                                        <InputGroup.Text onClick={() => onQuantityChange("decrease",c.id)} style={{ cursor: "pointer", background: "none",borderRadius: 0}}><Dash /></InputGroup.Text>
                                                                        <Form.Control aria-label="quantity" defaultValue={c.buyQty} value={c.buyQty} style={{ textAlign: "center",background:"none",borderLeft: "none",borderRight: "none",borderColor: "#ced4da" }}/>
                                                                        <InputGroup.Text onClick={() => onQuantityChange("plus",c.id)} style={{ cursor: "pointer", background: "none",borderRadius: 0 }}><Plus /></InputGroup.Text>
                                                                    </InputGroup>
                                                                </td>
                                                                <td class="total-col"style={{color :"#c96"}}>${
                                                                (c.product.price*c.buyQty).toFixed(2)
                                                                }</td>
                                                                <td class="remove-col"><button class="btn-remove" onClick={() =>deleteProductInCart(c.id)}><i class="icon-close"></i></button></td>
                                                            </tr>
                                                        )
                                                    })}
                                            
                                                
                                            
                                            </tbody>
                                        </table>

                                    <div class="cart-bottom">
                                        <div class="cart-discount">
                                            <form action="#">
                                                <div class="input-group">
                                                    <input type="text" class="form-control" required placeholder="coupon code" />
                                                    <div class="input-group-append">
                                                        <button class="btn btn-outline-primary-2" type="submit"><i class="icon-long-arrow-right"></i></button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <aside class="col-lg-3">
                                    <div class="summary summary-cart">
                                        <h3 class="summary-title">Cart Total</h3>

                                        <table class="table table-summary">
                                            <tbody>
                                                <tr class="summary-subtotal">
                                                    <td>Subtotal:</td>
                                                    <td>${subtotal.toFixed(2)}</td>
                                                </tr>
                                                <tr class="summary-shipping">
                                                    <td>Service Charge :</td>
                                                    <td>$3000.00</td>
                                                </tr>
                                                <tr class="summary-shipping-estimate">
                                                    <td>Estimate for Your Country<br /><a href="dashboard.html">Change address</a></td>
                                                    <td>&nbsp;</td>
                                                </tr>

                                                <tr class="summary-total">
                                                    <td>Total:</td>
                                                    <td>${(subtotal+ 3000).toFixed(2)}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <a href="checkout.html" class="btn btn-outline-primary-2 btn-order btn-block">PROCEED TO CHECKOUT</a>
                                    </div>

                                    <a href="category.html" class="btn btn-outline-dark-2 btn-block mb-3"><span>CONTINUE SHOPPING</span><i class="icon-refresh"></i></a>
                                </aside>

                            </div>
                        </div>
                    </div>
                </div>
        </main>
    );
}
export default Cart;