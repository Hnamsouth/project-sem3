
import React,{useContext,useState,useEffect} from "react";
import UserContext from "../../../context/userContext";
import jwt_decode from "jwt-decode";
import { getProfile } from "../../../Service/auth.service";

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import UserOrder from "./component/order";
const Uprofile = (props)=>{
    const {state,dispatch}=useContext(UserContext);


    const loadScript = url =>{
        const script = document.createElement("script");
        script.src=url;
        script.type ="text/javascript";
        document.body.appendChild(script);
        return ()=>{
            document.body.removeChild(script)
        }
    }
    const load = ()=>{
        loadScript("/user/assets/js/demos/main.js");
    }

    useEffect( ()=>{
    //    let l= load();
    
    },[])

    return (
        <>
            <div className="page-header text-center" style={{backgroundImage: 'url("assets/images/page-header-bg.jpg")'}}>
                <div className="container">
                <h1 className="page-title">My Account<span>Shop</span></h1>
                </div>
            </div>

            <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
                <div className="container">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Shop</a></li>
                    <li className="breadcrumb-item active" aria-current="page">My Account</li>
                </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="dashboard">
                    <div class="container">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                            <Row>
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column nav-dashboard mb-3 mb-md-0">
                                        <Nav.Item>
                                            <Nav.Link  eventKey="profile" className="text-left text-trans-none pt-2 pb-2">Your Profile</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="order" className="text-left text-trans-none  pt-2 pb-2">Orders</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="review" className="text-left text-trans-none  pt-2 pb-2">My Review</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="setting" className="text-left text-trans-none  pt-2 pb-2">Setting</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="logout" className="text-left text-trans-none  pt-2 pb-2">Sign Out</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane className="fade" eventKey="profile">
                                            First tab content
                                        </Tab.Pane>
                                        <Tab.Pane className="fade"  eventKey="order">
                                            <UserOrder/>
                                        </Tab.Pane>
                                        <Tab.Pane className="fade"  eventKey="review">
                                            thirst tab content
                                        </Tab.Pane>
                                        <Tab.Pane className="fade"  eventKey="setting">
                                            thirst tab content
                                        </Tab.Pane>
                                        <Tab.Pane className="fade"  eventKey="logout">
                                            thirst tab content
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Uprofile;