import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Remedify, GraphicDesignComms, GraphicDesignProjs, Studius, Resume } from './projects';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/remedify' element={<Remedify />}/>
      <Route path='/graphic-design-commissions' element={<GraphicDesignComms />}/>
      <Route path='/graphic-design-projects' element={<GraphicDesignProjs />}/>
      <Route path='/studius' element={<Studius />}/>
      {/* <Route path='/resume' element={<Resume />}/> */}
    </Routes>
  </BrowserRouter>
);
