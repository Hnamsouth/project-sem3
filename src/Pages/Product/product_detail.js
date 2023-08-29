import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProduct } from "../../Service/product.service";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { addProductInFavorite, deleteFavorite } from "../../Service/favorite.service";
import { getAllProductInFavorite } from "../../Conponents/getAllProduct";
import { FavouriteContext } from "../../Conponents/User/UserLayout";

const Product = () =>{
    const {id} = useParams("id");
    const [product,setProduct]=useState();
    const [productColor,setProductColor] = useState();
    const [productSize,setProductSize] = useState();
    const [favorite, setFavorite] = useContext(FavouriteContext);


    
   const getAllProduct = async()=>{
    const p = await getProduct(id);
    console.log(p.productColors);
    setProduct(p);
   }
    useEffect(() => {
        getAllProduct();
        getAllProductInFavorite(setFavorite);

    }, []);

    useEffect(() => {
      console.log(productColor)
    }, [productColor]);
    const addProductFavorite = async (productId) => {
        if (favorite.length === 0) {
            const add = await addProductInFavorite(productId);
            setFavorite(add)

       } else {
            const findProduct = favorite.find(p => p.product.id === productId)
            if (findProduct) {
                await deleteFavorite(findProduct.id);
                getAllProductInFavorite(setFavorite);
            } else {
                const add = await addProductInFavorite(productId)
                setFavorite(add);
            }
        }
    }
    const addProductCart= ()=>{

    }
    return(
        <main class="main">
        <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
            <div class="container d-flex align-items-center">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li class="breadcrumb-item"><a href="#">Products</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Default</li>
                </ol>

                <nav class="product-pager ml-auto" aria-label="Product">
                    <a class="product-pager-link product-pager-prev" href="#" aria-label="Previous" tabindex="-1">
                        <i class="icon-angle-left"></i>
                        <span>Prev</span>
                    </a>

                    <a class="product-pager-link product-pager-next" href="#" aria-label="Next" tabindex="-1">
                        <span>Next</span>
                        <i class="icon-angle-right"></i>
                    </a>
                </nav>
            </div>
        </nav>
        <div class="page-content">
            <div class="container">
                <div class="product-details-top">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="product-gallery product-gallery-vertical">
                                <div class="row">
                                    
                                    <figure class="product-main-image">
                                        <img id="product-zoom" src={product && product.productColors[0].productColorImages[0].url} data-zoom-image="assets/images/products/single/1-big.jpg" alt="product image"style={{height:"489px"}}/>

                                        <a href="#" id="btn-product-gallery" class="btn-product-gallery">
                                            <i class="icon-arrows"></i>
                                        </a>
                                    </figure>
                                    <div  id="product-zoom-gallery" class="product-image-gallery" >
                                    {product && product.productColors.map((p)=>{
                                        return(
                                            <button style={{border:"none",marginBottom: "1rem"}}>
                                                <img src={p.productColorImages[0].url} alt="product side" style={{height : "100%"}}/>
                                            </button>
                                        )
                                    })} 
                                    </div>
                                </div>
                        
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="product-details">
                                <div style={{marginBottom: "1.3rem"}}>
                                    <h1 class="product-title"style={{marginBottom :"0px",marginTop: "0px"}}>{product&&product.name}</h1>

                                </div>
                                <div class="ratings-container"style={{justifyContent:"start"}}>
                                    <div class="ratings">
                                        <div class="ratings-val" style={{width: "80%",justifyContent:"start" }}></div>
                                    </div>
                                    <a class="ratings-text" href="#product-review-link" id="review-link">( 2 Reviews )</a>
                                </div>

                                <div class="product-price"style={{justifyContent:"start",color:"#c96"}}>
                                    ${product&&product.price}
                                </div>

                                <div class="product-content">
                                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus. </p>
                                </div>

                                <div class="details-filter-row details-row-size">
                                    <label>Color:</label>
                                    <div class="product-nav product-nav-thumbs"style={{justifyContent:"start" }}>
                                    {product && product.productColors.map((p,i)=>{
                                        return(

                                            <button onClick={()=>setProductColor(p)}style={{width: "10%", border: "none",padding: "5px", margin: "5px"}}>
                                                 <img src={p.productColorImages[0].url} alt="product desc"/>
                                            </button>
                                        )
                                    })}
                                    </div>
                                </div>

                                <div class="details-filter-row details-row-size">
                                    <label for="size">Size:</label>
                                    <div class="select-custom">
                                        <select name="size" id="size" class="form-control">
                                        {productColor && productColor.productSizes.map((p,i)=>{
                                                return(
                                                    <option value="#"></option>
                                                )
                                                })}
                                        </select>
                                    </div>

                                    <a href="#" class="size-guide"><i class="icon-th-list"></i>size guide</a>
                                </div>

                                <div class="details-filter-row details-row-size">
                                    <label for="qty">Qty:</label>
                                    <div class="product-details-quantity">
                                        <input type="number" id="qty" class="form-control" value="1" min="1" max="10" step="1" data-decimals="0" required/>
                                    </div>
                                </div>

                                <div class="product-details-action">
                                    <button onClick={() => addProductCart()} class="btn-product btn-cart"><span>add to cart</span></button>
                                    <button onClick={() => addProductFavorite(product.id)} class="btn-product btn-wishlist" title="Wishlist"><span>Add to Wishlist</span></button>
                                    <button  class="btn-product btn-compare" title="Compare"><span>Add to Compare</span></button>
                                </div>

                                <div class="product-details-footer">
                                    <div class="product-cat">
                                        <span>Category:</span>
                                        <a href="#">Women</a>,
                                        <a href="#">Dresses</a>,
                                        <a href="#">Yellow</a>
                                    </div>

                                    <div class="social-icons social-icons-sm">
                                        <span class="social-label">Share:</span>
                                        <a href="#" class="social-icon" title="Facebook" target="_blank"><i class="icon-facebook-f"></i></a>
                                        <a href="#" class="social-icon" title="Twitter" target="_blank"><i class="icon-twitter"></i></a>
                                        <a href="#" class="social-icon" title="Instagram" target="_blank"><i class="icon-instagram"></i></a>
                                        <a href="#" class="social-icon" title="Pinterest" target="_blank"><i class="icon-pinterest"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="product-details-tab">
                    <ul class="nav nav-pills justify-content-center" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="product-desc-link" data-toggle="tab" href="#product-desc-tab" role="tab" aria-controls="product-desc-tab" aria-selected="true">Description</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="product-info-link" data-toggle="tab" href="#product-info-tab" role="tab" aria-controls="product-info-tab" aria-selected="false">Additional information</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="product-shipping-link" data-toggle="tab" href="#product-shipping-tab" role="tab" aria-controls="product-shipping-tab" aria-selected="false">Shipping & Returns</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="product-review-link" data-toggle="tab" href="#product-review-tab" role="tab" aria-controls="product-review-tab" aria-selected="false">Reviews (2)</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="product-desc-tab" role="tabpanel" aria-labelledby="product-desc-link">
                            <div class="product-desc-content">
                                <h3>Product Information</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. </p>
                                <ul>
                                    <li>Nunc nec porttitor turpis. In eu risus enim. In vitae mollis elit. </li>
                                    <li>Vivamus finibus vel mauris ut vehicula.</li>
                                    <li>Nullam a magna porttitor, dictum risus nec, faucibus sapien.</li>
                                </ul>

                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. </p>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="product-info-tab" role="tabpanel" aria-labelledby="product-info-link">
                            <div class="product-desc-content">
                                <h3>Information</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. </p>

                                <h3>Fabric & care</h3>
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
                            </div>
                        </div>
                        <div class="tab-pane fade" id="product-shipping-tab" role="tabpanel" aria-labelledby="product-shipping-link">
                            <div class="product-desc-content">
                                <h3>Delivery & returns</h3>
                                <p>We deliver to over 100 countries around the world. For full details of the delivery options we offer, please view our <a href="#">Delivery information</a><br/>
                                We hope you’ll love every purchase, but if you ever need to return an item you can do so within a month of receipt. For full details of how to make a return, please view our <a href="#">Returns information</a></p>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="product-review-tab" role="tabpanel" aria-labelledby="product-review-link">
                            <div class="reviews">
                                <h3>Reviews (2)</h3>
                                <div class="review">
                                    <div class="row no-gutters">
                                        <div class="col-auto">
                                            <h4><a href="#">Samanta J.</a></h4>
                                            <div class="ratings-container">
                                                <div class="ratings">
                                                    <div class="ratings-val" style={{width: "80%"}}></div>
                                                </div>
                                            </div>
                                            <span class="review-date">6 days ago</span>
                                        </div>
                                        <div class="col">
                                            <h4>Good, perfect size</h4>

                                            <div class="review-content">
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus cum dolores assumenda asperiores facilis porro reprehenderit animi culpa atque blanditiis commodi perspiciatis doloremque, possimus, explicabo, autem fugit beatae quae voluptas!</p>
                                            </div>

                                            <div class="review-action">
                                                <a href="#"><i class="icon-thumbs-up"></i>Helpful (2)</a>
                                                <a href="#"><i class="icon-thumbs-down"></i>Unhelpful (0)</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="review">
                                    <div class="row no-gutters">
                                        <div class="col-auto">
                                            <h4><a href="#">John Doe</a></h4>
                                            <div class="ratings-container">
                                                <div class="ratings">
                                                    <div class="ratings-val"  style={{width: "100%"}}></div>
                                                </div>
                                            </div>
                                            <span class="review-date">5 days ago</span>
                                        </div>
                                        <div class="col">
                                            <h4>Very good</h4>

                                            <div class="review-content">
                                                <p>Sed, molestias, tempore? Ex dolor esse iure hic veniam laborum blanditiis laudantium iste amet. Cum non voluptate eos enim, ab cumque nam, modi, quas iure illum repellendus, blanditiis perspiciatis beatae!</p>
                                            </div>

                                            <div class="review-action">
                                                <a href="#"><i class="icon-thumbs-up"></i>Helpful (0)</a>
                                                <a href="#"><i class="icon-thumbs-down"></i>Unhelpful (0)</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 class="title text-center mb-4">You May Also Like</h2>

                <div class="owl-carousel owl-simple carousel-equal-height carousel-with-shadow" data-toggle="owl" 
                    data-owl-options='{
                        "nav": false, 
                        "dots": true,
                        "margin": 20,
                        "loop": false,
                        "responsive": {
                            "0": {
                                "items":1
                            },
                            "480": {
                                "items":2
                            },
                            "768": {
                                "items":3
                            },
                            "992": {
                                "items":4
                            },
                            "1200": {
                                "items":4,
                                "nav": true,
                                "dots": false
                            }
                        }
                    }'>
                    <div class="product product-7 text-center">
                        <figure class="product-media">
                            <span class="product-label label-new">New</span>
                            <a href="product.html">
                                <img src="assets/images/products/product-4.jpg" alt="Product image" class="product-image"/>
                            </a>

                            <div class="product-action-vertical">
                                <a href="#" class="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                <a href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                <a href="#" class="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                            </div>

                            <div class="product-action">
                                <a href="#" class="btn-product btn-cart"><span>add to cart</span></a>
                            </div>
                        </figure>

                        <div class="product-body">
                            <div class="product-cat">
                                <a href="#">Women</a>
                            </div>
                            <h3 class="product-title"><a href="product.html">Brown paperbag waist <br/>pencil skirt</a></h3>
                            <div class="product-price">
                                $60.00
                            </div>
                            <div class="ratings-container">
                                <div class="ratings">
                                    <div class="ratings-val"  style={{width: "20%"}}></div>
                                </div>
                                <span class="ratings-text">( 2 Reviews )</span>
                            </div>

                            <div class="product-nav product-nav-thumbs">
                                <a href="#" class="active">
                                    <img src="assets/images/products/product-4-thumb.jpg" alt="product desc"/>
                                </a>
                                <a href="#">
                                    <img src="assets/images/products/product-4-2-thumb.jpg" alt="product desc"/>
                                </a>

                                <a href="#">
                                    <img src="assets/images/products/product-4-3-thumb.jpg" alt="product desc"/>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="product product-7 text-center">
                        <figure class="product-media">
                            <span class="product-label label-out">Out of Stock</span>
                            <a href="product.html">
                                <img src="assets/images/products/product-6.jpg" alt="Product image" class="product-image"/>
                            </a>

                            <div class="product-action-vertical">
                                <a href="#" class="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                <a href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                <a href="#" class="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                            </div>

                            <div class="product-action">
                                <a href="#" class="btn-product btn-cart"><span>add to cart</span></a>
                            </div>
                        </figure>

                        <div class="product-body">
                            <div class="product-cat">
                                <a href="#">Jackets</a>
                            </div>
                            <h3 class="product-title"><a href="product.html">Khaki utility boiler jumpsuit</a></h3>
                            <div class="product-price">
                                <span class="out-price">$120.00</span>
                            </div>
                            <div class="ratings-container">
                                <div class="ratings">
                                    <div class="ratings-val"  style={{width: "80%"}}></div>
                                </div>
                                <span class="ratings-text">( 6 Reviews )</span>
                            </div>
                        </div>
                    </div>

                    <div class="product product-7 text-center">
                        <figure class="product-media">
                            <span class="product-label label-top">Top</span>
                            <a href="product.html">
                                <img src="assets/images/products/product-11.jpg" alt="Product image" class="product-image"/>
                            </a>

                            <div class="product-action-vertical">
                                <a href="#" class="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                <a href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                <a href="#" class="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                            </div>

                            <div class="product-action">
                                <a href="#" class="btn-product btn-cart"><span>add to cart</span></a>
                            </div>
                        </figure>

                        <div class="product-body">
                            <div class="product-cat">
                                <a href="#">Shoes</a>
                            </div>
                            <h3 class="product-title"><a href="product.html">Light brown studded Wide fit wedges</a></h3>
                            <div class="product-price">
                                $110.00
                            </div>
                            <div class="ratings-container">
                                <div class="ratings">
                                    <div class="ratings-val"  style={{width: "80%"}}></div>
                                </div>
                                <span class="ratings-text">( 1 Reviews )</span>
                            </div>

                            <div class="product-nav product-nav-thumbs">
                                <a href="#" class="active">
                                    <img src="assets/images/products/product-11-thumb.jpg" alt="product desc"/>
                                </a>
                                <a href="#">
                                    <img src="assets/images/products/product-11-2-thumb.jpg" alt="product desc"/>
                                </a>

                                <a href="#">
                                    <img src="assets/images/products/product-11-3-thumb.jpg" alt="product desc"/>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="product product-7 text-center">
                        <figure class="product-media">
                            <a href="product.html">
                                <img src="assets/images/products/product-10.jpg" alt="Product image" class="product-image"/>
                            </a>

                            <div class="product-action-vertical">
                                <a href="#" class="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                <a href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                <a href="#" class="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                            </div>

                            <div class="product-action">
                                <a href="#" class="btn-product btn-cart"><span>add to cart</span></a>
                            </div>
                        </figure>

                        <div class="product-body">
                            <div class="product-cat">
                                <a href="#">Jumpers</a>
                            </div>
                            <h3 class="product-title"><a href="product.html">Yellow button front tea top</a></h3>
                            <div class="product-price">
                                $56.00
                            </div>
                            <div class="ratings-container">
                                <div class="ratings">
                                    <div class="ratings-val"  style={{width: "0%"}}></div>
                                </div>
                                <span class="ratings-text">( 0 Reviews )</span>
                            </div>
                        </div>
                    </div>

                    <div class="product product-7 text-center">
                        <figure class="product-media">
                            <a href="product.html">
                                <img src="assets/images/products/product-7.jpg" alt="Product image" class="product-image"/>
                            </a>

                            <div class="product-action-vertical">
                                <a href="#" class="btn-product-icon btn-wishlist btn-expandable"><span>add to wishlist</span></a>
                                <a href="popup/quickView.html" class="btn-product-icon btn-quickview" title="Quick view"><span>Quick view</span></a>
                                <a href="#" class="btn-product-icon btn-compare" title="Compare"><span>Compare</span></a>
                            </div>

                            <div class="product-action">
                                <a href="#" class="btn-product btn-cart"><span>add to cart</span></a>
                            </div>
                        </figure>

                        <div class="product-body">
                            <div class="product-cat">
                                <a href="#">Jeans</a>
                            </div>
                            <h3 class="product-title"><a href="product.html">Blue utility pinafore denim dress</a></h3>
                            <div class="product-price">
                                $76.00
                            </div>
                            <div class="ratings-container">
                                <div class="ratings">
                                    <div class="ratings-val"  style={{width: "20%"}}></div>
                                </div>
                                <span class="ratings-text">( 2 Reviews )</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}
export default Product;