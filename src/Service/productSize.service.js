import api from "./api";
const URL = "product-size";

export const getProductInProductSize = async (id)=>{

    try {
        const url =id==null ? URL: URL `?id=${id}`;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return error;
    }
}