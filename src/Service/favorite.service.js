import api from "./api";
const URL = "favorite";

export const getProductInFavorite = async () => {

    try {
        const url = `${URL}`;
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return error;
    }
}
export const deleteFavorite = async (id) => {
    try {
        const url = URL + `?id=${id}`;
        const rs = await api.delete(url);
        return rs.data;
    } catch (error) {
        return false;
    }
}
export const addProductInFavorite = async (id) => {
    try {
        const url = URL+("?productId="+id);
        const rs = await api.post(url);
        return rs.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}