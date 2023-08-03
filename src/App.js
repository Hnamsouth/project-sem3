import './App.css';
import React,{ useReducer ,useEffect,useContext} from 'react';
import { UserProvider } from './context/userContext';
import reducer from './context/reducer';
import STATE from '../src/context/initState';
import Loading from './Conponents/loading';
import {BrowserRouter, Routes,Route,useLocation} from 'react-router-dom';
import UserLayout from './Conponents/User/UserLayout';
import HomeU from './Pages/User/home';
import NotFound from './Pages/NotFound';
import Login from "./Pages/User/auth/RegisterLogin";
import Uprofile from './Pages/User/auth/Profile';
import VerifyEmail from './Pages/User/auth/VerifyEmail';
import RegisterLogin from './Pages/User/auth/RegisterLogin';
const URL_USER="/user-lord"


function App() {
  const [state,dispatch]=useReducer(reducer,STATE);
  
  return (
          <UserProvider value={{state,dispatch}}>
            <Loading display={state.loading}/>
            {/* <UserLinkCss/> */}
            <BrowserRouter>
                <Routes>
                  {/*  client Route  */}
                  <Route exact path='/' element={UserLO(<HomeU/>) } />
                  <Route  path='/contact' element={UserLO(<HomeU/>)}/>
                  <Route  path='/about-us' element={UserLO(<HomeU/>)}/>
                  <Route  path='/product' element={UserLO(<HomeU/>)}/>

                  <Route path='/verify-email' element={<VerifyEmail/>}/>

                  {/* user */}
                  <Route path='/login' element={UserLO(<RegisterLogin/>)}/>
                  <Route path='/u-profile' element={UserLO(<Uprofile/>)}/>
                 
                  {/* User Route */}
                  <Route path={URL_USER+"/asd"} element={UserLO(<HomeU/>)}/>
                  <Route path='*' Component={NotFound}/>
                </Routes>
            </BrowserRouter>
          </UserProvider>
  );
}
function UserLO(page){
  return (
    <UserLayout main={page}/>
  );
}

export default App;
