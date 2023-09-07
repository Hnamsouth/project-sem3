import api from "./api";
const URL = "product";

export const getProduct = async (id)=>{

    try {
        const url =id==null?URL:URL+`?id=${id}`;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return false;
    }
}

export const searchProduct = async (text)=>{
    try {
        const rs = await api.get((URL+`/search?search=${text}`));
        return rs.data;
    } catch (error) {
        return false
    }
}

export const getC_CDT = async ()=>{
    try {
        const rs = await api.get(`sort/bar-data`);
        return rs.data;
    } catch (error) {
        return null;
    }
}

export const getSortBy = async (key)=>{
    try {
        const rs = await api.get(`sort/sort-by?key=${key}`);
        return rs.data;
    } catch (error) {
        return null;
    }
}
export const getSortCustom = async (data)=>{
    try {
        const rs = await api.post("sort/custom",data);
        return rs.data;
    } catch (error) {
        return null;
    }
}