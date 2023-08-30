import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useContext, useEffect ,useState} from "react";
import { Subtotal } from "../../Service/app.service";
import UserContext from "../../context/userContext";

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"


const initialOptions = {
    clientId: "ARhIk8S1SjumPvjUXqmKwGEGHXs7sy3qnhYMOkOdiC51L3yzfIT6Py5ZgLWkjlhf8JZGcaK1KSYzg-vb",
    currency: "USD",
    intent: "capture",
};
const Checkout = () => {
    const {state,dispatch}=useContext(UserContext);
    const [subtotal,setSubtotal]=useState(0);

    const schema =yup.object({
        Firstname:yup.string(),
        Laststname:yup.string(),
        Street:yup.string(),
        City:yup.string(),
        District:yup.string(),
        Postcode:yup.string(),
        Phone:yup.string(),
        Email:yup.string(),
        DeliveryMethod:yup.string(),
        Laststname:yup.string(),
        Laststname:yup.string(),
        Laststname:yup.string(),
        Laststname:yup.string(),
        Laststname:yup.string(),
    }).required();

    const {register,handleSubmit,setValue,formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    })

    useEffect(()=>{
        Subtotal(state.User.cart,setSubtotal)
    },[state])
   return(
    <div>
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Shop</a></li>
            <li className="breadcrumb-item active" aria-current="page">Checkout</li>
          </ol>
        </div>{/* End .container */}
      </nav>
      <div className="page-content">
        <div className="checkout">
        <div className="container">
            <div className="checkout-discount">
            <form action="#">
                <input type="text" className="form-control" required id="checkout-discount-input"  placeholder="Enter your coupon code..."/>
            </form>
            </div>{/* End .checkout-discount */}
            <form action="#">
            <div className="row">
                <div className="col-lg-9">
                <h2 className="checkout-title">Billing Details</h2>{/* End .checkout-title */}
                <div className="row">
                    <div className="col-sm-6">
                    <label>First Name *</label>
                    <input type="text" className="form-control" required />
                    </div>{/* End .col-sm-6 */}
                    <div className="col-sm-6">
                    <label>Last Name *</label>
                    <input type="text" className="form-control" required />
                    </div>{/* End .col-sm-6 */}
                </div>{/* End .row */}
                <label>Company Name (Optional)</label>
                <input type="text" className="form-control" />
                <label>Country *</label>
                <input type="text" className="form-control" required />
                <label>Street address *</label>
                <input type="text" className="form-control" placeholder="House number and Street name" required />
                <input type="text" className="form-control" placeholder="Appartments, suite, unit etc ..." required />
                <div className="row">
                    <div className="col-sm-6">
                    <label>Town / City *</label>
                    <input type="text" className="form-control" required />
                    </div>{/* End .col-sm-6 */}
                    <div className="col-sm-6">
                    <label>State / County *</label>
                    <input type="text" className="form-control" required />
                    </div>{/* End .col-sm-6 */}
                </div>{/* End .row */}
                <div className="row">
                    <div className="col-sm-6">
                    <label>Postcode / ZIP *</label>
                    <input type="text" className="form-control" required />
                    </div>{/* End .col-sm-6 */}
                    <div className="col-sm-6">
                    <label>Phone *</label>
                    <input type="tel" className="form-control" required />
                    </div>{/* End .col-sm-6 */}
                </div>{/* End .row */}
                <label>Email address *</label>
                <input type="email" className="form-control" required />
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
                            <td><a href="#">{e.productSize.productColor.product.name}</a></td>
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
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons  createOrder={(data, actions) => {
                            console.log(data)
                            return actions.order.create({
                                purchase_units: [
                                {
                                    description: "safasgagas",
                                    "amount": {
                                        "value":subtotal
                                    },
                                }
                                ]
                            });
                            }}
                            onApprove={async (data, actions) => {
                                console.log(data)
                                const order = await actions.order.capture(); 
                                console.log("order", order);
                                // handleApprove(data.orderID);
                                }}
                            onError={(err) => {
                                console.error("PayPal Checkout onError", err);
                            }}
                            />
                    </PayPalScriptProvider>
                </div>{/* End .summary */}
                </aside>{/* End .col-lg-3 */}
            </div>{/* End .row */}
            </form>
        </div>{/* End .container */}
        </div>{/* End .checkout */}
  </div>
    </div>
 
   );
} 
export default Checkout;