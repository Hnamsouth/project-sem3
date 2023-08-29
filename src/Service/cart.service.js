import api from "./api";
const URL = "cart";
export const create = async (data)=>{
    try {
        const url=URL;
        const rs = await api.post(url,{BuyQty: data.buyQty,ProductColorId:data.productColorId,ProductId:data.productId,ProductSizeId:data.productSizeId,UserId:data.userId});
        return rs.data;
    } catch (error) {
        return false;
    }
}
export const getProductInCart = async ()=>{

    try {
        const url =`${URL}`;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return error;
    }
}
export const update = async (data)=>{
    try {
        const url=URL;
        const rs= await api.put(url,{ "id": data.id,
        "buyQty": data.buyQty,
        "productColorId": data.productColorId,
        "productId": data.productId,
        "productSizeId": data.productSizeId,
        "userId": data.userId});
        return rs.data;
    } catch (error) {
        return false;
    }
}
export const deleteCart = async (id)=>{
    try {
        const url=URL+`?id=${id}`;
        const rs = await api.delete(url);
        return rs.data;
    } catch (error) {
        return false;
    }
}
