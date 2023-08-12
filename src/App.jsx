import { BrowserRouter } from 'react-router-dom';
import { Layout } from 'antd';
import React, { useContext } from 'react';

import SliderMenu from './components/SiderMenu';
import Login from './pages/login/Login';

import {  AppContext } from './context/AppContext';

function App() {
  
  const { loggedIn } = useContext(AppContext);

  return (
  
    <BrowserRouter>
    <Layout>
    {loggedIn ? ( 
      <SliderMenu />
      ) : (
        <Login />
      )}
    </Layout>
  </BrowserRouter>
  
  )
}

export default App
