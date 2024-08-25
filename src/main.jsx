import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App.jsx';
import './index.css';
import Header from './component/Header/Header.jsx';
import Footer from './component/Footer/Footer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      <Header />
      <App />
      <Footer/>
    </BrowserRouter>
  </React.StrictMode>
);
