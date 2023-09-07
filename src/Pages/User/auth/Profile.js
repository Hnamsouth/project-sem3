
import React,{useContext,useEffect} from "react";
import UserContext from "../../../context/userContext";
import Pusher from 'pusher-js';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import UserOrder from "./component/order";
import { Link } from "react-router-dom";
import { getProfile } from "../../../Service/auth.service";
const Uprofile = (props)=>{
    const {state,dispatch}=useContext(UserContext);

    const p = new Pusher('47e4e48aead7fea024b6', {
        cluster: 'ap1',
        encrypted: true // Use SSL
    });

    
    const ListenUserInfo = async ()=>{
        const channel = p.subscribe('to-client');
        channel.bind('user-update',async function(rs) {
            dispatch({type:"SET_USER",payload:await getProfile()})
        });
        return () => {
            p.unsubscribe('user-update');
        };
    }


    useEffect( ()=>{
        ListenUserInfo()
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
                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to="#">Shop</Link></li>
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
                                            <UserOrder state={state} dispatch={dispatch}/>
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