import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Remedify, GraphicDesignComms } from './projects';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/remedify' element={<Remedify />}/>
      <Route path='/graphic-design-commissions' element={<GraphicDesignComms />}/>
    </Routes>
  </BrowserRouter>
);
