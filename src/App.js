import './App.css';
import React,{ useReducer ,useEffect,useContext} from 'react';
import { UserProvider } from './context/userContext';
import reducer from './context/reducer';
import STATE from '../src/context/initState';
import Loading from './Conponents/loading';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import LayoutAdmin from './Conponents/Admin/AdminLayout';
import UserLayout from './Conponents/User/UserLayout';
import AdminLogin from './Pages/Admin/auth/login'
import AdminDashboard from './Pages/Admin/dashboard';
import HomeU from './Pages/User/home';
import NotFound from './Pages/NotFound';
import UserLinkCss from './Conponents/User/Script-Css/linkcss';
import AdminLinkCss from './Conponents/Admin/script-css/LinkCss';


const URL_ADMIN="/admin-adios";
const URL_USER="/user-lord"

const {user1,admin1}={user1:"/admin-adios",admin1:"/user-lord"}

function App() {
  const [state,dispatch]=useReducer(reducer,STATE);
  
  return (
          <UserProvider value={{state,dispatch}}>
            <Loading display={state.loading}/>
            {/* <UserLinkCss/> */}
            
            <BrowserRouter>
                <Routes>
                  {/*  client Route  */}
                  <Route exact path='/' element={iUser(<HomeU/>,false) } />
                  <Route  path='/contact' element={iUser(<HomeU/>,false)}/>
                  <Route  path='/about-us' element={iUser(<HomeU/>,false)}/>
                  <Route  path='/product' element={iUser(<HomeU/>,false)}/>
                  {/* User Route */}
                  <Route path={URL_USER+"/asd"} element={iUser(<HomeU/>,false)}/>

                  {/*  Admin Route  */}
                  <Route  path={URL_ADMIN}  element={iAdmin(<AdminDashboard/>,false)}/>
                  <Route  path={URL_ADMIN+"/dashboard"} element={iAdmin(null,false)}/>
                  <Route  path={URL_ADMIN+"/login"}  element={iAdmin(<AdminLogin/>,true)}/>
                  <Route  path='*' Component={NotFound}/>
                </Routes>
            </BrowserRouter>
          </UserProvider>
  );
}

function iUser(page,auth){
  return (
    <UserLayout main={page} auth={auth}/>
  );
}
function iAdmin(page,auth){
  return (
    <LayoutAdmin main={page} auth={auth}/>
  );
}


export default App;
