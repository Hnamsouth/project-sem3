import { getProduct } from "../../Service/product.service";
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import { addProductInFavorite, deleteFavorite } from "../../Service/favorite.service";
import {getAllProductInFavorite} from '../../Conponents/getAllProduct';
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const HomeU = () => {
    const {state,dispatch}=useContext(UserContext);
    const [product, setProduct] = useState([]);
    const [img,setimg]=useState(null);
    const logo =[1,2,3,4,5,6,7];
    const adCP = [1,2];


    const getAllProduct = async () => {
        const p = await getProduct();
        setProduct(p);
    }
    useEffect(() => {
        getAllProduct();
    }, []);

    useEffect(()=>{
        
    },[product])

    return (
        <main className="main">
            {/* Ad campaign */}
            <div className="intro-slider-container mb-5">
                <OwlCarousel className='intro-slider owl-theme mb-5 owl-nav-inside owl-light'  items={1} nav loop={true} dots={false}  responsive={{
                                        "1200": {
                                            "nav": false,
                                            "dots": false
                                        }
                        }}>
                    {
                        adCP.map((e)=>{
                            return (
                                <div className="intro-slide" style={{ backgroundImage: `url(../user/assets/images/demos/demo-21/slider/slide-${e}.png)` }} >
                                    <div className="container intro-content" >
                                        <div className="row">
                                            <div className="intro">
                                                <div className="title">
                                                    <h3>WOMEN'S</h3>
                                                </div>
                                                <div className="content">
                                                    <h3>RUNNING &</h3>
                                                    <h3>TRAINING SHIRTS</h3>
                                                </div>
                                                <div className="price">
                                                    <h3>SAVE UP TO 30%</h3>
                                                </div>
                                                <div className="action">
                                                    <a href="category.html" className="btn btn-primary">
                                                        <span>DISCOVER NOW</span>
                                                    </a>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </OwlCarousel>
                <span className="slider-loader"></span>
            </div>
            {/* category */}
            <div className="container banner-container">
                <div className="col-lg-4 col-md-8 col-sm-10 col-12 col-pd1">
                    <a href="category.html">
                        <img src="../user/assets/images/demos/demo-21/banner/banner-1.jpg" />
                    </a>
                    <div className="banner-content">
                        <div className="title">
                            <a href="category.html"><h3 className="darkWhite">It's a lifestyle.</h3></a>
                        </div>
                        <div className="content">
                            <a href="category.html"><h3>Running Apparel</h3></a>
                            <a href="category.html"><h3>END OF SEASON SALE</h3></a>
                        </div>
                        <div className="action">
                            <a href="category.html" className="btn btn-demoprimary">
                                <span>SHOP NOW</span>
                                <i className="icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8 col-sm-10 col-12 col-pd1">
                    <a href="category.html">
                        <img src="../user/assets/images/demos/demo-21/banner/banner-2.jpg" />
                    </a>
                    <div className="banner-content">
                        <div className="title">
                            <a href="category.html"><h3 className="darkWhite">Hike Your Next Trail </h3></a>
                        </div>
                        <div className="content">
                            <a href="category.html"><h3>NEW SEASON</h3></a>
                            <a href="category.html"><h3>NEW GEAR</h3></a>
                        </div>
                        <div className="action">
                            <a href="category.html" className="btn btn-demoprimary">
                                <span>DISCOVER NOW</span>
                                <i className="icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-8 col-sm-10 col-12 col-pd1">
                    <a href="category.html">
                        <img src="../user/assets/images/demos/demo-21/banner/banner-3.jpg" />
                    </a>
                    <div className="banner-content">
                        <div className="title">
                            <a href="category.html"><h3 className="darkWhite">Summer Sale</h3></a>
                        </div>
                        <div className="content">
                            <a href="category.html"><h3>Swimwear sale</h3></a>
                            <a href="category.html"><h3>Save up to 30%</h3></a>
                        </div>
                        <div className="action">
                            <a href="category.html" className="btn btn-demoprimary">
                                <span>SHOP NOW</span>
                                <i className="icon-long-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Logo partner */}
            <div className="container logos">
                <OwlCarousel className='owl-simple mb-5' margin={20} items={4} nav navContainerClass="owl-nav"  dots={false}  responsive={{
                                        "0": {
                                            "items":2
                                        },
                                        "420": {
                                            "items":3
                                        },
                                        "600": {
                                            "items":4
                                        },
                                        "900": {
                                            "items":5
                                        },
                                        "1024": {
                                            "items":6
                                        }
                        }}>
                    {
                        logo.map((e)=>{
                            return (
                                <a href="#" className="brand">
                                    <img src={`../user/assets/images/brands/${e}.png`} alt="Brand Name" />
                                </a>
                            );
                        })
                    }
                </OwlCarousel>
            </div>
            {/* Best sellers product */}
            <div class="container bestsellers">
                <hr class="mb-3"/>
                <div class="heading">
                    <h2 class="title text-center">BEST SELLERS</h2>
                    <p class="content text-center mb-4">The Trends Boutique: The latest fashion trends from top brands!</p>
                </div>
                {product.length > 0 && (
                    <OwlCarousel className='owl-theme owl-simple carousel-equal-height carousel-with-shadow'  margin={20} items={4} nav  navContainerClass="owl-nav" responsive={{
                            "0": {
                                "items":2
                            },
                            "768": {
                                "items":3
                            },
                            "992": {
                                "items":4
                            }
                        }}>
                        {product.map((p,i) => {
                                    return i<5?(
                                        <div className="product demo21">
                                        <figure className="product-media">
                                            {
                                                i<2?(
                                                    <span className={"product-label label-new"}>New</span>
                                                ):i==2 || i==3?(
                                                    <span className={"product-label label-sale"}>Sale</span>
                                                ):(<></>)
                                            }
                                            <Link to={`/product/${p.id}`}>
                                                <img src={p.productColors[0].productColorImages[0].url} alt="Product image" className="product-image" style={{ maxWidth:333 +"px",maxHeight:333 +"px"}} />
                                                <img src={p.productColors[0].productColorImages[1].url} alt="Product image" className="product-image-hover" style={{maxWidth:333 +"px",maxHeight:333 +"px"}} />
                                            </Link>
                                        </figure>
                                        <div className="product-body text-center">
                                            <div className="product-cat">
                                                <a href="#">{p.categoryDetail.category.name}</a>
                                            </div>
                                            <h3 className="product-title"><a href="product.html">{p.name}</a></h3>
                                            <div className="product-price">
                                                <span className="new-price">${p.price}</span>
                                                {i==2||i==3?(
                                                    <span className="old-price">Was ${p.price+50}</span>
                                                ):(<></>)}
                                            </div>
                                            <div className="ratings-container">
                                                <div className="ratings">
                                                    <div className="ratings-val" style={{ width: 80 + "%" }}></div>
                                                </div>
                                                <span className="ratings-text">( {5} Reviews )</span>
                                            </div>
                                            <div className="product-nav">
                                                {p.productColors.map((e,id)=>{
                                                return  (
                                                    <a type="button" className=" banner-hover" onClick={()=>setimg(e)} key={id}>
                                                        <img src={e.productColorImages[0].url} style={{maxWidth:32+'px'}} className=" ml-3"/>
                                                    </a>
                                                )
                                                })}
                                            </div>
                                            <div className="product-action">
                                                <Link to={`/product/${p.id}`} type="button" className="btn-product btn-cart" title="Add to cart" ><span>ADD TO CART</span></Link>
                                                <a type="button" className="btn-addtolist"  ><span>&nbsp;Add to Wishlist</span></a>
                                            </div>
                                        </div>
                                    </div>
                                    ):"";
                                })}
                </OwlCarousel>
                )}
            </div>

            <div className="choose-style">
                <div className="container row">
                    <div className="banner-intro col-lg-5">
                        <h3 className="title">Get Your<br />Inspiration<br />In The Street.</h3>

                        <p className="darkWhite">IN THIS LOOK</p>
                        <h4 className="content darkWhite">• Stowell Hood Fleece</h4>
                        <h4 className="content darkWhite">• Force Tight </h4>
                        <h4 className="content darkWhite">• Blitzing 3.0 Cap</h4>
                        <p className="price darkWhite">$55.00 - $1,298.00</p>

                        <a href="category.html" className="btn btn-demoprimary">
                            <span>BUY ALL </span>
                            <i className="icon-long-arrow-right"></i>
                        </a>
                    </div>
                    <div className="carousel col-lg-7">
                        <div className="heading">
                            <h2 className="title">Choose Your Style</h2>
                            <p className="content">Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis</p>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <a href="product.html">
                                            <img src="../user/assets/images/demos/demo-21/chooseStyle/product-1.jpg" alt="Product image" className="product-image" />
                                        </a>
                                    </figure>
                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">Tops</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">Stowell Hood Fleece</a></h3>
                                        <div className="product-price">
                                            <span className="cur-price">$55.99</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 80 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( 2 Reviews )</span>
                                        </div>
                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>
                                        <a href="#" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <a href="product.html">
                                            <img src="../user/assets/images/demos/demo-21/chooseStyle/product-2.jpg" alt="Product image" className="product-image" />
                                        </a>

                                        <div className="product-countdown" data-until="+9h" data-format="HMS" data-relative="true" data-labels-short="true"></div>
                                    </figure>

                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">Bags</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">Force Tight</a></h3>
                                        <div className="product-price">
                                            <span className="cur-price">$135.99</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 80 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( 4 Reviews )</span>
                                        </div>

                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>
                                        <a href="#" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-6">
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <a href="product.html">
                                            <img src="../user/assets/images/demos/demo-21/chooseStyle/product-3.jpg" alt="Product image" className="product-image" />
                                        </a>
                                    </figure>
                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">Accessories</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">Blitzing 3.0 Cap</a></h3>
                                        <div className="product-price">
                                            <span className="cur-price">$29.99</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 80 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( 0 Reviews )</span>
                                        </div>
                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>
                                        <a href="#" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container category-banner">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <a href="category.html">
                            <img src="../user/assets/images/demos/demo-21/banner/footware.jpg" />
                        </a>
                        <div className="banner-content">
                            <a href="category.html"><h3 className="category"> FOOTWEAR </h3></a>
                            <a href="category.html" className="action">SHOP NOW</a>
                        </div>

                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <a href="category.html">
                            <img src="../user/assets/images/demos/demo-21/banner/accessories.jpg" />
                        </a>
                        <div className="banner-content">
                            <a href="category.html"><h3 className="category"> ACCESSORIES </h3></a>
                            <a href="category.html" className="action">SHOP NOW</a>
                        </div>

                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6" >
                        <a href="category.html">
                            <img src="../user/assets/images/demos/demo-21/banner/mens.jpg" />
                        </a>
                        <div className="banner-content">
                            <a href="category.html"><h3 className="category"> MEN'S </h3></a>
                            <a href="category.html" className="action">SHOP NOW</a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <a href="category.html">
                            <img src="../user/assets/images/demos/demo-21/banner/womens.jpg" />
                        </a>
                        <div className="banner-content">
                            <a href="category.html"><h3 className="category"> WOMEN'S </h3></a>
                            <a href="category.html" className="action">SHOP NOW</a>
                        </div>

                    </div>
                </div>
            </div>
            <div className="container new-arrivals">
                <hr className="mb-5 mt-8" />
                <div className="heading heading-center mb-3">
                    <h2 className="title">NEW ARRIVALS </h2>

                    <ul className="nav nav-pills justify-content-center" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="arrivals-all-link" data-toggle="tab" href="#arrivals-all-tab" role="tab" aria-controls="arrivals-all-tab" aria-selected="true">All</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="arrivals-women-link" data-toggle="tab" href="#arrivals-women-tab" role="tab" aria-controls="arrivals-women-tab" aria-selected="false">Women</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="arrivals-men-link" data-toggle="tab" href="#arrivals-men-tab" role="tab" aria-controls="arrivals-men-tab" aria-selected="false">Men</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="arrivals-shoes-link" data-toggle="tab" href="#arrivals-shoes-tab" role="tab" aria-controls="arrivals-shoes-tab" aria-selected="false">Shoes</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="arrivals-acc-link" data-toggle="tab" href="#arrivals-acc-tab" role="tab" aria-controls="arrivals-acc-tab" aria-selected="false">Accessories</a>
                        </li>
                    </ul>
                </div>
                <div className="tab-content tab-content-carousel">
                    <div className="tab-pane p-0 fade show active" id="arrivals-all-tab" role="tabpanel" aria-labelledby="arrivals-all-link">
                    <div className="row">
                        {product.length > 0 && product.map((p,i) => {
                                return (
                                    <div className="col-xl-5col col-lg-3 col-md-4 col-6" key={i}>
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <span className="product-label label-sale">Sale</span>
                                        <Link to={`/product/${p.id}`}>
                                            <img src={p.productColors[0].productColorImages[0].url} alt="Product image" className="product-image" style={{ maxWidth:333 +"px",maxHeight:333 +"px"}} />
                                            <img src={p.productColors[0].productColorImages[1].url} alt="Product image" className="product-image-hover" style={{maxWidth:333 +"px",maxHeight:333 +"px"}} />
                                        </Link>
                                    </figure>
                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">{p.categoryDetail.category.name}</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">{p.name}</a></h3>
                                        <div className="product-price">
                                            <span className="new-price">${p.price}</span>
                                            <span className="old-price">Was ${p.price+50}</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 80 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( {5} Reviews )</span>
                                        </div>
                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>
                                        <a type="button" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>
                                    </div>
                                </div>
                            </div>
                                );
                            })
                        }
                        </div>
                    </div>
                    <div className="tab-pane p-0 fade" id="arrivals-women-tab" role="tabpanel" aria-labelledby="arrivals-women-link">
                        <div className="row">
                        {product.length > 0 && product.map((p,i) => {
                                return (
                                <div className="col-xl-5col col-lg-3 col-md-4 col-6" key={i}>
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <span className="product-label label-sale">Sale</span>
                                        <Link to={`/product/${p.id}`}>
                                            <img src={p.productColors[0].productColorImages[0].url} alt="Product image" className="product-image" style={{ maxWidth:333 +"px",maxHeight:333 +"px"}} />
                                            <img src={p.productColors[0].productColorImages[1].url} alt="Product image" className="product-image-hover" style={{maxWidth:333 +"px",maxHeight:333 +"px"}} />
                                        </Link>
                                    </figure>
                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">{p.categoryDetail.category.name}</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">{p.name}</a></h3>
                                        <div className="product-price">
                                            <span className="new-price">${p.price}</span>
                                            <span className="old-price">Was ${p.price+50}</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 80 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( {5} Reviews )</span>
                                        </div>
                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>
                                        <a type="button" className="btn-addtolist"  ><span>&nbsp;Add to Wishlist</span></a>
                                    </div>
                                </div>
                            </div>
                                );
                            })
                        }
                        </div>
                    </div>

                    <div className="tab-pane p-0 fade" id="arrivals-men-tab" role="tabpanel" aria-labelledby="arrivals-men-link">
                        <div className="row">
                            <div className="col-xl-5col col-lg-3 col-md-4 col-6">
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <a href="product.html">
                                            <img src="../user/assets/images/demos/demo-21/newArrivals/product-7.jpg" alt="Product image" className="product-image" />
                                        </a>

                                    </figure>

                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">Jackets & Vests</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">Watertight Jacket</a></h3>
                                        <div className="product-price">
                                            <span className="cur-price">$76.99</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 80 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( 2 Reviews )</span>
                                        </div>

                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>

                                        <a href="#" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane p-0 fade" id="arrivals-shoes-tab" role="tabpanel" aria-labelledby="arrivals-shoes-link">
                        <div className="row">
                            <div className="col-xl-5col col-lg-3 col-md-4 col-6">

                                <div className="product demo21">
                                    <figure className="product-media">
                                        <a href="product.html">
                                            <img src="../user/assets/images/demos/demo-21/newArrivals/product-1.jpg" alt="Product image" className="product-image" />
                                        </a>

                                    </figure>

                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">Shoes</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">UA Spawn Low</a></h3>
                                        <div className="product-price">
                                            <span className="cur-price">$77.99</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 60 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( 2 Reviews )</span>
                                        </div>

                                        <div className="product-nav product-nav-dots">
                                            <a href="#" className="active" style={{ background: "#34529d" }}><span className="sr-only">Color name</span></a>
                                            <a href="#" style={{ background: "#333333" }}><span className="sr-only">Color name</span></a>
                                        </div>

                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>

                                        <a href="#" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5col col-lg-3 col-md-4 col-6">
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <a href="product.html">
                                            <img src="../user/assets/images/demos/demo-21/newArrivals/product-4.jpg" alt="Product image" className="product-image" />
                                        </a>

                                    </figure>

                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">Shoes</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">Ignite Limitless Leather</a></h3>
                                        <div className="product-price">
                                            <span className="cur-price">$52.66</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 100 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( 2 Reviews )</span>
                                        </div>

                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>

                                        <a href="#" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5col col-lg-3 col-md-4 col-6">
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <span className="product-label label-sale">Sale</span>
                                        <a href="product.html">
                                            <img src="../user/assets/images/demos/demo-21/newArrivals/product-8.jpg" alt="Product image" className="product-image" />
                                        </a>

                                    </figure>

                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">Shoes</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">Y-3 by Yohji Yamamoto</a></h3>
                                        <div className="product-price">
                                            <span className="new-price">$239.99</span>
                                            <span className="old-price">Was $400.00</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 100 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( 2 Reviews )</span>
                                        </div>

                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>

                                        <a href="#" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5col col-lg-3 col-md-4 col-6">
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <a href="product.html">
                                            <img src="../user/assets/images/demos/demo-21/newArrivals/product-10.jpg" alt="Product image" className="product-image" />
                                        </a>

                                    </figure>

                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">Shoes</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">On Cloudflyer</a></h3>
                                        <div className="product-price">
                                            <span className="cur-price">$127.99</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 100 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( 2 Reviews )</span>
                                        </div>

                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>

                                        <a href="#" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane p-0 fade" id="arrivals-acc-tab" role="tabpanel" aria-labelledby="arrivals-acc-link">
                        <div className="row">
                            <div className="col-xl-5col col-lg-3 col-md-4 col-6">
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <span className="product-label label-sale">Sale</span>
                                        <a href="product.html">
                                            <img src="../user/assets/images/demos/demo-21/newArrivals/product-3.jpg" alt="Product image" className="product-image" />
                                        </a>

                                    </figure>

                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">Bags</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">Osprey Talia</a></h3>
                                        <div className="product-price">
                                            <span className="new-price">$67.50</span>
                                            <span className="old-price">Was $150.00</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 80 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( 2 Reviews )</span>
                                        </div>

                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>

                                        <a href="#" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5col col-lg-3 col-md-4 col-6">
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <a href="product.html">
                                            <img src="../user/assets/images/demos/demo-21/newArrivals/product-5.jpg" alt="Product image" className="product-image" />
                                        </a>

                                    </figure>

                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">Accessories</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">Small Sleeping Bag</a></h3>
                                        <div className="product-price">
                                            <span className="cur-price">$299.99</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 80 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( 2 Reviews )</span>
                                        </div>

                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>

                                        <a href="#" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>

                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5col col-lg-3 col-md-4 col-6">
                                <div className="product demo21">
                                    <figure className="product-media">
                                        <a href="product.html">
                                            <img src="../user/assets/images/demos/demo-21/newArrivals/product-9.jpg" alt="Product image" className="product-image" />
                                        </a>

                                    </figure>

                                    <div className="product-body text-center">
                                        <div className="product-cat">
                                            <a href="#">Bags</a>
                                        </div>
                                        <h3 className="product-title"><a href="product.html">Marmot Empire Daypack</a></h3>
                                        <div className="product-price">
                                            <span className="cur-price">$59.99</span>
                                        </div>
                                        <div className="ratings-container">
                                            <div className="ratings">
                                                <div className="ratings-val" style={{ width: 80 + "%" }}></div>
                                            </div>
                                            <span className="ratings-text">( 2 Reviews )</span>
                                        </div>

                                        <div className="product-action">
                                            <a href="#" className="btn-product btn-cart" title="Add to cart"><span>ADD TO CART</span></a>
                                        </div>

                                        <a href="#" className="btn-addtolist"><span>&nbsp;Add to Wishlist</span></a>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <a href="category.html" className="btn btn-viewMore">
                        <span>VIEW MORE PRODUCTS</span>
                        <i className="icon-long-arrow-right"></i>
                    </a>
                </div>
            </div>

            <div className="container newsletter">
                <div className="background" style={{ backgroundImage: "url(../user/assets/images/demos/demo-21/newsLetter/banner.jpg)" }}>
                    <div className="subscribe">
                        <div className="subscribe-title text-center">
                            <h1 className="intro-title2nd">SUBSCRIBE FOR OUR NEWSLETTER</h1>
                            <h1 className="intro-title1st">Learn about new offers and get more deals by joining our newsletter</h1>
                        </div>
                        <form action="#">
                            <div className="input-group">
                                <input type="email" placeholder="Enter your Email Address" aria-label="Email Adress" required="" />
                                <div className="input-group-append">
                                    <button className="btn btn-subscribe" type="submit"><span>Subscribe</span><i className="icon-long-arrow-right"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="container service mt-4">
                <div className="col-sm-6 col-lg-3 col-noPadding">
                    <div className="icon-box icon-box-side">
                        <span className="icon-box-icon text-dark">
                            <i className="icon-truck"></i>
                        </span>

                        <div className="icon-box-content">
                            <h3 className="icon-box-title">Payment &amp; Delivery</h3>
                            <p>Free shipping for orders over $50</p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-lg-3">
                    <div className="icon-box icon-box-side">
                        <span className="icon-box-icon text-dark">
                            <i className="icon-rotate-left"></i>
                        </span>

                        <div className="icon-box-content">
                            <h3 className="icon-box-title">Return &amp; Refund</h3>
                            <p>Free 100% money back guarantee</p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-lg-3">
                    <div className="icon-box icon-box-side">
                        <span className="icon-box-icon text-dark">
                            <i className="icon-life-ring"></i>
                        </span>

                        <div className="icon-box-content">
                            <h3 className="icon-box-title">Quality Support</h3>
                            <p>Alway online feedback 24/7</p>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-lg-3">
                    <div className="icon-box icon-box-side">
                        <span className="icon-box-icon text-dark">
                            <i className="icon-envelope"></i>
                        </span>

                        <div className="icon-box-content">
                            <h3 className="icon-box-title">JOIN OUR NEWSLETTER</h3>
                            <p>10% off by subscribing to our newsletter</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container instagram-store text-center">
                <hr />
                <div className="heading">
                    <h2 className="title">INSTAGRAM STORE</h2>
                </div>
                <div className="row">
                    <div className="col-sm-3 banner-sm-div">
                        <div className="banner-sm col-12 instagram-feed">
                            <img src="../user/assets/images/demos/demo-21/instagramStore/banner-1.jpg" />
                            <div className="instagram-feed-content">
                                <a href="#"><i className="icon-heart-o"></i>280</a>
                                <a href="#"><i className="icon-comments"></i>22</a>
                            </div>
                        </div>
                        <div className="banner-sm col-12 instagram-feed">
                            <img src="../user/assets/images/demos/demo-21/instagramStore/banner-2.jpg" />
                            <div className="instagram-feed-content">
                                <a href="#"><i className="icon-heart-o"></i>280</a>
                                <a href="#"><i className="icon-comments"></i>22</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 banner-lg instagram-feed">
                        <img src="../user/assets/images/demos/demo-21/instagramStore/banner-3.jpg" />
                        <div className="instagram-feed-content">
                            <a href="#"><i className="icon-heart-o"></i>280</a>
                            <a href="#"><i className="icon-comments"></i>22</a>
                        </div>
                    </div>
                    <div className="col-sm-3 banner-sm-div">
                        <div className="banner-sm col-6 instagram-feed">
                            <img src="../user/assets/images/demos/demo-21/instagramStore/banner-4.jpg" />
                            <div className="instagram-feed-content">
                                <a href="#"><i className="icon-heart-o"></i>280</a>
                                <a href="#"><i className="icon-comments"></i>22</a>
                            </div>
                        </div>
                        <div className="banner-sm col-6 instagram-feed">
                            <img src="../user/assets/images/demos/demo-21/instagramStore/banner-6.jpg" />
                            <div className="instagram-feed-content">
                                <a href="#"><i className="icon-heart-o"></i>280</a>
                                <a href="#"><i className="icon-comments"></i>22</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3 banner-sm-div">
                        <div className="banner-sm col-6 instagram-feed">
                            <img src="../user/assets/images/demos/demo-21/instagramStore/banner-5.jpg" />
                            <div className="instagram-feed-content">
                                <a href="#"><i className="icon-heart-o"></i>280</a>
                                <a href="#"><i className="icon-comments"></i>22</a>
                            </div>
                        </div>
                        <div className="banner-sm col-6 instagram-feed">
                            <img src="../user/assets/images/demos/demo-21/instagramStore/banner-7.jpg" />
                            <div className="instagram-feed-content">
                                <a href="#"><i className="icon-heart-o"></i>280</a>
                                <a href="#"><i className="icon-comments"></i>22</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
}
export default HomeU;