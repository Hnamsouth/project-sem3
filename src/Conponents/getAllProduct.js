import { getProductInCart } from '../Service/cart.service';
import { getProductInFavorite } from '../Service/favorite.service';


export const getAllProductInCart = async (callback) => {
    const c = await getProductInCart();
    callback(c);
}
export const getAllProductInFavorite = async (callback) => {
    const f = await getProductInFavorite();
    callback(f);
}

