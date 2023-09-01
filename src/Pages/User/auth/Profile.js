
import React,{useContext,useState,useEffect} from "react";
import UserContext from "../../../context/userContext";
import jwt_decode from "jwt-decode";
import { getProfile } from "../../../Service/auth.service";
import {Table} from "react-bootstrap";
const Uprofile = (props)=>{
    const {state,dispatch}=useContext(UserContext);
    const [user,setUser]=useState({Id:"",Email:""});


    const getP = async ()=>{
        var u = await  getProfile();
        setUser(u);
        let token = localStorage.getItem("token")
        dispatch({type:"HIDE_LOADING"})
    }

    useEffect( ()=>{
        dispatch({type:"SHOW_LOADING"})
        getP();
    },[])


    console.log(user.cart
    )

    return (
        <>
            <main className="main">
                <div
                    className="page-header text-center"
                    style={{ backgroundImage: 'url("../user/assets/images/page-header-bg.jpg")' }}
                >
                    <div className="container">
                        <h1 className="page-title">
                            My Account<span>Shop</span>
                        </h1>
                    </div>
                    {/* End .container */}
                </div>
                {/* End .page-header */}
                <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
                    <div className="container">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <a href="index.html">Home</a>
                            </li>
                            <li className="breadcrumb-item">
                                <a href="#">Shop</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                My Account
                            </li>
                        </ol>
                    </div>
                    {/* End .container */}
                </nav>
                {/* End .breadcrumb-nav */}
                <div className="page-content">
                    <div className="dashboard">
                        <div className="container">
                            <div className="row">
                                <aside className="col-md-4 col-lg-3">
                                    <ul
                                        className="nav nav-dashboard flex-column mb-3 mb-md-0"
                                        role="tablist"
                                    >
                                        <li className="nav-item">
                                            <a
                                                className="nav-link active"
                                                id="tab-dashboard-link"
                                                data-toggle="tab"
                                                href="#tab-dashboard"
                                                role="tab"
                                                aria-controls="tab-dashboard"
                                                aria-selected="true"
                                            >
                                                Dashboard
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                id="tab-orders-link"
                                                data-toggle="tab"
                                                href="#tab-orders"
                                                role="tab"
                                                aria-controls="tab-orders"
                                                aria-selected="false"
                                            >
                                                Orders
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                id="tab-downloads-link"
                                                data-toggle="tab"
                                                href="#tab-downloads"
                                                role="tab"
                                                aria-controls="tab-downloads"
                                                aria-selected="false"
                                            >
                                                Downloads
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                id="tab-address-link"
                                                data-toggle="tab"
                                                href="#tab-address"
                                                role="tab"
                                                aria-controls="tab-address"
                                                aria-selected="false"
                                            >
                                                Adresses
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a
                                                className="nav-link"
                                                id="tab-account-link"
                                                data-toggle="tab"
                                                href="#tab-account"
                                                role="tab"
                                                aria-controls="tab-account"
                                                aria-selected="false"
                                            >
                                                Account Details
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                Sign Out
                                            </a>
                                        </li>
                                    </ul>
                                </aside>
                                {/* End .col-lg-3 */}
                                <div className="col-md-8 col-lg-9">
                                    <div className="tab-content">
                                        <div
                                            className="tab-pane fade show active"
                                            id="tab-dashboard"
                                            role="tabpanel"
                                            aria-labelledby="tab-dashboard-link"
                                        >
                                            <div className="card shadow-xs border p-3 p-md-4 mb-4">
                                                <div className="shadow-xs border rounded-3 mb-5">
                                                    <div className="d-block d-md-flex justify-content-between align-items-center">
                                                        <div className="d-block d-md-flex">
                                                            <div className="d-flex d-md-block justify-content-between p-4 me-md-4">
                                                                <p className="text-sm mb-0">Order Id</p>
                                                                {/*<h6>{order.orderNumber}</h6>*/}
                                                            </div>
                                                            <div className="d-flex d-md-block justify-content-between p-4 me-md-4">
                                                                <p className="text-sm mb-0">Date of placement</p>
                                                                {/*<h6>{order.date}</h6>*/}
                                                            </div>
                                                            <div className="d-flex d-md-block justify-content-between p-4">
                                                                <p className="text-sm mb-0">Amount</p>
                                                                <h6>$2,570</h6>
                                                            </div>
                                                        </div>
                                                        <button className="btn btn-dark btn-sm mb-md-0 ms-4 md-md-0 me-4" data-bs-toggle="modal" data-bs-target="#invoiceModal1">View invoice</button>
                                                        <div className="modal fade" id="invoiceModal1" role="dialog" aria-labelledby="invoiceModal1" aria-hidden="true">
                                                            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                                                                <div className="modal-content">
                                                                    <div className="card p-4">
                                                                        <div className="card-header text-center">
                                                                            <div className="row justify-content-between">
                                                                                <div className="col-md-4 text-start">
                                                                                    <img className="mb-2 w-50 rounded-2" src="https://s3.amazonaws.com/creativetim_bucket/new_logo.png" alt="Logo" />
                                                                                    <h6>
                                                                                        St. Independence Embankment, 050105 Bucharest, Romania
                                                                                    </h6>
                                                                                    <small className="d-block text-muted">tel: +4 (074) 1090873</small>
                                                                                </div>
                                                                                <div className="col-lg-4 col-md-5 text-end">
                                                                                    <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                                    <h4 className="mt-7 mb-1">Billed to:</h4>
                                                                                    <span className="d-block">James Thompson</span>
                                                                                    <p className="text-sm">
                                                                                        Bld Mihail Kogalniceanu,<br />
                                                                                        7652 Bucharest,<br />
                                                                                        Romania
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="row justify-content-md-between">
                                                                                <div className="col-md-4">
                                                                                    <h4 className="mt-5 text-start">Invoice no. <br /><small className="mr-2">#XK98321111</small></h4>
                                                                                </div>
                                                                                <div className="col-lg-4 col-md-5">
                                                                                    <div className="d-flex align-items-center mt-5 ms-auto float-end">
                                                                                        <div className="text-sm me-3 font-weight-bold">Invoice date:</div>
                                                                                        <div className="text-end">Jan 22, 2022</div>
                                                                                    </div>
                                                                                    <div className="d-flex align-items-center ms-auto float-end">
                                                                                        <div className="text-sm me-3 font-weight-bold">Due date:</div>
                                                                                        <div className="text-end">Feb 22, 2022</div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="card-body">
                                                                            <div className="row">
                                                                                <div className="col-12">
                                                                                    <div className="table-responsive">
                                                                                        <table className="table text-right">
                                                                                            <thead className="bg-default">
                                                                                            <tr>
                                                                                                <th scope="col" className="text-right text-white">Item</th>
                                                                                                <th scope="col" className="text-right text-white">Qty</th>
                                                                                                <th scope="col" className="text-right text-white">Rate</th>
                                                                                                <th scope="col" className="text-right text-white">Amount</th>
                                                                                            </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td>Premium Support</td>
                                                                                                <td>1</td>
                                                                                                <td>$ 9.00</td>
                                                                                                <td className="text-end">$ 9.00</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>Argon Dashboard PRO</td>
                                                                                                <td>3</td>
                                                                                                <td>$ 100.00</td>
                                                                                                <td className="text-end">$ 300.00</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td>Parts for service</td>
                                                                                                <td>1</td>
                                                                                                <td>$ 89.00</td>
                                                                                                <td className="text-end">$ 89.00</td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                            <tfoot>
                                                                                            <tr>
                                                                                                <th colSpan={3} className="h4">Total</th>
                                                                                                <th className="text-end h4">$ 398.00</th>
                                                                                            </tr>
                                                                                            </tfoot>
                                                                                        </table>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="card-footer text-right">
                                                                            <div className="col-md-5 ms-auto text-end">
                                                                                <h5>Thank you!</h5>
                                                                                <p className="text-sm">If you encounter any issues related to the invoice you can contact us at:</p>
                                                                                <h6 className="mb-0">
                                                                                    email:
                                                                                    <small className="text-muted"> support@cretive-tim.com</small>
                                                                                </h6>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col" className="text-secondary text-xs font-weight-bold border-light ps-2">Product</th>
                                                            <th scope="col" className="text-secondary text-xs font-weight-bold border-light ps-2">Price</th>
                                                            <th scope="col" className="text-secondary text-xs font-weight-bold border-light ps-2">Status</th>
                                                            <th scope="col" className="text-secondary text-xs font-weight-bold border-light ps-2">Date</th>
                                                            <th scope="col" className="text-secondary text-xs font-weight-bold border-light ps-2 text-end">Details</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {/*{orderHistoryCards}*/}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            {/*<Table striped bordered hover>*/}
                                            {/*    <thead>*/}
                                            {/*    <tr>*/}
                                            {/*        <th>#</th>*/}
                                            {/*        <th>First Name</th>*/}
                                            {/*        <th>Last Name</th>*/}
                                            {/*        <th>Username</th>*/}
                                            {/*    </tr>*/}
                                            {/*    </thead>*/}
                                            {/*    <tbody>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>1</td>*/}
                                            {/*        <td>Mark</td>*/}
                                            {/*        <td>Otto</td>*/}
                                            {/*        <td>@mdo</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>2</td>*/}
                                            {/*        <td>Jacob</td>*/}
                                            {/*        <td>Thornton</td>*/}
                                            {/*        <td>@fat</td>*/}
                                            {/*    </tr>*/}
                                            {/*    <tr>*/}
                                            {/*        <td>3</td>*/}
                                            {/*        <td colSpan={2}>Larry the Bird</td>*/}
                                            {/*        <td>@twitter</td>*/}
                                            {/*    </tr>*/}
                                            {/*    </tbody>*/}
                                            {/*</Table>*/}
                                        </div>
                                        {/* .End .tab-pane */}
                                        <div
                                            className="tab-pane fade"
                                            id="tab-orders"
                                            role="tabpanel"
                                            aria-labelledby="tab-orders-link"
                                        >
                                            <p>No order has been made yet.</p>
                                            <a href="category.html" className="btn btn-outline-primary-2">
                                                <span>GO SHOP</span>
                                                <i className="icon-long-arrow-right" />
                                            </a>
                                        </div>
                                        {/* .End .tab-pane */}
                                        <div
                                            className="tab-pane fade"
                                            id="tab-downloads"
                                            role="tabpanel"
                                            aria-labelledby="tab-downloads-link"
                                        >
                                        </div>
                                        {/* .End .tab-pane */}
                                        <div
                                            className="tab-pane fade"
                                            id="tab-address"
                                            role="tabpanel"
                                            aria-labelledby="tab-address-link"
                                        >
                                            <p>
                                                The following addresses will be used on the checkout page by
                                                default.
                                            </p>
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="card card-dashboard">
                                                        <div className="card-body">
                                                            <h3 className="card-title">Billing Address</h3>
                                                            {/* End .card-title */}
                                                            <p>
                                                                User Name
                                                                <br />
                                                                User Company
                                                                <br />
                                                                John str
                                                                <br />
                                                                New York, NY 10001
                                                                <br />
                                                                1-234-987-6543
                                                                <br />
                                                                yourmail@mail.com
                                                                <br />
                                                                <a href="#">
                                                                    Edit <i className="icon-edit" />
                                                                </a>
                                                            </p>
                                                        </div>
                                                        {/* End .card-body */}
                                                    </div>
                                                    {/* End .card-dashboard */}
                                                </div>
                                                {/* End .col-lg-6 */}
                                                <div className="col-lg-6">
                                                    <div className="card card-dashboard">
                                                        <div className="card-body">
                                                            <h3 className="card-title">Shipping Address</h3>
                                                            {/* End .card-title */}
                                                            <p>
                                                                You have not set up this type of address yet.
                                                                <br />
                                                                <a href="#">
                                                                    Edit <i className="icon-edit" />
                                                                </a>
                                                            </p>
                                                        </div>
                                                        {/* End .card-body */}
                                                    </div>
                                                    {/* End .card-dashboard */}
                                                </div>
                                                {/* End .col-lg-6 */}
                                            </div>
                                            {/* End .row */}
                                        </div>
                                        {/* .End .tab-pane */}
                                        <div
                                            className="tab-pane fade"
                                            id="tab-account"
                                            role="tabpanel"
                                            aria-labelledby="tab-account-link"
                                        >
                                            <form action="#">
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <label>First Name *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                        />
                                                    </div>
                                                    {/* End .col-sm-6 */}
                                                    <div className="col-sm-6">
                                                        <label>Last Name *</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            required=""
                                                        />
                                                    </div>
                                                    {/* End .col-sm-6 */}
                                                </div>
                                                {/* End .row */}
                                                <label>Display Name *</label>
                                                <input type="text" className="form-control" required="" />
                                                <small className="form-text">
                                                    This will be how your name will be displayed in the
                                                    account section and in reviews
                                                </small>
                                                <label>Email address *</label>
                                                <input type="email" className="form-control" required="" />
                                                <label>
                                                    Current password (leave blank to leave unchanged)
                                                </label>
                                                <input type="password" className="form-control" />
                                                <label>New password (leave blank to leave unchanged)</label>
                                                <input type="password" className="form-control" />
                                                <label>Confirm new password</label>
                                                <input type="password" className="form-control mb-2" />
                                                <button type="submit" className="btn btn-outline-primary-2">
                                                    <span>SAVE CHANGES</span>
                                                    <i className="icon-long-arrow-right" />
                                                </button>
                                            </form>
                                        </div>
                                        {/* .End .tab-pane */}
                                    </div>
                                </div>
                                {/* End .col-lg-9 */}
                            </div>
                            {/* End .row */}
                        </div>
                        {/* End .container */}
                    </div>
                    {/* End .dashboard */}
                </div>
                {/* End .page-content */}
            </main>
            {/* End .main */}
        </>

    );
}

export default Uprofile;