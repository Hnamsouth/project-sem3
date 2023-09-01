import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useContext, useEffect ,useState} from "react";
import { Link, useNavigate  } from 'react-router-dom';
import { Subtotal } from "../../Service/app.service";
import UserContext from "../../context/userContext";

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrder } from "../../Service/order.service";

const initialOptions = {
    clientId: "ARhIk8S1SjumPvjUXqmKwGEGHXs7sy3qnhYMOkOdiC51L3yzfIT6Py5ZgLWkjlhf8JZGcaK1KSYzg-vb",
    currency: "USD",
    intent: "capture",
};

const Checkout = () => {
    const {state,dispatch}=useContext(UserContext);
    const [subtotal,setSubtotal]=useState(0);
    const [paySts,setPaySts]=useState(false);
    let navigate = useNavigate();
    const [Orderdata,setData]=useState({
        Firstname:'',Laststname:'',Country:'',Street:'',City:'',District:'',Postcode:0,Phone:'',Email:'',CouponCode:'',
    })
    const [err,setErr]=useState({
        Firstname:false,Laststname:false,Country:false,Street:false,City:false,District:false,Postcode:false,Phone:false,Email:false,
    })
    const notify = (mess) => toast(`🦄 ${mess}`, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const handleChange = (e) =>{
        setData((prev) =>({...prev,[e.target.name]:e.target.value}));
        setErr((prev)=>({...prev,[e.target.name]:e.target.value===''}))
        console.log(Orderdata)
    }
    const CheckOrderData = ()=>{
        console.log(Orderdata)
        let check =false;
         Object.keys(Orderdata).forEach(e=>{
            if(Orderdata[e]==='' && e!='CouponCode'){
                check= true;
            }
        })
        return check;
    }
    const handleOrder =async ()=>{
        let check = CheckOrderData();
        if(check)  return notify("Please enter your full payment information");
        let rs = await createOrder(Orderdata);
        console.log(Orderdata)
        console.log(rs,check)
        if(rs){
            state.User.order.push(rs);
            state.User.cart=[];
            dispatch({type:"SET_USER",payload:state.User})
            notify("Thanks")
            navigate("/u-profile")
        }
    }
    const CouponSubmit =async (e)=>{
        e.preventDefault();
        console.log(Orderdata['CouponCode'])
    }

    useEffect(()=>{
        Subtotal(state.User.cart,setSubtotal)
    },[state,Orderdata])
   return(
    <div>
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
            <li className="breadcrumb-item"><Link to={"/"}>Shop</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Checkout</li>
          </ol>
        </div>{/* End .container */}
      </nav>
      <div className="page-content">
        <div className="checkout">
        <div className="container">
            <div className="checkout-discount cart-discount">
                <form  className="d-flex" onSubmit={CouponSubmit} method="post">
                    <input type="text" className="form-control" name="CouponCode" onChange={e=>handleChange(e)}  id="checkout-discount-input" required placeholder="Enter your coupon code..."/>
                    <div className="input-group-append ml-2" style={{marginBottom:2+"rem"}}>
                        <button className="btn btn-outline-primary-2" type="submit"><i className="icon-long-arrow-right" /></button>
                    </div>
                </form>
            </div>
            <form  method="post">
                <div className="row">
                    <div className="col-lg-9">
                    <h2 className="checkout-title">Billing Details</h2>
                    <div className="row">
                        <div className="col-sm-6">
                            <label>First Name *</label>
                            <input type="text" className={"form-control "+(err['Firstname']?"is-invalid":"")} name="Firstname" onChange={e=>handleChange(e)} />
                        </div>
                        <div className="col-sm-6">
                            <label>Last Name *</label>
                            <input type="text" className={"form-control "+(err['Laststname']?"is-invalid":"")}  name="Laststname" onChange={e=>handleChange(e)} />
                        </div>
                    </div>
                        <label>Country *</label>
                        <input type="text" className={"form-control "+(err['Country']?"is-invalid":"")} name="Country" onChange={e=>handleChange(e)} />
                    <label>Street address *</label>
                    <input type="text" className={"form-control "+(err['Street']?"is-invalid":"")} placeholder="House number and Street name" name="Street" onChange={e=>handleChange(e)} />
                    <input type="text" className="form-control" placeholder="Appartments, suite, unit etc ..." />
                    <div className="row">
                        <div className="col-sm-6">
                            <label>Town / City *</label>
                            <input type="text" className={"form-control "+(err['City']?"is-invalid":"")} name="City" onChange={e=>handleChange(e)}  />
                        </div>{/* End .col-sm-6 */}
                        <div className="col-sm-6">
                            <label>District *</label>
                            <input type="text" className={"form-control "+(err['District']?"is-invalid":"")} name="District" onChange={e=>handleChange(e)}   />
                        </div>{/* End .col-sm-6 */}
                    </div>{/* End .row */}
                    <div className="row">
                        <div className="col-sm-6">
                            <label>Postcode / ZIP *</label>
                            <input type="number" className={"form-control "+(err['Postcode']?"is-invalid":"")} name="Postcode" onChange={e=>handleChange(e)} />
                        </div>{/* End .col-sm-6 */}
                        <div className="col-sm-6">
                            <label>Phone *</label>
                            <input type="tel" className={"form-control "+(err['Phone']?"is-invalid":"")} name="Phone" onChange={e=>handleChange(e)}  />
                        </div>{/* End .col-sm-6 */}
                    </div>{/* End .row */}
                    <label>Email address *</label>
                    <input type="email" className={"form-control "+(err['Email']?"is-invalid":"")} name="Email" onChange={e=>handleChange(e)}  />
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="checkout-create-acc" />
                        <label className="custom-control-label" htmlFor="checkout-create-acc">Create an account?</label>
                    </div>{/* End .custom-checkbox */}
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="checkout-diff-address" />
                        <label className="custom-control-label" htmlFor="checkout-diff-address">Ship to a different address?</label>
                    </div>{/* End .custom-checkbox */}
                    <label>Order notes (optional)</label>
                    <textarea className="form-control" cols={30} rows={4} placeholder="Notes about your order, e.g. special notes for delivery" defaultValue={""} />
                    </div>{/* End .col-lg-9 */}
                    <aside className="col-lg-3">
                    <div className="summary">
                        <h3 className="summary-title">Your Order</h3>{/* End .summary-title */}
                        <table className="table table-summary">
                        <thead>
                            <tr>
                            <th>Product</th>
                            <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {state.User.cart.map((e,i)=>(
                            <tr>
                                <td><Link to={`/product/${e.productSize.productColor.product.id}`}>{e.productSize.productColor.product.name}</Link></td>
                                <td>${e.productSize.productColor.product.price*e.buyQty}</td>
                            </tr>
                            ))}
                            <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>${subtotal}</td>
                            </tr>{/* End .summary-subtotal */}
                            <tr>
                            <td>Shipping:</td>
                            <td>Free shipping</td>
                            </tr>
                            <tr className="summary-total">
                            <td>Total:</td>
                            <td>${subtotal}</td>
                            </tr>{/* End .summary-total */}
                        </tbody>
                        </table>{/* End .table table-summary */}
                        {
                            !paySts && (
                                <PayPalScriptProvider options={initialOptions}>
                                    <PayPalButtons  createOrder={(data, actions) => {
                                        return actions.order.create({
                                            purchase_units: [{
                                                description: "safasgagas",
                                                "amount": {
                                                    "value":1
                                                },
                                                }]
                                            });
                                        }}
                                        onApprove={async (data, actions) => {
                                            const order = await actions.order.capture(); 
                                            console.log("order", order);
                                            setPaySts(true)
                                            }}
                                        onError={(err) => {
                                            console.error("PayPal Checkout onError", err);
                                        }}
                                        
                                        onClick={(data, actions)=> {
                                            // handleOrder()
                                        }}
                                        />
                            </PayPalScriptProvider>
                            )
                        }
                        
                        {
                            paySts && (
                                <a type="button" onClick={()=>handleOrder()} className="btn btn-outline-primary-2 btn-order btn-block">FINISH CHECKOUT</a>
                            )
                        }
                        <a type="button" onClick={()=>handleOrder()} className="btn btn-outline-primary-2 btn-order btn-block">FINISH CHECKOUT</a>
                    </div>{/* End .summary */}
                    </aside>{/* End .col-lg-3 */}
                </div>
            </form>
        </div>{/* End .container */}
        </div>{/* End .checkout */}
  </div>
    </div>
 
   );
} 
export default Checkout;