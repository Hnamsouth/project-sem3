const token= localStorage.getItem("token");
export const Iuser = {
    profile:null,cart:[],favorite:[],order:[]
}

const STATE={
    token:token,
    loading:false,
    afterScript:[],
    userStyle:null,
    AuthModal:false,
    AuthForm:true,
    User:Iuser,
    Nav:[]
}




export default STATE;