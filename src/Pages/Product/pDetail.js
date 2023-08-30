import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProduct } from "../../Service/product.service";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AddCart } from "../../Service/cart.service";
import { useNavigate } from 'react-router-dom';
import UserContext from "../../context/userContext";
import ImageZoom from "react-image-zooom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetail= ()=>{
    const {id} = useParams("id");
    let navigate = useNavigate();
    const {state,dispatch}=useContext(UserContext);
    const [data,setData]=useState({products:[],product:null,pColor:null,imgZoom:null,pSize:[],pQty:0,qtySelect:1,sizeSelected:0});
    const [errMess,setErrMess]=useState({size:false,Pqty:false});

    const getData = async()=>{
        const p = await getProduct(id);
        const ps = await getProduct();
        setData({
            products:ps,
            product:p,pColor:p.productColors[0],
            imgZoom:p.productColors[0].productColorImages[0],
            pSize:p.productColors[0].productSizes,
            pQty:0,
            qtySelect:1,
            sizeSelected:0
        });
    }
    const handleSize = (e)=>{
        if(!isNaN(e)){
            data['sizeSelected']=e;
            data['pQty']=data['pSize'].find(a=>a.id==e).qty;
            data['qtySelect']=data['pQty']==0?0:data['qtySelect'];
            setErrMess((prev) => ({prev,Pqty:data['pQty']<10}))
        }else{
            data['sizeSelected']=null;
            data['pQty']=0;
            data['qtySelect']=0;
        }
    }
    const notify = ()=>toast('🦄 This already in your shopping cart !', {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const AddToCart=async ()=>{
        if( data['sizeSelected']==0) {
            errMess.size=data['qtySelect']==0;
            setErrMess(errMess);
        }else{
            let rs = await AddCart({productSizeId:data['sizeSelected'],buyQty:data['qtySelect']});
            if(!rs){
                navigate("/login")
            }else if(rs.existed){
                notify();
            }else{
                state.User.cart.push(rs)
                dispatch({type:"SET_USER",payload:state.User})
            }
        }
    }


    const useScript = useUrl=> {
        const script = document.createElement('script');
        script.src = useUrl;
        script.async = true;
        document.body.appendChild(script);
        return ()=>{
            document.body.removeChild(script);
        }
    };
    const RunScript = () => {
        useScript("../user/assets/js/main.js");
    }   

    useEffect(()=>{
        getData();
        // RunScript()
    },[])
    useEffect(()=>{
        getData()
    },[id])
    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            <Helmet>
                <link rel="stylesheet" href="..user/assets/css/plugins/nouislider/nouislider.css"/>
            </Helmet>
            <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
                <div className="container d-flex align-items-center">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Products</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Default</li>
                </ol>
                <nav className="product-pager ml-auto" aria-label="Product">
                    <a className="product-pager-link product-pager-prev" href="#" aria-label="Previous" tabIndex={-1}>
                    <i className="icon-angle-left" />
                    <span>Prev</span>
                    </a>
                    <a className="product-pager-link product-pager-next" href="#" aria-label="Next" tabIndex={-1}>
                    <span>Next</span>
                    <i className="icon-angle-right" />
                    </a>
                </nav>{/* End .pager-nav */}
                </div>{/* End .container */}
            </nav>

            <div className="page-content">
                <div className="container">
                <div className="product-details-top">
                    <div className="row">
                    <div className="col-md-6">
                        <div className="product-gallery product-gallery-vertical">
                        <div className="row">
                                <figure className="product-main-image">
                                    {data['imgZoom'] && (
                                        <ImageZoom   src={data['imgZoom'].url} alt="A image to apply the ImageZoom plugin" zoom="200" />
                                    )}
                                        <a href="#" id="btn-product-gallery" className="btn-product-gallery">
                                            <i className="icon-arrows" />
                                        </a>
                                    </figure>
                            <div id="product-zoom-gallery" className="product-image-gallery">
                            {
                                data['pColor'] && data['pColor'].productColorImages.map((e,i)=>{
                                    return i<4? (
                                        <a className={"product-gallery-item "+(data['imgZoom'].id==e.id?"active":"")} onClick={()=>{data['imgZoom']=e}} href="#" data-image={e.url} data-zoom-image={e.url} >
                                            <img src={e.url} alt="product side" />
                                        </a>
                                    ):"";
                                })
                            }
                            </div>{/* End .product-image-gallery */}
                        </div>{/* End .row */}
                        </div>{/* End .product-gallery */}
                    </div>{/* End .col-md-6 */}
                    <div className="col-md-6">
                        <div className="product-details">
                        <h1 className="product-title">Dark yellow lace cut out swing dress</h1>
                        <div className="ratings-container">
                            <div className="ratings">
                            <div className="ratings-val" style={{width: '80%'}} />
                            </div>
                            <a className="ratings-text" href="#product-review-link" id="review-link">( 2 Reviews )</a>
                        </div>
                        <div className="product-price">
                            ${data['product'] && (data['product'].price)}
                        </div>
                        <div className="product-content mb-3">
                            <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus. </p>
                        </div>{/* End .product-content */}
                        <div className="details-filter-row details-row-size  mb-3">
                            <label>Color:</label>
                            <div className="product-nav product-nav-thumbs">
                            {
                                data['product'] && data['product'].productColors.map((e,i)=>{
                                    return (
                                        <a href="#" className={e.id==data['pColor'].id?"active":""} 
                                        onClick={()=>{
                                            data['pColor']=e;
                                            data['imgZoom']=e.productColorImages[0];
                                            data['pSize']=e.productSizes
                                        }}>
                                            <img src={e.productColorImages[0].url} alt="product desc" />
                                        </a>
                                    );
                                })
                            }
                            </div>{/* End .product-nav */}
                        </div>{/* End .details-filter-row */}
                        <div className="details-filter-row details-row-size mb-3">
                            <label htmlFor="size">Size:</label>
                            <div className="select-custom">
                            <select name="size" id="size" className="form-control" onChange={(e)=>handleSize(parseInt(e.target.value))}>
                                <option value="#" selected="selected">Select a size</option>
                                {
                                    data['pSize'] && data['pSize'].map((e,i)=>{
                                        return (
                                            <option value={e.id}>{e.size.name}</option>
                                        );
                                    })    
                                }
                            </select>
                            </div>{/* End .select-custom */}
                            <a href="#" className="size-guide mr-4"><i className="icon-th-list" />size guide</a>
                            {errMess['size']?(
                                <span className="text-danger">Select size please...!</span>
                            ):""}
                        </div>{/* End .details-filter-row */}
                        {errMess['Pqty']?(
                                <span className="text-danger ml-1"><strong>Only {data['pQty']} left in stock</strong></span>
                            ):""}
                        
                        {/* <div className="details-filter-row details-row-size">
                            <label htmlFor="qty">Qty:</label>
                            <div className="product-details-quantity mr-5">
                            <input type="number" id="qty" className="form-control" 
                                onChange={e=>handleQty(parseInt(e.target.value))} 
                                defaultValue={1} min={1} 
                                max={data['pQty']} 
                                step={1} data-decimals={0} required />
                            </div>
                            {errMess['size']?(
                                <span className="text-danger mr-5">Low quantity</span>
                            ):""}
                            {errMess['size']?(
                                <span className="text-danger mr-5">Select size please...!</span>
                            ):""}
                            
                        </div> */}
                        <div className="product-details-action  mb-3">
                            <a type="button" className="btn-product btn-cart" onClick={()=>AddToCart()} ><span>add to cart</span></a>

                            <div className="details-action-wrapper">
                            <a href="#" className="btn-product btn-wishlist" title="Wishlist"><span>Add to Wishlist</span></a>
                            <a href="#" className="btn-product btn-compare" title="Compare"><span>Add to Compare</span></a>
                            </div>{/* End .details-action-wrapper */}
                        </div>{/* End .product-details-action */}
                        <div className="product-details-footer  mb-3">
                            <div className="product-cat">
                            <span>Category:</span>
                            <a href="#">Women</a>,
                            <a href="#">Dresses</a>,
                            <a href="#">Yellow</a>
                            </div>
                            <div className="social-icons social-icons-sm">
                            <span className="social-label">Share:</span>
                            <a href="#" className="social-icon" title="Facebook" target="_blank"><i className="icon-facebook-f" /></a>
                            <a href="#" className="social-icon" title="Twitter" target="_blank"><i className="icon-twitter" /></a>
                            <a href="#" className="social-icon" title="Instagram" target="_blank"><i className="icon-instagram" /></a>
                            <a href="#" className="social-icon" title="Pinterest" target="_blank"><i className="icon-pinterest" /></a>
                            </div>
                        </div>{/* End .product-details-footer */}
                        </div>{/* End .product-details */}
                    </div>{/* End .col-md-6 */}
                    </div>{/* End .row */}
                </div>{/* End .product-details-top */}

                <div className="product-details-tab">
                    <ul className="nav nav-pills justify-content-center" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="product-desc-link" data-toggle="tab" href="#product-desc-tab" role="tab" aria-controls="product-desc-tab" aria-selected="true">Description</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="product-info-link" data-toggle="tab" href="#product-info-tab" role="tab" aria-controls="product-info-tab" aria-selected="false">Additional information</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="product-shipping-link" data-toggle="tab" href="#product-shipping-tab" role="tab" aria-controls="product-shipping-tab" aria-selected="false">Shipping &amp; Returns</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="product-review-link" data-toggle="tab" href="#product-review-tab" role="tab" aria-controls="product-review-tab" aria-selected="false">Reviews (2)</a>
                    </li>
                    </ul>
                    <div className="tab-content">
                    <div className="tab-pane fade show active" id="product-desc-tab" role="tabpanel" aria-labelledby="product-desc-link">
                        <div className="product-desc-content">
                        <h3>Product Information</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. </p>
                        <ul>
                            <li>Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit. </li>
                            <li>Vivamus finibus vel mauris ut vehicula.</li>
                            <li>Nullam a magna porttitor, dictum risus nec, faucibus sapien.</li>
                        </ul>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. </p>
                        </div>{/* End .product-desc-content */}
                    </div>{/* .End .tab-pane */}
                    <div className="tab-pane fade" id="product-info-tab" role="tabpanel" aria-labelledby="product-info-link">
                        <div className="product-desc-content">
                        <h3>Information</h3>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. </p>
                        <h3>Fabric &amp; care</h3>
                        <ul>
                            <li>Faux suede fabric</li>
                            <li>Gold tone metal hoop handles.</li>
                            <li>RI branding</li>
                            <li>Snake print trim interior </li>
                            <li>Adjustable cross body strap</li>
                            <li> Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop: 61cm</li>
                        </ul>
                        <h3>Size</h3>
                        <p>one size</p>
                        </div>{/* End .product-desc-content */}
                    </div>{/* .End .tab-pane */}
                    <div className="tab-pane fade" id="product-shipping-tab" role="tabpanel" aria-labelledby="product-shipping-link">
                        <div className="product-desc-content">
                        <h3>Delivery &amp; returns</h3>
                        <p>We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our <a href="#">Delivery information</a><br />
                            We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our <a href="#">Returns information</a></p>
                        </div>{/* End .product-desc-content */}
                    </div>{/* .End .tab-pane */}
                    <div className="tab-pane fade" id="product-review-tab" role="tabpanel" aria-labelledby="product-review-link">
                        <div className="reviews">
                        <h3>Reviews (2)</h3>
                        <div className="review">
                            <div className="row no-gutters">
                            <div className="col-auto">
                                <h4><a href="#">Samanta J.</a></h4>
                                <div className="ratings-container">
                                <div className="ratings">
                                    <div className="ratings-val" style={{width: '80%'}} />
                                </div>
                                </div>
                                <span className="review-date">6 days ago</span>
                            </div>{/* End .col */}
                            <div className="col">
                                <h4>Good, perfect size</h4>
                                <div className="review-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!</p>
                                </div>{/* End .review-content */}
                                <div className="review-action">
                                <a href="#"><i className="icon-thumbs-up" />Helpful (2)</a>
                                <a href="#"><i className="icon-thumbs-down" />Unhelpful (0)</a>
                                </div>{/* End .review-action */}
                            </div>{/* End .col-auto */}
                            </div>{/* End .row */}
                        </div>{/* End .review */}
                        <div className="review">
                            <div className="row no-gutters">
                            <div className="col-auto">
                                <h4><a href="#">John Doe</a></h4>
                                <div className="ratings-container">
                                <div className="ratings">
                                    <div className="ratings-val" style={{width: '100%'}} />
                                </div>
                                </div>
                                <span className="review-date">5 days ago</span>
                            </div>{/* End .col */}
                            <div className="col">
                                <h4>Very good</h4>
                                <div className="review-content">
                                <p>Sed, molestias, tempore? Ex dolor esse iure hic veniam laborum blanditiis laudantium iste amet. Cum non voluptate eos enim, ab cumque nam, modi, quas iure illum repellendus, blanditiis perspiciatis beatae!</p>
                                </div>{/* End .review-content */}
                                <div className="review-action">
                                <a href="#"><i className="icon-thumbs-up" />Helpful (0)</a>
                                <a href="#"><i className="icon-thumbs-down" />Unhelpful (0)</a>
                                </div>{/* End .review-action */}
                            </div>{/* End .col-auto */}
                            </div>{/* End .row */}
                        </div>{/* End .review */}
                        </div>{/* End .reviews */}
                    </div>{/* .End .tab-pane */}
                    </div>{/* End .tab-content */}
                </div>{/* End .product-details-tab */}
                
                <h2 className="title text-center mb-4">You May Also Like</h2>{/* End .title text-center */}
                <div class="bestsellers">
                    <div class="row">
                            {data['products'].length>0 && data['products'].map((p,i) => {
                                    return i<5?(
                                        <div class="col-xl-5col col-lg-3 col-md-4 col-6">
                                            <div className="product product-7 text-center">
                                                <figure className="product-media">
                                                    <span className="product-label label-out">Out of Stock</span>
                                                    <Link to={`/product/${p.id}`}>
                                                        <img src={p.productColors[0].productColorImages[0].url} alt="Product image" class="product-image" />
                                                        <img src={p.productColors[0].productColorImages[1].url} alt="Product image" class="product-image-hover" />
                                                    </Link>
                                                    <div className="product-action-vertical">
                                                    <a href="#" className="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                                    <a href="popup/quickView.html" className="btn-product-icon btn-quickview" title="Quick view"><span></span></a>
                                                    {/* <a href="#" className="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a> */}
                                                    </div>
                                                    <div className="product-action">
                                                    <a href="#" className="btn-product btn-cart"><span>add to cart</span></a>
                                                    </div>
                                                </figure>
                                                <div className="product-body">
                                                    <div className="product-cat">
                                                    <a href="#">{p.categoryDetail.category.name}</a>
                                                    </div>
                                                    <h3 className="product-title"><a href="product.html">{p.name}</a></h3>
                                                    <div className="product-price">
                                                    <span className="out-price">${p.price}</span>
                                                    </div>
                                                    <div className="ratings-container">
                                                    <div className="ratings">
                                                        <div className="ratings-val" style={{width: '80%'}} />
                                                    </div>
                                                    <span className="ratings-text">( 6 Reviews )</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ):"";
                                })
                            }
                            </div>
                </div>
                </div>{/* End .container */}
            </div>
        </>

       
    );    
}

export default ProductDetail;