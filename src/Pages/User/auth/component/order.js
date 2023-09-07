
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ListOrder from './list-order';
import { Col, Form, Row } from 'react-bootstrap';
import { useEffect } from 'react';

const STS_PENDING = 0;
const STS_PROCESSING = 1;
const STS_DELEVERED = 2;
const STS_COMPLETED = 3;
const STS_DENIED = 4;
const STS_CANCELLED = 5;

const UserOrder = ({state,dispatch})=>{
    return (
        <Tabs
        defaultActiveKey="completed"
        id="justify-tab-example"
        className="mb-3"
        justify
        variant='pills'
        >
            <Tab eventKey="to-pay" title="To Pay">
                {
                    state.User.order?.map((e,i)=>{
                        if(e.status===STS_PENDING) {
                            return (
                                <ListOrder orders={e}  state={state} dispatch={dispatch} status={STS_PENDING}/>
                            );
                        }
                        return <></>;
                    })
                }
            </Tab>
            <Tab eventKey="to-ship" title="To Ship">
                <Row className='mb-2 justify-content-end' >
                    <Col xs={6} sm={3}>
                        <Form.Control type='date' name='sortOrder' className='' placeholder='Sort'></Form.Control>
                    </Col>
                </Row>
                {
                    state.User.order?.map((e,i)=>{
                        if(e.status===STS_PROCESSING) {
                            return (
                                <ListOrder orders={e} state={state} dispatch={dispatch} status={STS_PROCESSING}/>
                            );
                        }
                        return <></>;
                    })
                }
            </Tab>
            <Tab eventKey="to-receive" title="To Receive">
                {
                    state.User.order?.map((e,i)=>{
                        if(e.status===STS_DELEVERED) {
                            return (
                                <ListOrder orders={e} state={state} dispatch={dispatch} status={STS_DELEVERED}/>
                            );
                        }
                        return <></>;
                    })
                    
                }
            </Tab>
            <Tab eventKey="completed" title="Completed">
                {
                    state.User.order?.map((e,i)=>{
                        if(e.status===STS_COMPLETED) {
                            return (
                                <ListOrder orders={e} state={state} dispatch={dispatch} status={STS_COMPLETED}/>
                            );
                        }
                        return <></>;
                    })
                }
            </Tab>
            <Tab eventKey="cancelled" title="Cancelled" >
            {
                    state.User.order?.map((e,i)=>{
                        if(e.status===STS_CANCELLED) {
                            return (
                                <ListOrder orders={e}  state={state} dispatch={dispatch} status={STS_CANCELLED}/>
                            );
                        }
                        return <></>;
                    })
                }
            </Tab>
        </Tabs>
    )
}
export default UserOrder;