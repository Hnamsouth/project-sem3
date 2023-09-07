import { useContext, useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getC_CDT, getProduct, getSortBy, getSortCustom } from '../../Service/product.service';
import Accordion from 'react-bootstrap/Accordion';
import { Col, Form, Row } from 'react-bootstrap';
import UserContext from '../../context/userContext';
import { Link } from 'react-router-dom';
const IsortData = {ctgrSelect:[],ctgrDetailSelect:[],colorSelect:[],sizeSelect:[]}

const Shop = ()=>{
    const {state,dispatch}=useContext(UserContext);
    const [product,setProduct]= useState([]);
    const [filterData,setFilterData]=useState({data:null});
    const [sortData,setSortData]=useState(IsortData);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        console.log(sortData)
        setShow(false)
    };
    const handleShow = () => {
        console.log(sortData)
        setShow(true)
    };

    const CleanAll = async ()=>{
        dispatch({type:"SHOW_LOADING"})
        setSortData(IsortData);

        let rs = await getProduct();
        setProduct(rs);
        dispatch({type:"HIDE_LOADING"})
    }

    const getData =async ()=>{
        dispatch({type:"SHOW_LOADING"})
        let rs = await getProduct();
        let c_cdt = await getC_CDT();

        setProduct(rs);
        setFilterData((prev) =>({...prev,data:c_cdt}));
        dispatch({type:"HIDE_LOADING"})
    }
    const SortBy =async (key)=>{
        let rs = await getSortBy(key);
        setProduct(rs);
    } 
    const handleSelect =async (e)=>{
        console.log(e.target.checked)
        dispatch({type:"SHOW_LOADING"})
        if(!sortData[e.target.name]?.length>0){
            sortData[e.target.name].push(e.target.value)
            setSortData((prev) =>({...prev,[e.target.name]:sortData[e.target.name]}));
        }else{
            let check =  sortData[e.target.name].indexOf(e.target.value);
            if(check<0){
                sortData[e.target.name].push(e.target.value)
                setSortData((prev) =>({...prev,[e.target.name]:sortData[e.target.name]}));
            }else{
                sortData[e.target.name].splice(check,1);
            }
        }
        if(sortData['colorSelect'].length>0 || sortData['ctgrSelect'].length>0 || sortData['ctgrDetailSelect'].length>0 || sortData['sizeSelect'].length>0){
            const rs = await getSortCustom(sortData);
            setProduct(rs);
            dispatch({type:"HIDE_LOADING"})
            return;
        }
        dispatch({type:"HIDE_LOADING"})
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <main className="main">
            <div className="page-header text-center" style={{backgroundImage: 'url("/user/assets/images/page-header-bg.jpg")'}}>
            <div className="container">
                <h1 className="page-title">Boxed No Sidebar<span>Shop</span></h1>
            </div>{/* End .container */}
            </div>{/* End .page-header */}
            <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
            <div className="container">
                <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                <li className="breadcrumb-item"><a href="#">Shop</a></li>
                <li className="breadcrumb-item"><a href="#">No Sidebar</a></li>
                <li className="breadcrumb-item active" aria-current="page">Boxed</li>
                </ol>
            </div>{/* End .container */}
            </nav>
            <div className="page-content">
            <div className="container">
                <div className="toolbox">
                    <div className="toolbox-left">
                        <a type='button' className="sidebar-toggler" onClick={handleShow}><i className="icon-bars" />Filters</a>
                    </div>
                    <div className="toolbox-center">
                        <div className="toolbox-info">
                        Showing <span>12 of 56</span> Products
                        </div>
                    </div>
                    <div className="toolbox-right">
                        <div className="toolbox-sort">
                            <label htmlFor="sortby">Sort by:</label>
                            <div className="select-custom">
                                <select name="sortby" id="sortby" className="form-control">
                                <option value="popularity" selected="selected">Most Popular</option>
                                <option value="rating">Most Rated</option>
                                <option value="date">Date</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
                    <div className="products">
                        <div className="row">
                        {
                            product?.length >0 &&  product?.map((e,i)=>{
                                return (
                                    <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                                        <div className="product  text-center">
                                            <figure className="product-media">
                                            <span className="product-label label-new">New</span>
                                            <a href="product.html">
                                                <img src={e.productColors[0].productColorImages[0].url} alt="Product image" className="product-image" />
                                            </a>
                                            <div className="product-action-vertical">
                                                <a href='#' className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                                <a href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"><span>quick view</span></a>
                                            </div>
                                            <div class="product-action border-bottom">
                                                <Link to={`/product/${e.id}`} class="btn-product btn-cart"><span>add to cart</span></Link>
                                            </div>
                                            </figure>
                                            <div className="product-body">
                                                <div className="product-cat">
                                                    <a href="#">{e.gender==0?"Men":"Women"}</a>
                                                </div>
                                                <h3 className="product-title"><a href="product.html">{e.name}</a></h3>{/* End .product-title */}
                                                <div className="product-price">
                                                    ${e.price.toFixed(2)}
                                                </div>
                                                <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{width: '90%'}} />
                                                    </div>
                                                    <span className="ratings-text">( 2 Reviews )</span>
                                                </div>
                                                <div class="product-nav product-nav-thumbs">
                                                {
                                                    e.productColors?.map((s,o)=>{
                                                        return (
                                                            <a href="#" className={o===0?"active":""}>
                                                                <img src={s.productColorImages[0].url} alt="product desc"/>
                                                            </a>
                                                        );
                                                    })
                                                }    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                        </div>
                        <div className="load-more-container text-center">
                            <a href="#" className="btn btn-outline-darker btn-load-more">More Products <i className="icon-refresh" /></a>
                        </div>
                    </div>
                <div className="sidebar-filter-overlay" />

                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Body>
                    <div className='sidebar-shop'>
                        <div className="sidebar-filter-wrapper">
                            <div className="widget widget-clean">
                            <label typeof='button' onClick={handleClose}><i className="icon-close" /> Filters</label>
                            <a href="#" className="sidebar-filter-clear" onClick={()=>CleanAll()}>Clean All</a>
                            </div>
                            {/* sort by */}
                            <Accordion defaultActiveKey="0" className='widget widget-collapsible'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        Sort By
                                    </Accordion.Header>
                                    <Accordion.Body className='widget-body pl-3 pr-3'>
                                        <Row className='flex-column'>
                                            <Col className='border-bottom p-2'><a href='#' className='text-dark' onClick={()=>SortBy(0)}>PRICE (LOW - HIGH)</a></Col>
                                            <Col className='border-bottom p-2'><a href='#' className='text-dark' onClick={()=>SortBy(1)}>NEWEST </a></Col>
                                            <Col className='border-bottom p-2'><a href='#' className='text-dark' onClick={()=>SortBy(2)}>TOP SELLER</a></Col>
                                            <Col className='p-2'><a href='#' className='text-dark' onClick={()=>SortBy(3)}>PRICE (HIGH - LOW)</a></Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            {/* sort category */}
                            <Accordion className='widget widget-collapsible'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        Category
                                    </Accordion.Header>
                                    <Accordion.Body className='widget-body pl-3 pr-3'>
                                        <div className="filter-items filter-items-count">
                                        {
                                            filterData['data']?.categories.map((e,i)=>{
                                                return(
                                                <div className="filter-item">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" name={"ctgrSelect"} value={e.id} id={"cat-"+i}  onClick={(e)=>handleSelect(e)}/>
                                                        <label className="custom-control-label" htmlFor={"cat-"+i} >{e.name}</label>
                                                    </div>
                                                    <span className="item-count">{e.count}</span>
                                                </div>
                                                );
                                            })
                                        }
                                            
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            {/* category detail */}
                            <Accordion  className='widget widget-collapsible'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        Category Detail
                                    </Accordion.Header>
                                    <Accordion.Body className='widget-body pl-3 pr-3'>
                                        <div className="filter-items filter-items-count">
                                        {
                                            filterData['data']?.categoryDetail.map((e,i)=>{
                                                return(
                                                <div className="filter-item">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" name='ctgrDetailSelect' value={e.id} id={"ctgr-dt-"+i} onClick={(e)=>handleSelect(e)}/>
                                                        <label className="custom-control-label" htmlFor={"ctgr-dt-"+i}>{e.name}</label>
                                                    </div>
                                                    <span className="item-count">{e.count}</span>
                                                </div>
                                                );
                                            })
                                        }
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            {/* Color */}
                            <Accordion  className='widget widget-collapsible'>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        Color
                                    </Accordion.Header>
                                    <Accordion.Body className='widget-body pl-3 pr-3'>
                                        <div className="filter-colors">
                                            <a href="#" style={{background: '#b87145'}}><span className="sr-only">Color Name</span></a>
                                            <a href="#" style={{background: '#f0c04a'}}><span className="sr-only">Color Name</span></a>
                                            <a href="#" style={{background: '#333333'}}><span className="sr-only">Color Name</span></a>
                                            <a href="#" className="selected" style={{background: '#cc3333'}}><span className="sr-only">Color Name</span></a>
                                            <a href="#" style={{background: '#3399cc'}}><span className="sr-only">Color Name</span></a>
                                            <a href="#" style={{background: '#669933'}}><span className="sr-only">Color Name</span></a>
                                            <a href="#" style={{background: '#f2719c'}}><span className="sr-only">Color Name</span></a>
                                            <a href="#" style={{background: '#ebebeb'}}><span className="sr-only">Color Name</span></a>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            {/* Size */}
                            <Accordion  className='widget widget-collapsible'>
                                <Accordion.Item  eventKey="0">
                                    <Accordion.Header>
                                        Size
                                    </Accordion.Header>
                                    <Accordion.Body className='widget-body pl-3 pr-3'>
                                        <div className="filter-items filter-items-count">
                                            <div className="filter-item">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="size-1"  onClick={(e)=>handleSelect(e)}/>
                                                    <label className="custom-control-label" htmlFor="size-1">XS</label>
                                                </div>
                                            </div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <div className="widget widget-collapsible">
                                <h3 className="widget-title">
                                    <a data-toggle="collapse" href="#widget-5" role="button" aria-expanded="true" aria-controls="widget-5">
                                    Price
                                    </a>
                                </h3>
                                <div className="collapse show" id="widget-5">
                                    <div className="widget-body">
                                    <div className="filter-price">
                                        <div className="filter-price-text">
                                        Price Range:
                                        <span id="filter-price-range" />
                                        </div>{/* End .filter-price-text */}
                                        <div id="price-slider" />{/* End #price-slider */}
                                    </div>{/* End .filter-price */}
                                    </div>{/* End .widget-body */}
                                </div>
                            </div>
                        </div>
                    </div>
                    </Offcanvas.Body>
                </Offcanvas>

                

            </div>
            </div>
        </main>
    );
}

export default Shop;