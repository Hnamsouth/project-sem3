import './App.css';
import React,{ useReducer ,useEffect,useContext} from 'react';
import { UserProvider } from './context/userContext';
import reducer from './context/reducer';
import STATE from '../src/context/initState';
import HEADER  from './Conponents/header';
import FOOTER from './Conponents/footer';
import Loading from './Conponents/loading';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
  const [state,dispatch]=useReducer(reducer,STATE);
  useEffect(() => {
    const element = document.createElement('div');
    element.innerText = 'Nội dung phần tử bên ngoài';
    document.body.appendChild(element);

    return () => {
      document.body.removeChild(element);
    };
  }, []);
  return (
    <div class="page-wrapper">
      <UserProvider value={{state,dispatch}}>
        <HEADER/>
        <Loading display={state.loading}/>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
          </Routes>
        </BrowserRouter>
        <FOOTER script={state.afterScript}/>
      </UserProvider>
    </div>
    
  );
}

export default App;
