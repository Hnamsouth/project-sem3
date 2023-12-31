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

export const Uregister = async (data,withGG)=>{
    const url = "auth/register";
    const url2 ="auth/register-gg";
    try {
        let rs = await api.post(withGG?url2:url,data);
        return rs.data;
    } catch (error) {
        return {};
    }
}

export const UVerifyEmail = async (data)=>{
    const url = `auth/verify-email?email=${data.email}&token=${data.token}`;
    try {
        let rs = await api.post(url);
        return rs.data==true;
    } catch (error) {
        return false;
    }
}



export const CheckEmail = async (email) =>{
    const url="auth/check-register?email="+email;
    try {
        let rs = await api.post(url);
        return rs.data;
    } catch (error) {
        return false;
    }
}

export const CheckToken = async () =>{
    const url = "auth/check-token";
    const token =localStorage.getItem("token");
    if(token=="") return false;
    api.defaults.headers.common["Authorization"]=`Bearer ${token}`;
    try {
        let rs = await api.post(url);
        if(!rs.data.checkToken){
            localStorage.removeItem('token')
            api.defaults.headers.common["Authorization"]="";
        }
        return rs.data.checkToken
    } catch (error) {
        return false;
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




