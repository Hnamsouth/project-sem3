import api from "./api";
const URL = "product";

export const getProduct = async (id)=>{

    try {
        const url =id==null ? URL: URL `?id=${id}`;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return error;
    }
}
