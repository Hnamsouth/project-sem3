import React, { useContext, useState ,useEffect} from 'react';
import UserContext from '../../context/userContext';
import AuthModal from '../../Pages/User/auth/AuthModal';
import { Link } from 'react-router-dom';
import api from '../../Service/api';
import { useNavigate  } from 'react-router-dom';
import { getNavData } from '../../Service/app.service';
import { Iuser } from '../../context/initState';

import Modal from 'react-modal';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { searchProduct } from '../../Service/product.service';

const customStyles = {
    content:{
        position: "absolute",
        border:"none",
        background:"none",
        overflow:"hiden",
        padding:0,
        top:"60px",
        left:0,
        right:0,
        width: "100%",
        height: "100%"
    },
    overlay:{
        "background-color": "rgb(75 75 75 / 48%)",
        "z-index": "1050",
    }
};

Modal.setAppElement('#root');


const HEADER = ()=>{
    const {state,dispatch}=useContext(UserContext);
    const [modalShow, setModalShow] = React.useState(false);
    const [search,setSearch]=useState({data:[],text:""});
    const navigate = useNavigate();

    const showModal = () => {
        dispatch({ type: "SHOW_AUTH_MODAL" });
    }
    const handleSearch = async (text)=>{

        let rs = await searchProduct(text);
        if(rs){
            return  setSearch({data:rs,text:text});
        }
        setSearch({data:[],text:text});
        console.log(rs)
    }

    const LogOut = ()=>{
        state.token="";
        api.defaults.headers.common["Authorization"]="";
        localStorage.removeItem("token");
        dispatch({type:"SET_USER",payload:Iuser})
        navigate("/");
    }



    return (
        <header className="header">
                        <div className="header-top">
                            <div className="container">
                                <div className="header-left">
                                    <div className="header-dropdown">
                                        <a href="#">Usd</a>
                                        <div className="header-menu">
                                            <ul>
                                                <li><a href="#">Eur</a></li>
                                                <li><a href="#">Usd</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="header-dropdown">
                                        <a href="#">Eng</a>
                                        <div className="header-menu">
                                            <ul>
                                                <li><a href="#">English</a></li>
                                                <li><a href="#">Viet Nam</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="header-right">
                                    <ul className="top-menu">
                                        <li>
                                            <a href="#">Links</a>
                                            <ul>
                                                <li><a href="tel:#"><i className="icon-phone"></i>Call: +0123 456 789</a></li>
                                                <li><a href="about.html">About Us</a></li>
                                                <li><a href="contact.html">Contact Us</a></li>
                                                {state.User.profile==null ? (<li>
                                                        <a type='button' onClick={showModal}><i className="icon-user"></i>Login</a>
                                                        <AuthModal state={state}/>
                                                    </li>):""}
                                            </ul>
                                        </li>
                                    </ul>

                                    {state.User.profile!=null?( <div className="header-dropdown">
                                        <a >{state.User.profile.email??""}</a>
                                        <div className="header-menu">
                                            <ul>
                                                <li><Link to={"/u-profile"}>Profile</Link></li>
                                                <li><a href="#" onClick={LogOut}>LogOut</a></li>
                                            </ul>
                                        </div>
                                    </div>):""}
                                </div>
                            </div>
                        </div>

                        <div className="header-middle sticky-header">
                            <div className="container">
                                <div className="header-left">
                                    <button className="mobile-menu-toggler">
                                        <span className="sr-only">Toggle mobile menu</span>
                                        <i className="icon-bars"></i>
                                    </button>
                                    <Link to={"/"} className='logo'>
                                        <img src="../user/assets/images/demos/demo-21/logo.png" alt="Molla Logo" width="100" height="25"/>
                                    </Link>
                                    <nav className="main-nav">
                                        <ul className="menu sf-arrows">
                                            { state.Nav.length>0 && state.Nav.map((e,i)=>{
                                                return (
                                                    <li className={i==0?"megamenu-container active":""} key={i}>
                                                        <a href="index.html" className="sf-with-ul">{e.title}</a>
                                                            {e.data.length>0 && (
                                                                <ul>{
                                                                    e.data.map((c,j)=>{
                                                                    return (
                                                                            <li key={j}>
                                                                                <a href="about.html" className="sf-with-ul">{c.name}</a>
                                                                                    {c.data.length > 0 && (
                                                                                        <ul>
                                                                                            {c.data.map((d,k)=>{
                                                                                                return (
                                                                                                    <li key={k}><a href="about.html">{d.name}</a></li>
                                                                                                )
                                                                                            })}
                                                                                        </ul>
                                                                                    )
                                                                                    }
                                                                            </li>
                                                                        );
                                                                    })
                                                                }</ul>
                                                            )}
                                                        
                                                    </li>
                                                );
                                            })}
                                            <li>
                                                <Link to={"/shop"} className="sf-with-ul">SHOP</Link>
                                            </li>
                                            <li>
                                                <a href="blog.html" className="sf-with-ul">Blog</a>

                                                <ul>
                                                    <li><a href="blog.html">Classic</a></li>
                                                    <li><a href="blog-listing.html">Listing</a></li>
                                                    <li>
                                                        <a href="#">Grid</a>
                                                        <ul>
                                                            <li><a href="blog-grid-2cols.html">Grid 2 columns</a></li>
                                                            <li><a href="blog-grid-3cols.html">Grid 3 columns</a></li>
                                                            <li><a href="blog-grid-4cols.html">Grid 4 columns</a></li>
                                                            <li><a href="blog-grid-sidebar.html">Grid sidebar</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Masonry</a>
                                                        <ul>
                                                            <li><a href="blog-masonry-2cols.html">Masonry 2 columns</a></li>
                                                            <li><a href="blog-masonry-3cols.html">Masonry 3 columns</a></li>
                                                            <li><a href="blog-masonry-4cols.html">Masonry 4 columns</a></li>
                                                            <li><a href="blog-masonry-sidebar.html">Masonry sidebar</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Mask</a>
                                                        <ul>
                                                            <li><a href="blog-mask-grid.html">Blog mask grid</a></li>
                                                            <li><a href="blog-mask-masonry.html">Blog mask masonry</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="#">Single Post</a>
                                                        <ul>
                                                            <li><a href="single.html">Default with sidebar</a></li>
                                                            <li><a href="single-fullwidth.html">Fullwidth no sidebar</a></li>
                                                            <li><a href="single-fullwidth-sidebar.html">Fullwidth with sidebar</a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href="elements-list.html" className="sf-with-ul">Elements</a>

                                                <ul>
                                                    <li><a href="elements-products.html">Products</a></li>
                                                    <li><a href="elements-typography.html">Typography</a></li>
                                                    <li><a href="elements-titles.html">Titles</a></li>
                                                    <li><a href="elements-banners.html">Banners</a></li>
                                                    <li><a href="elements-product-category.html">Product Category</a></li>
                                                    <li><a href="elements-video-banners.html">Video Banners</a></li>
                                                    <li><a href="elements-buttons.html">Buttons</a></li>
                                                    <li><a href="elements-accordions.html">Accordions</a></li>
                                                    <li><a href="elements-tabs.html">Tabs</a></li>
                                                    <li><a href="elements-testimonials.html">Testimonials</a></li>
                                                    <li><a href="elements-blog-posts.html">Blog Posts</a></li>
                                                    <li><a href="elements-portfolio.html">Portfolio</a></li>
                                                    <li><a href="elements-cta.html">Call to Action</a></li>
                                                    <li><a href="elements-icon-boxes.html">Icon Boxes</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>

                                <div className="header-right">
                                    <div className="header-search">
                                        <a className='search-toggle' role='button' onClick={() => setModalShow(true)}><i className="icon-search" /></a>
                                        <form action="#" method="get">
                                            <div className="header-search-wrapper">
                                            <label htmlFor="q" className="sr-only">Search</label>
                                            <input type="search" className="form-control" name="q" id="q" placeholder="Search in..." required />
                                            </div>{/* End .header-search-wrapper */}
                                        </form>
                                    </div>{/* End .header-search */}
                                    <div className="wishlist">
                                        <Link to={"/favorite"} title="Wishlist">
                                            <i className="icon-heart-o" />
                                            <span className="wishlist-count">{state.User.favorite?.length>0?state.User.favorite.length:0}</span>
                                        </Link>
                                    </div>
                                    <div className="dropdown cart-dropdown">
                                        <Link to={"/cart"} className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                            <i className="icon-shopping-cart" />
                                            <span className="cart-count">{state.User.cart?.length>0?state.User.cart.length:0}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                            <Modal
                            isOpen={modalShow}
                            style={customStyles}
                            contentLabel="Example Modal"
                            >
                                <Card className='container-search p-3'>
                                    <Card.Header>
                                        <button type='button' onClick={()=>setModalShow(false)} className='close' aria-label="Close"><i className='icon-close'></i></button>
                                    </Card.Header>
                                    <Card.Body>
                                        <Row className=' justify-content-center search-bar'>
                                            <Col sm={11}>
                                                <input type='text' className='form-control ip-search' name='search' onChange={(e)=>handleSearch(e.target.value)} />
                                                <i class="icon-search"></i>
                                            </Col>
                                        </Row>
                                        <Row  className=' justify-content-center mb-2'>
                                            {search['data'].length > 0 && search['data'].map((e,i)=>{
                                                return (
                                                    <Col sm={11} className='mb-1'>
                                                        <Row>
                                                            <Col sm={2}>
                                                                <Image src={e.productColors[0].productColorImages[0].url} width={60} height={60} thumbnail alt='asd'/>
                                                            </Col>
                                                            <Col sm={9}>
                                                                <Row className='align-items-center'>
                                                                    <Col>
                                                                        <Row className=' flex-column'>
                                                                            <Col>
                                                                            <span className=' text-light'>{e.categoryDetail.category.name}</span>
                                                                            </Col>
                                                                            <Col>
                                                                                <h6>{e.name}</h6>
                                                                            </Col>
                                                                        </Row>
                                                                    </Col>
                                                                    <Col>
                                                                        ${e.price}
                                                                    </Col>
                                                                </Row>
                                                                
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                );
                                            })}
                                        </Row>
                                        {search['text'] && (
                                            <Link > <h4>See All "{search['text']}"</h4></Link>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Modal>
                    </header>
    );
}
export default HEADER;