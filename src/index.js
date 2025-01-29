import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router';
import { Remedify, GraphicDesignComms, GraphicDesignProjs, Studius, VanGo, Magazine, CurrencyConverter } from './projects';
import About from './About';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/remedify' element={<Remedify />}/>
      <Route path='/graphic-design-commissions' element={<GraphicDesignComms />}/>
      <Route path='/designs' element={<GraphicDesignProjs />}/>
      <Route path='/studius' element={<Studius />}/>
      <Route path='van-go' element={<VanGo />}></Route>
      <Route path='/about' element={<About />}/>
      <Route path='/db-mag' element={<Magazine />}/>
      <Route path='/currency-converter' element={<CurrencyConverter />}/>
    </Routes>
  </HashRouter>
);
