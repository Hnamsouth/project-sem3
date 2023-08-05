import './App.css';
import React,{ useReducer} from 'react';
import { UserProvider } from './context/userContext';
import reducer from './context/reducer';
import STATE from '../src/context/initState';
import Loading from './Conponents/loading';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import UserLayout from './Conponents/User/UserLayout';
import HomeU from './Pages/User/home';
import NotFound from './Pages/NotFound';
import Uprofile from './Pages/User/auth/Profile';
import VerifyEmail from './Pages/User/auth/VerifyEmail';
import RegisterLogin from './Pages/User/auth/RegisterLogin';
import api from './Service/api';
import { CheckToken } from './Service/auth.service';
import RouteProtected from './Pages/User/auth/Protected';
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
  prepareRouter("/verify-email",<VerifyEmail/>,true),

  prepareRouter("*",<NotFound/>,false),
]);


function App() {
  const [state,dispatch]=useReducer(reducer,STATE);
    if(state.token){api.defaults.headers.common["Authorization"]=`Bearer ${state.token}`}
  return (
          <UserProvider value={{state,dispatch}}>
            <Loading display={state.loading}/>
            {/* use route */}
            <RouterProvider router={router}/>
          </UserProvider>
  );
}
export default App;
