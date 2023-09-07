import api from "./api"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export const notify = (mess) => toast(`🦄 ${mess}`, {
    position: "top-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
});