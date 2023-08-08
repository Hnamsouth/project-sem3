import { useContext, useState } from "react";
import UserContext from "../../context/userContext";
import { Button } from "react-bootstrap";

const CartU=(props)=>{
  const {state,dispatch} = useContext(UserContext);
    let total = 0;
    const cart = state.cart;
    const removeP = (p)=>{
        let newCart = [];
        cart.map(e=>{
            if(e.id != p.id){
                newCart.push(e);
            }
        });
        // setState({state,cart:newCart});
        dispatch({type:"UPDATE_CART",payload:newCart});
    }
    return (
        <main className="main">
  <div className="page-header text-center" style={{backgroundImage: 'url("assets/images/page-header-bg.jpg")'}}>
    <div className="container">
      <h1 className="page-title">Shopping Cart<span>Shop</span></h1>
    </div>{/* End .container */}
  </div>{/* End .page-header */}
  <nav aria-label="breadcrumb" className="breadcrumb-nav">
    <div className="container">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
        <li className="breadcrumb-item"><a href="#">Shop</a></li>
        <li className="breadcrumb-item active" aria-current="page">Shopping Cart</li>
      </ol>
    </div>{/* End .container */}
  </nav>{/* End .breadcrumb-nav */}
  <div className="page-content">
    <div className="cart">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <table className="table table-cart table-mobile">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                    {
                    cart.map((e,i)=>{
                        let cartTotal = e.buy_qty*e.price;
                        total+=cartTotal;
                        
                      return  (
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td><img src={e.thumbnail} width={50}/></td>
                            <td>{e.title}</td>
                            <td>{e.price}</td>
                            <td>{e.buy_qty}</td>
                            <td><Button variant="primary" onClick={()=>removeP(e)}>Remove</Button></td>
                            <td>{cartTotal}</td>
                        </tr>
                      );       
                    })
                    }
                </tbody>
            </table>{/* End .table table-wishlist */}
            <div className="cart-bottom">
              <div className="cart-discount">
                <form action="#">
                  <div className="input-group">
                    <input type="text" className="form-control" required placeholder="coupon code" />
                    <div className="input-group-append">
                      <button className="btn btn-outline-primary-2" type="submit"><i className="icon-long-arrow-right" /></button>
                    </div>{/* .End .input-group-append */}
                  </div>{/* End .input-group */}
                </form>
              </div>{/* End .cart-discount */}
              <a href="#" className="btn btn-outline-dark-2"><span>UPDATE CART</span><i className="icon-refresh" /></a>
            </div>{/* End .cart-bottom */}
          </div>{/* End .col-lg-9 */}
          <aside className="col-lg-3">
            <div className="summary summary-cart">
              <h3 className="summary-title">Cart Total</h3>{/* End .summary-title */}
              <table className="table table-summary">
                <tbody>
                  <tr className="summary-subtotal">
                    <td>Subtotal:</td>
                    <td>$160.00</td>
                  </tr>{/* End .summary-subtotal */}
                  <tr className="summary-shipping">
                    <td>Shipping:</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr className="summary-shipping-row">
                    <td>
                      <div className="custom-control custom-radio">
                        <input type="radio" id="free-shipping" name="shipping" className="custom-control-input" />
                        <label className="custom-control-label" htmlFor="free-shipping">Free Shipping</label>
                      </div>{/* End .custom-control */}
                    </td>
                    <td>$0.00</td>
                  </tr>{/* End .summary-shipping-row */}
                  <tr className="summary-shipping-row">
                    <td>
                      <div className="custom-control custom-radio">
                        <input type="radio" id="standart-shipping" name="shipping" className="custom-control-input" />
                        <label className="custom-control-label" htmlFor="standart-shipping">Standart:</label>
                      </div>{/* End .custom-control */}
                    </td>
                    <td>$10.00</td>
                  </tr>{/* End .summary-shipping-row */}
                  <tr className="summary-shipping-row">
                    <td>
                      <div className="custom-control custom-radio">
                        <input type="radio" id="express-shipping" name="shipping" className="custom-control-input" />
                        <label className="custom-control-label" htmlFor="express-shipping">Express:</label>
                      </div>{/* End .custom-control */}
                    </td>
                    <td>$20.00</td>
                  </tr>{/* End .summary-shipping-row */}
                  <tr className="summary-shipping-estimate">
                    <td>Estimate for Your Country<br /> <a href="dashboard.html">Change address</a></td>
                    <td>&nbsp;</td>
                  </tr>{/* End .summary-shipping-estimate */}
                  <tr className="summary-total">
                    <td>Total:</td>
                    <td>$160.00</td>
                  </tr>{/* End .summary-total */}
                </tbody>
              </table>{/* End .table table-summary */}
              <a href="checkout.html" className="btn btn-outline-primary-2 btn-order btn-block">PROCEED TO CHECKOUT</a>
            </div>{/* End .summary */}
            <a href="category.html" className="btn btn-outline-dark-2 btn-block mb-3"><span>CONTINUE SHOPPING</span><i className="icon-refresh" /></a>
          </aside>{/* End .col-lg-3 */}
        </div>{/* End .row */}
      </div>{/* End .container */}
    </div>{/* End .cart */}
  </div>{/* End .page-content */}
</main>
    );
}

export default CartU;