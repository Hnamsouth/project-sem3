import { useState, useContext } from "react";
import { deleteFavorite } from "../../Service/favorite.service";
import { useEffect } from "react";
import { getAllProductInFavorite } from '../../Conponents/getAllProduct'
import { FavouriteContext } from '../../Conponents/User/UserLayout';
import UserContext from "../../context/userContext";
const Favorite = () => {
    const {state,dispatch}=useContext(UserContext);
    const [favorite, setFavorite] = useContext(FavouriteContext);

    useEffect(() => {
        getAllProductInFavorite(setFavorite);
    }, []);

    const deleteProductInFavorite = async (id) => {
        const d = await deleteFavorite(id);
        getAllProductInFavorite(setFavorite);
    }
    return (
        <main class="main">
            <div class="page-header text-center" style={{ backgroundImage: "url(../user/assets/images/page-header-bg.jpg')" }}>
                <div class="container">
                    <h1 class="page-title">Wishlist<span>Shop</span></h1>
                </div>
            </div>
            <nav aria-label="breadcrumb" class="breadcrumb-nav">
                <div class="container">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Shop</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Wishlist</li>
                    </ol>
                </div>
            </nav>

            <div class="page-content">
                <div class="container">
                    <table class="table table-wishlist table-mobile">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Stock Status</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                               favorite && favorite.map((f, i) => {
                                    return (
                                        <tr key={i}>
                                            <td class="product-col">
                                                <div class="product">
                                                    <figure class="product-media">
                                                        <a href="#">
                                                            <img src={f.product.productColors[0].productColorImages[0].url} alt="Product image" />
                                                        </a>
                                                    </figure>

                                                    <h3 class="product-title">
                                                        {f.product.name}
                                                    </h3>
                                                </div>
                                            </td>
                                            <td class="price-col">${f.product.price}</td>
                                            <td class="stock-col"><span class="in-stock">{f.product.status}</span></td>
                                            <td class="action-col">
                                                <button class="btn btn-block btn-outline-primary-2"><i class="icon-cart-plus"></i>Add to Cart</button>
                                            </td>
                                            <td class="remove-col"><button class="btn-remove" onClick={() => deleteProductInFavorite(f.id)}><i class="icon-close"></i></button></td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    <div class="wishlist-share">
                        <div class="social-icons social-icons-sm mb-2">
                            <label class="social-label">Share on:</label>
                            <a href="#" class="social-icon" title="Facebook" target="_blank"><i class="icon-facebook-f"></i></a>
                            <a href="#" class="social-icon" title="Twitter" target="_blank"><i class="icon-twitter"></i></a>
                            <a href="#" class="social-icon" title="Instagram" target="_blank"><i class="icon-instagram"></i></a>
                            <a href="#" class="social-icon" title="Youtube" target="_blank"><i class="icon-youtube"></i></a>
                            <a href="#" class="social-icon" title="Pinterest" target="_blank"><i class="icon-pinterest"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Favorite;