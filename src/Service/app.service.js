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