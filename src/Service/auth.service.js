import api from "./api"

export const ULogin = async (data,withGG)=>{
    const url = "auth/login";
    const url2 ="auth/login-gg";
    try {
        let rs = await api.post(withGG?url2:url,data);
        return rs.data;
    } catch (error) {
        return {};
    }
}

export const getProfile = async ()=>{
    try {
        let url ="auth/profile";
        const rs = await api.get(url);
        return rs.data;
    } catch (error) {
        return {};
    }
}


