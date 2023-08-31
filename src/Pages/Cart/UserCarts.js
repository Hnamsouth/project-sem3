import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";
import { deleteCart, getProductInCart, updateCart } from "../../Service/cart.service";
import { Subtotal } from "../../Service/app.service";

const UserCarts = ()=>{
    const {state,dispatch}=useContext(UserContext);
    const [subtotal,setSubtotal]=useState(0)
    const handleBuyQty = async (data)=>{
        console.log(state.User.cart)
        if(data.cart.productSize.qty<(data.cart.buyQty+data.qty) || (data.cart.buyQty+data.qty) < 1 ){
            // show err
            alert(123)
        }else{
            data.cart.buyQty+=data.qty;
            let rs = await updateCart(data.cart);
            if(rs.updated){
                state.User.cart.splice(data.index,1,data.cart);
                dispatch({type:"SET_USER",payload:state.User})
            }
        }
    }
    const handleDelete = async (data)=>{
        let rs = await deleteCart(data.id);
        if(rs.deleted){
            state.User.cart.splice(data.index,1);
            dispatch({type:"SET_USER",payload:state.User})
        }
    }

    useEffect(()=>{
        Subtotal(state.User.cart,setSubtotal)
    },[state])


    return (
        <>
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <div className="container">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Shop</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Shopping Cart {state.User.cart.length>0?state.User.cart.length:0}</li>
                </ol>
                </div>{/* End .container */}
            </nav>
            <div className="cart">
                <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                    <table className="table table-cart table-mobile">
                        <thead>
                        <tr>
                            <th>Product</th>
                            <th>Size</th>
                            <th>Price</th>

                            <th>Quantity</th>
                            <th>Total</th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {state.User.cart.length> 0 && state.User.cart.map( (e,i)=>{ 
                            return (
                            <tr key={i}>
                                <td className="product-col">
                                    <div className="product">
                                        <figure className="product-media">
                                        <a href="#">
                                            <img src={e.productSize.productColor.productColorImages[0].url} alt="Product image" />
                                        </a>
                                        </figure>
                                        <h3 className="product-title">
                                        <a href="#">{e.productSize.productColor.product.name}</a>
                                        </h3>
                                    </div>
                                </td>
                                <td className="price-col">{e.productSize.size.name}</td>
                                <td className="price-col">${e.productSize.productColor.product.price}</td>
                                <td className="quantity-col">
                                    <div className="cart-product-quantity">
                                        <input type="number" className="form-control" defaultValue={1} min={1} max={10} step={1} data-decimals={0} required style={{display: 'none'}} />
                                        <div className="input-group  input-spinner">
                                            <div className="input-group-prepend">
                                                <button style={{minWidth: '26px'}} className="btn btn-decrement btn-spinner" type="button" onClick={()=>handleBuyQty({cart:e,qty:-1,index:i})}>
                                                    <i className="icon-minus" />
                                                </button>
                                            </div>
                                            <input type="number" style={{textAlign: 'center'}} className="form-control" min={1} defaultValue={e.buyQty} value={e.buyQty} placeholder />
                                            <div className="input-group-append">
                                                <button style={{minWidth: '26px'}} className="btn btn-increment btn-spinner" type="button" onClick={()=>handleBuyQty({cart:e,qty:1,index:i})}>
                                                    <i className="icon-plus" />
                                                </button>
                                            </div>
                                        </div>
                                        {e.productSize.qty<10 && (
                                            <span className="text-danger "><strong>Only {e.productSize.qty} left</strong></span>
                                        )}
                                    </div>
                                </td>
                                <td className="total-col">${e.productSize.productColor.product.price*e.buyQty}</td>
                                <td className="remove-col"><button className="btn-remove" onClick={()=>handleDelete({id:e.id,index:i})}><i className="icon-close" /></button></td>
                            </tr>
                            );
                        })}
                        

                        </tbody>
                    </table>
                    <div className="cart-bottom">
                        <div className="cart-discount">
                            <form action="#">
                                <div className="input-group">
                                    <input type="text" className="form-control" required placeholder="coupon code" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-primary-2" type="submit"><i className="icon-long-arrow-right" /></button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>{/* End .col-lg-9 */}
                    <aside className="col-lg-3">
                    <div className="summary summary-cart">
                        <h3 className="summary-title">Cart Total</h3>{/* End .summary-title */}
                        <table className="table table-summary">
                        <tbody>
                            <tr className="summary-subtotal">
                                <td>Subtotal:</td>
                                <td>${subtotal}</td>
                            </tr>{/* End .summary-subtotal */}
                            <tr className="summary-shipping">
                                <td>Shipping:</td>
                                <td>&nbsp;</td>
                            </tr>
                            <tr className="summary-shipping-row">
                                <td>
                                    <div className="custom-control custom-radio">
                                    <input type="radio" id="free-shipping" checked name="shipping" className="custom-control-input" />
                                    <label className="custom-control-label" htmlFor="free-shipping">Free Shipping</label>
                                    </div>{/* End .custom-control */}
                                </td>
                                <td>$0.00</td>
                            </tr>
                            <tr className="summary-shipping-estimate">
                            <td>Estimate for Your Country<br /> <a href="dashboard.html">Change address</a></td>
                            <td>&nbsp;</td>
                            </tr>{/* End .summary-shipping-estimate */}
                            <tr className="summary-total">
                            <td>Total:</td>
                            <td>${subtotal}</td>
                            </tr>{/* End .summary-total */}
                        </tbody>
                        </table>{/* End .table table-summary */}
                        <Link to={"/checkout"} className="btn btn-outline-primary-2 btn-order btn-block">PROCEED TO CHECKOUT</Link>
                    </div>{/* End .summary */}
                    <a href="category.html" className="btn btn-outline-dark-2 btn-block mb-3"><span>CONTINUE SHOPPING</span><i className="icon-refresh" /></a>
                    </aside>{/* End .col-lg-3 */}
                </div>{/* End .row */}
                </div>{/* End .container */}
            </div>
        </>
        
    );
}

export default UserCarts;