import React from "react";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import api from "../../Service/api";
import ProductGrid from "../../Conponents/productGrid";
import { getProduct } from "../../Service/product.service";

export default class ProductPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            products:[]
        };
    }    
    async componentDidMount(){
        const products = await getProduct(12);
        this.setState({products:products});
    }
    render(){
        const products = this.state.products;
        return(
            <div>
                <h1>ProductPage</h1>
                <Row>
                    {products.map((e,i)=>{
                        return (
                            <Col key={i} md={4} style={{display: "flex"}} className="mb-4">
                                <ProductGrid product={e}/>
                            </Col>
                        )
                    })}
                </Row>
                
            </div>
        )
    }
}