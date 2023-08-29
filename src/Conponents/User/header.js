import React, { useContext, useState ,useEffect} from 'react';
import UserContext from '../../context/userContext';
import AuthModal from '../../Pages/User/auth/AuthModal';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import api from '../../Service/api';
import { useNavigate  } from 'react-router-dom';
import { getNavData } from '../../Service/app.service';

const HEADER = ()=>{
    const {state,dispatch}=useContext(UserContext);
    const [Nav,setNav]=useState([]);
    const navigate = useNavigate();
    const showModal = () => {
        dispatch({ type: "SHOW_AUTH_MODAL" });
    }
    const LogOut = ()=>{
        state.token="";
        api.defaults.headers.common["Authorization"]="";
        localStorage.removeItem("token");
        dispatch({type:"SET_USER",payload:null})
        navigate("/");
    }
    const GetNav = async ()=>{
        const rs = await getNavData();
        setNav(rs);
    } 
    useEffect(()=>{
        console.log(state.User)
        GetNav();
    },[])
    // useEffect(()=>{

    // },[state.User])
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
                                                        <AuthModal/>
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
                                            { Nav.length>0 && Nav.map((e,i)=>{
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
                                            {/*
                                            <li className="megamenu-container ">
                                                <a href="index.html" className="sf-with-ul">OUTLET</a>
                                            </li>
                                             <li>
                                                <a href="category.html" className="sf-with-ul">Shop</a>
                                                <div className="megamenu megamenu-md">
                                                    <div className="row no-gutters">
                                                        <div className="col-md-8">
                                                            <div className="menu-col">
                                                                <div className="row">
                                                                    <div className="col-md-6">
                                                                        <div className="menu-title">Shop with sidebar</div>
                                                                        <ul>
                                                                            <li><a href="category-list.html">Shop List</a></li>
                                                                            <li><a href="category-2cols.html">Shop Grid 2 Columns</a></li>
                                                                            <li><a href="category.html">Shop Grid 3 Columns</a></li>
                                                                            <li><a href="category-4cols.html">Shop Grid 4 Columns</a></li>
                                                                            <li><a href="category-market.html"><span>Shop Market<span className="tip tip-new">New</span></span></a></li>
                                                                        </ul>

                                                                        <div className="menu-title">Shop no sidebar</div>
                                                                        <ul>
                                                                            <li><a href="category-boxed.html"><span>Shop Boxed No Sidebar<span className="tip tip-hot">Hot</span></span></a></li>
                                                                            <li><a href="category-fullwidth.html">Shop Fullwidth No Sidebar</a></li>
                                                                        </ul>
                                                                    </div>

                                                                    <div className="col-md-6">
                                                                        <div className="menu-title">Product Category</div>
                                                                        <ul>
                                                                            <li><a href="product-category-boxed.html">Product Category Boxed</a></li>
                                                                            <li><a href="product-category-fullwidth.html"><span>Product Category Fullwidth<span className="tip tip-new">New</span></span></a></li>
                                                                        </ul>
                                                                        <div className="menu-title">Shop Pages</div>
                                                                        <ul>
                                                                            <li><a href="cart.html">Cart</a></li>
                                                                            <li><a href="checkout.html">Checkout</a></li>
                                                                            <li><a href="wishlist.html">Wishlist</a></li>
                                                                            <li><a href="dashboard.html">My Account</a></li>
                                                                            <li><a href="#">Lookbook</a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-4">
                                                            <div className="banner banner-overlay">
                                                                <a href="category.html" className="banner banner-menu">
                                                                    <img src="../user/assets/images/menu/banner-1.jpg" alt="Banner"/>

                                                                    <div className="banner-content banner-content-top">
                                                                        <div className="banner-title text-white">Last <br/>Chance<br/><span><strong>Sale</strong></span></div>
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li> */}
                                            <li>
                                                <a href="#" className="sf-with-ul">Pages</a>
                                                <ul>
                                                    <li>
                                                        <a href="about.html" className="sf-with-ul">About</a>
                                                        <ul>
                                                            <li><a href="about.html">About 01</a></li>
                                                            <li><a href="about-2.html">About 02</a></li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <a href="contact.html" className="sf-with-ul">Contact</a>
                                                        <ul>
                                                            <li><a href="contact.html">Contact 01</a></li>
                                                            <li><a href="contact-2.html">Contact 02</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="login.html">Login</a></li>
                                                    <li><a href="faq.html">FAQs</a></li>
                                                    <li><a href="404.html">Error 404</a></li>
                                                    <li><a href="coming-soon.html">Coming Soon</a></li>
                                                </ul>
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
                                        <a href="#" className="search-toggle" role="button" title="Search"><i className="icon-search" /></a>
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
                                            <span className="wishlist-count">{state.User.favorite.length>0?state.User.favorite.length:0}</span>
                                        </Link>
                                    </div>
                                    <div className="dropdown cart-dropdown">
                                        <Link to={"/cart"} className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                            <i className="icon-shopping-cart" />
                                            <span className="cart-count">{state.User.cart.length>0?state.User.cart.length:0}</span>
                                        </Link>
                                        {/* <div className="dropdown-menu dropdown-menu-right">
                                            <div className="dropdown-cart-products">
                                            <div className="product">
                                                <div className="product-cart-details">
                                                <h4 className="product-title">
                                                    <a href="product.html">Beige knitted elastic runner shoes</a>
                                                </h4>
                                                <span className="cart-product-info">
                                                    <span className="cart-product-qty">1</span>
                                                    x $84.00
                                                </span>
                                                </div>
                                                <figure className="product-image-container">
                                                <a href="product.html" className="product-image">
                                                    <img src="assets/images/products/cart/product-1.jpg" alt="product" />
                                                </a>
                                                </figure>
                                                <a href="#" className="btn-remove" title="Remove Product"><i className="icon-close" /></a>
                                            </div>
                                            <div className="product">
                                                <div className="product-cart-details">
                                                <h4 className="product-title">
                                                    <a href="product.html">Blue utility pinafore denim dress</a>
                                                </h4>
                                                <span className="cart-product-info">
                                                    <span className="cart-product-qty">1</span>
                                                    x $76.00
                                                </span>
                                                </div>
                                                <figure className="product-image-container">
                                                <a href="product.html" className="product-image">
                                                    <img src="assets/images/products/cart/product-2.jpg" alt="product" />
                                                </a>
                                                </figure>
                                                <a href="#" className="btn-remove" title="Remove Product"><i className="icon-close" /></a>
                                            </div>
                                            </div>
                                            <div className="dropdown-cart-total">
                                            <span>Total</span>
                                            <span className="cart-total-price">$160.00</span>
                                            </div>
                                            <div className="dropdown-cart-action">
                                            <a href="cart.html" className="btn btn-primary">View Cart</a>
                                            <a href="checkout.html" className="btn btn-outline-primary-2"><span>Checkout</span><i className="icon-long-arrow-right" /></a>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>

                                {/* <div className="header-right">
                                    <div className="header-search">
                                        <a href="#" className="search-toggle" role="button" title="Search"><i className="icon-search"></i></a>
                                        <form action="#" method="get">
                                            <div className="header-search-wrapper">
                                                <label for="q" className="sr-only">Search</label>
                                                <input type="search" className="form-control" name="q" id="q" placeholder="Search in..." required />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="wishlist">
                                        <Link to={"/favorite"}>
                                            <i className="icon-heart-o"></i>
                                            <span className="wishlist-count" style={{ marginBottom: 22, marginLeft: 44, position: "absolute" }}>{favorite.length>0?favorite.length:0}</span>
                                        </Link>
                                    </div>

                                    <div className="dropdown cart-dropdown">
                                        <Link to={"/cart"} className="dropdown-toggle">
                                            <i className="icon-shopping-cart"></i>
                                            <span className="cart-count" style={{ marginBottom: 22, marginLeft: 19, position: "absolute" }}>{cart.length > 0 ? cart.length : 0}</span>
                                        </Link>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </header>
    );
}
export default HEADER;