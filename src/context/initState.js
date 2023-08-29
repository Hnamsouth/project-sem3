const token= localStorage.getItem("token");
const STATE={
    cart:[],
    favourites:[],
    token:token,
    loading:false,
    afterScript:[],
    userStyle:null,
    AuthModal:false,
    AuthForm:true,
    UserProfile:null
}

export default STATE;