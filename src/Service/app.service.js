import api from "./api"

export const getNavData = async ()=>{
    try {
        let url ="product/nav-data";
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return {};
    }
}

export const Subtotal = (cart,callback)=>{
    let total =0;
    cart.forEach(e=>total+=e.productSize.productColor.product.price*e.buyQty)
    callback(total)
}