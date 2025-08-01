import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Routes, Route, useLocation } from 'react-router';
import { Remedify, GraphicDesignComms, GraphicDesignProjs, Studius, VanGo, Magazine, CurrencyConverter, Somasync, Neighbour, Smartnsave } from './projects';
import About from './About';

const root = ReactDOM.createRoot(document.getElementById('root'));

function ScrollReset() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    if (pathname === "/") return;
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
}

root.render(
  <>
  <HashRouter>
    <ScrollReset/>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/remedify' element={<Remedify />}/>
      <Route path='/dearneighbour' element={<Neighbour/>}/>
      <Route path='/smartnsave' element={<Smartnsave/>}/>
      <Route path='/somasync' element={<Somasync/>} />
      <Route path='/graphic-design-commissions' element={<GraphicDesignComms />}/>
      <Route path='/designs' element={<GraphicDesignProjs />}/>
      <Route path='/studius' element={<Studius />}/>
      <Route path='van-go' element={<VanGo />}></Route>
      <Route path='/about' element={<About />}/>
      <Route path='/db-mag' element={<Magazine />}/>
      <Route path='/currency-converter' element={<CurrencyConverter />}/>
    </Routes>
  </HashRouter>
  </>
);
