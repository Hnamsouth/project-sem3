import api from "./api"

const url="order";
export const createOrder = async (data)=>{
    try {
        data['id']=0;
        data['Postcode']= parseInt(data['Postcode'])
        const rs = await api.post(url,data);
        return rs.data;
    } catch (error) {
        return false;
    }
}

