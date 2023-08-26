import './App.css';
import VerifyEmail from './Pages/User/auth/VerifyEmail';
import RegisterLogin from './Pages/User/auth/RegisterLogin';
import api from './Service/api';
import { CheckToken, getProfile } from './Service/auth.service';
import RouteProtected from './Pages/User/auth/Protected';
import UploadWiget from './Pages/UploadWidget';
import React,{ useReducer,useEffect} from 'react';
import { UserProvider } from './context/userContext';
import reducer from './context/reducer';
import STATE from '../src/context/initState';
import Loading from './Conponents/loading';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import UserLayout from './Conponents/User/UserLayout';
import HomeU from './Pages/User/home';
import NotFound from './Pages/NotFound';
import Uprofile from './Pages/User/auth/Profile';
import Cart from './Pages/Cart/cart';
import Favorite from './Pages/Favorite/favorite';
import Checkout from './Pages/Checkout/checkout';
import Product from './Pages/Product/product_detail';
const URL_USER="/user-lord"


const prepareRouter = (path,element,auth,child)=>{
  return {
    path:path,
    element:auth?<RouteProtected child={<UserLayout main={element}/>}/>:<UserLayout main={element}/>,
    loader:auth? async ({})=>{return await CheckToken();}:null,
  };
}
//  declare route
const router = createBrowserRouter([
  prepareRouter("/",<HomeU/>,false),
  prepareRouter("/login",<RegisterLogin/>,false),
  prepareRouter("/u-profile",<Uprofile/>,true),
  // prepareRouter("/verify-email",<VerifyEmail/>,true),
  // prepareRouter("/upload",<UploadWiget/>,false),
  prepareRouter("/cart",<Cart/>,true),
  prepareRouter("/favorite",<Favorite/>,true),
  prepareRouter("/checkout",<Checkout/>,false),
  prepareRouter("/product/:id",<Product/>,false),


  prepareRouter("*",<NotFound/>,false),
]);


function App() {
  const [state,dispatch]=useReducer(reducer,STATE);

  const CheckAuth= async ()=>{
    const rs= await CheckToken();
    if(rs){
      const up= await getProfile();
      console.log(up)
      state.UserProfile=up;
    }
  }

  useEffect(()=>{
    CheckAuth();
  })
    if(state.token){api.defaults.headers.common["Authorization"]=`Bearer ${state.token}`}
  return (
          <UserProvider value={{state,dispatch}}>
            <Loading display={state.loading}/>
            {/* <UserLinkCss/> */}
            <RouterProvider router={router}/>
          </UserProvider>
  );
}

export default App;
