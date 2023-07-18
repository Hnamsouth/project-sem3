
import React ,{useContext,useEffect}from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import UserContext from '../context/userContext';
const Home = ()=>{
    const {state,dispatch}=useContext(UserContext); 
    const scripts=[
        "assets/js/jquery.magnific-popup.min.js",
        "assets/js/bootstrap-input-spinner.js"
    ]
    useEffect(()=>{
        if (scripts && Array.isArray(scripts)) {
            dispatch({ type: "ADD_SCRIPT", payload: scripts });
          } else {
            console.log("aaaaaaaaaaaaa")
          }
    },[])
    return (
        
            <div>
                <HelmetProvider>
                    <Helmet>
                        <script src="assets/js/demos/demo-21.js"></script>
                    </Helmet>
                </HelmetProvider>
                <div class="intro-slider-container mb-5">
                    <div class="intro-slider owl-carousel owl-theme owl-nav-inside owl-light" data-toggle="owl" 
                        data-owl-options='{
                            "dots": true,
                            "nav": false, 
                            "responsive": {
                                "1200": {
                                    "nav": false,
                                    "dots": false
                                }
                            }
                        }'>
                        <div class="intro-slide" style={{backgroundImage: "url(assets/images/demos/demo-21/slider/slide-1.png)"}}>
                            <div class="container intro-content">
                                <div class="row">
                                    <div class="intro"> 
                                        <div class="title">
                                            <h3>WOMEN'S</h3>
                                        </div>
                                        <div class="content">
                                            <h3>RUNNING &</h3>
                                            <h3>TRAINING SHIRTS</h3>
                                        </div>
                                        <div class="price">
                                            <h3>SAVE UP TO 30%</h3>
                                            </div>
                                        <div class="action">
                                            <a href="category.html" class="btn btn-primary">
                                                <span>DISCOVER NOW</span>
                                            </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="intro-slide" style={{backgroundImage: "url(../../public/assets/images/demos/demo-21/slider/slide-2.png)"}}>
                            <div class="container intro-content">
                                <div class="row">
                                    <div class="intro">
                                        <div class="title">
                                            <h3 class="darkWhite">DEAL OF THE DAY</h3>
                                        </div>
                                        <div class="content">
                                            <h3>IT'S TIME TO UPGRADE<br/>YOUR HIKING KIT</h3>
                                        </div>
                                        <div class="price">
                                            <h3 class="darkWhite">SAVE UP TO 15%</h3>
                                        </div>
                                        <div class="action">
                                            <a href="category.html" class="btn btn-primary">
                                                <span>DISCOVER NOW</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        
                    </div>

                    <span class="slider-loader"></span>
                </div>

                <div class="container banner-container">
                    <div class="col-lg-4 col-md-8 col-sm-10 col-12 col-pd1">
                        <a href="category.html">
                            <img src="assets/images/demos/demo-21/banner/banner-1.jpg"/>
                        </a>
                        <div class="banner-content">
                            <div class="title">
                                <a href="category.html"><h3 class="darkWhite">It's a lifestyle.</h3></a>
                            </div>
                            <div class="content">
                                <a href="category.html"><h3>Running Apparel</h3></a>
                                <a href="category.html"><h3>END OF SEASON SALE</h3></a>
                            </div>
                            <div class="action">
                                <a href="category.html" class="btn btn-demoprimary">
                                    <span>SHOP NOW</span>
                                    <i class="icon-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-8 col-sm-10 col-12 col-pd1">
                        <a href="category.html">
                            <img src="assets/images/demos/demo-21/banner/banner-2.jpg"/>
                        </a>
                        <div class="banner-content">
                            <div class="title">
                                <a href="category.html"><h3 class="darkWhite">Hike Your Next Trail </h3></a>
                            </div>
                            <div class="content">
                                <a href="category.html"><h3>NEW SEASON</h3></a>
                                <a href="category.html"><h3>NEW GEAR</h3></a>
                            </div>
                            <div class="action">
                                <a href="category.html" class="btn btn-demoprimary">
                                    <span>DISCOVER NOW</span>
                                    <i class="icon-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-8 col-sm-10 col-12 col-pd1">
                        <a href="category.html">
                            <img src="assets/images/demos/demo-21/banner/banner-3.jpg"/>
                        </a>
                        <div class="banner-content">
                            <div class="title">
                                <a href="category.html"><h3 class="darkWhite">Summer Sale</h3></a>
                            </div>
                            <div class="content">
                                <a href="category.html"><h3>Swimwear sale</h3></a>
                                <a href="category.html"><h3>Save up to 30%</h3></a>
                            </div>
                            <div class="action">
                                <a href="category.html" class="btn btn-demoprimary">
                                    <span>SHOP NOW</span>
                                    <i class="icon-long-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       
    );
}
export default Home;