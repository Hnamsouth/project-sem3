import './App.css';
import React,{ useReducer,useEffect} from 'react';
import { UserProvider } from './context/userContext';
import reducer from './context/reducer';
import STATE from '../src/context/initState';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { prepareRouter } from './route/web.route';
import api from './Service/api';
import { CheckToken, getProfile } from './Service/auth.service';

import HomeU from './Pages/User/home';
import NotFound from './Pages/NotFound';
import Uprofile from './Pages/User/auth/Profile';
import Cart from './Pages/Cart/cart';
import Favorite from './Pages/Favorite/favorite';
import Checkout from './Pages/Checkout/checkout';
import RegisterLogin from './Pages/User/auth/RegisterLogin';
import Loading from './Conponents/loading';
import ProductDetail from './Pages/Product/pDetail';
import UserCarts from './Pages/Cart/UserCarts';


//  declare route
const router = createBrowserRouter([
  prepareRouter("/",<HomeU/>,false),
  prepareRouter("/login",<RegisterLogin/>,false),
  prepareRouter("/u-profile",<Uprofile/>,true),
  prepareRouter("/cart",<UserCarts/>,true),
  prepareRouter("/favorite",<Favorite/>,true),
  prepareRouter("/checkout",<Checkout/>,false),
  prepareRouter("/product/:id",<ProductDetail/>,false),

  prepareRouter("*",<NotFound/>,false),
]);


function App() {
  const [state,dispatch]=useReducer(reducer,STATE);   
  const CheckAuth= async ()=>{
    const rs= await CheckToken();
    console.log(rs)

    if(rs){
      if(state.User.profile==null){
        const up= await getProfile();
        dispatch({type:"SET_USER",payload:{profile:up.profile,cart:up.cart,favorite:up.favorite}})
      }
    }else{
      dispatch({type:"SET_USER",payload:{profile:null,cart:[],favorite:[]}})
    }
  }
  useEffect(()=>{
    CheckAuth();
  },[])
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
