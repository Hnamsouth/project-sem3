import './App.css';
import React,{ useReducer ,useEffect,useContext} from 'react';
import { UserProvider } from './context/userContext';
import reducer from './context/reducer';
import STATE from '../src/context/initState';
import Loading from './Conponents/loading';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import UserLayout from './Conponents/User/UserLayout';
import HomeU from './Pages/User/home';
import NotFound from './Pages/NotFound';
import CartU from './Pages/User/cart';
import CheckoutU from './Pages/User/checkout';
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
                  <Route exact path='/' element={iUser(<HomeU/>,false) } />
                  <Route  path='/contact' element={iUser(<HomeU/>,false)}/>
                  <Route  path='/about-us' element={iUser(<HomeU/>,false)}/>
                  <Route  path='/product' element={iUser(<HomeU/>,false)}/>
                  <Route path='/cart' element={iUser(<CartU/>,false)}/>
                  <Route path='/checkout' element={iUser(<CheckoutU/>,false)}/>
                  {/* User Route */}
                  <Route path={URL_USER+"/asd"} element={iUser(<HomeU/>,false)}/>
                  <Route path='*' Component={NotFound}/>
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

export default App;
