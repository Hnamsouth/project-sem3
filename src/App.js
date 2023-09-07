import './App.css';
import React,{ useReducer,useEffect} from 'react';
import { UserProvider } from './context/userContext';
import reducer from './context/reducer';
import STATE, { Iuser } from '../src/context/initState';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import { prepareRouter } from './route/web.route';
import api from './Service/api';
import { CheckToken, getProfile } from './Service/auth.service';

import HomeU from './Pages/User/home';
import NotFound from './Pages/NotFound';
import Uprofile from './Pages/User/auth/Profile';
import Favorite from './Pages/Favorite/favorite';
import Checkout from './Pages/Checkout/checkout';
import RegisterLogin from './Pages/User/auth/RegisterLogin';
import Loading from './Conponents/loading';
import ProductDetail from './Pages/Product/pDetail';
import UserCarts from './Pages/Cart/UserCarts';
import { getNavData } from './Service/app.service';
import Shop from './Pages/Product/shop';
import OffExample from './Pages/Product/offcanvas';


//  declare route
const router = createBrowserRouter([
  prepareRouter("/",<HomeU/>,false),
  prepareRouter("/login",<RegisterLogin/>,false),
  prepareRouter("/u-profile",<Uprofile/>,false),
  prepareRouter("/cart",<UserCarts/>,true),
  prepareRouter("/favorite",<Favorite/>,true),
  prepareRouter("/checkout",<Checkout/>,false),
  prepareRouter("/product/:id",<ProductDetail/>,false),
  prepareRouter("/shop",<Shop/>,false),
  prepareRouter("*",<NotFound/>,false),
  {
    path:"/demo",element:<OffExample/>
  }
]);

function App() {
  const [state,dispatch]=useReducer(reducer,STATE);   
  const CheckAuth= async ()=>{
    dispatch({type:"SHOW_LOADING"})
    const rs= await CheckToken();
    const nav = await getNavData();
    if(rs){
      if(state.User.profile==null){
        dispatch({type:"SET_USER",payload:await getProfile()})
      }
    }else{
      dispatch({type:"SET_USER",payload:Iuser})
    }
    dispatch({type:"SET_NAV",payload:nav})
    dispatch({type:"HIDE_LOADING"})
    return;
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
