
import { Accordion, Card, Col, Image, Row, useAccordionButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { cancelOrder } from '../../../../Service/order.service';
import { notify } from '../../../../Service/app.service';

const STS_PENDING = 0;
const STS_PROCESSING = 1;
const STS_DELEVERED = 2;
const STS_COMPLETED = 3;
const STS_DENIED = 4;
const STS_CANCELLED = 5;
const ListOrder = ({orders,state,dispatch,status})=>{
    console.log(state)
    const CancelOrder = async ()=>{
        let rs = await cancelOrder(orders.id);
        if(rs.status===true){
            state.User.order.find(e=>e.id===orders.id).status=STS_CANCELLED;
            dispatch({type:"SET_USER",payload:state.User})
            notify("Cancelled...!");
        }else{
            notify("Cancel Faild...!");
        }
    }

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey);
        return (
            <button type="button" onClick={decoratedOnClick} className='btn-acd-order'>
                {children}
            </button>
        );
    }

    return (
        <Accordion>
        <CustomToggle eventKey="0">
            <div className='mb-1'>
                        <Row className='align-items-center'>
                                <Col md={2}>
                                    <Image src={orders.orderDetails.at(0).img} width={100} height={100} thumbnail alt='asd'/>
                                </Col>
                                <Col md={8} className=' pr-3'>
                                    <Row className='align-items-center'>
                                        <Col >
                                            <Row className=' flex-column'>
                                                <Col>
                                                    <Row className=''>
                                                        <Col  style={{textAlign:"start"}}>
                                                            <h4>First Product Name</h4>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                    <Row className=''>
                                                        <Col  style={{textAlign:"start"}}>
                                                            <strong>Size: </strong> <span className=' text-secondary'>{orders.orderDetails.at(0).productSize.size.name} (x{orders.orderDetails.at(0).qty})</span>
                                                        </Col>
                                                    
                                                        <Col style={{textAlign:"end"}}>
                                                        <strong>Total: </strong> <span className=' text-secondary'>${orders.orderDetails.at(0).price}</span>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col>
                                                    <Row className=''>
                                                        <Col style={{textAlign:"start"}}>
                                                            <span className='text-gray'>{orders.orderDetails.length} item</span>
                                                        </Col>
                                                        <Col style={{textAlign:"end"}}>
                                                        <strong>Order Total: </strong> <span className=' text-secondary'>${orders.total}</span>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md={2}>
                                {
                                    status===STS_PENDING || status===STS_PROCESSING? 
                                    (
                                        <button className='btn btn-outline-danger' onClick={()=>CancelOrder()}> Cancel</button>
                                    ):status===STS_CANCELLED || status===STS_COMPLETED?
                                    (
                                        <Link>
                                            <button className='btn btn-outline-primary-2' onClick={()=>{}}> Buy Again</button>
                                        </Link>
                                        
                                    ):""
                                }
                                </Col>
                        </Row>
                        <div className='text-center text-gray'>
                            View Detail
                        </div>
                </div>
        </CustomToggle>
                
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <div style={{lineHeight:'initial'}}>
                        <h5>Delivery Address</h5>
                        <p><strong>Name:</strong> {orders.firstname +" "+ orders.laststname}</p>
                        <p><strong>Phone:</strong> {orders.phone}</p>
                        <p><strong>Adress:</strong> {orders.district +"-"+ orders.street +"-"+orders.district +"-"+orders.city +"-"+orders.country }</p>
                    </div>
                        {
                            orders.orderDetails.length>1 &&  orders.orderDetails.map((e,i)=>{
                                return (
                                    <Link>
                                        <Row className='align-items-center border-bottom mt-1'>
                                            <Col sm={2}>
                                                <Image src={e.img} width={50} height={50} thumbnail alt='asd'/>
                                            </Col>
                                            <Col sm={10} className=' pr-3'>
                                                <Row className='align-items-center'>
                                                    <Col>
                                                        <Row className='flex-column'>
                                                            <Col>
                                                                <Row className=''>
                                                                    <Col sm={6}  style={{textAlign:"start"}}>
                                                                        <strong>First Product Name</strong>
                                                                    </Col>
                                                                    <Col sm={3} style={{textAlign:"start"}}>
                                                                        <strong>Size: </strong> <span className=' text-secondary'>{e.productSize.size.name} (x{e.qty})</span>
                                                                    </Col>
                                                                    <Col sm={3}  style={{textAlign:"end"}}>
                                                                    <strong>Total: </strong> <span className=' text-secondary'>${e.price}</span>
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Link>
                                );
                            })
                        }
                </Card.Body>
            </Accordion.Collapse>
        </Accordion>
        
    );
}

export default ListOrder;