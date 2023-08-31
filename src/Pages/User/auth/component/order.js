
import Tab from 'react-bootstrap/Tab';

import Tabs from 'react-bootstrap/Tabs';
const UserOrder = ()=>{

    return (
        <Tabs
        defaultActiveKey="completed"
        id="justify-tab-example"
        className="mb-3"
        justify
        variant='pills'
        >
            <Tab eventKey="to-ship" title="To Ship">
                Tab content for Home
            </Tab>
            <Tab eventKey="to-receive" title="To Receive">
                Tab content for Profile
            </Tab>
            <Tab eventKey="completed" title="Completed">
                Tab content for Loooonger Tab
            </Tab>
            <Tab eventKey="cancelled" title="Cancelled" >
                Tab content for Contact
            </Tab>
            <Tab eventKey="return-refund" title="Return Refund" >
                Tab content for Contact
            </Tab>
        </Tabs>
    )
}
export default UserOrder;