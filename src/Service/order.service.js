import api from "./api"

const url="order";
export const createOrder = async (data)=>{
    try {
        const rs = await api.post(url,data);
        return rs.data;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const cancelOrder = async (id)=>{
    try{
        const rs = await api.post((url+`/cancel?orderId=${id}`))
        return rs.data;
    }catch(error){
        console.log(error)
        return false;
    }
}

export const PaymentOrder = async (id, orderPaypalId)=>{
    try {
        const rs = await api.put(url+`/payment?id=${id}&OrderIdPaypal=${orderPaypalId}`)
        return rs.data;
    } catch (error) {
        return false;
    }
}

