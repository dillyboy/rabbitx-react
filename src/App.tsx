import React from 'react';
import './App.css';
import Details from './Pages/Details/Details';
import List from './Pages/List/List';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Routes>
      <Route element={<List/>} path="/" />
      <Route element={<Details/>} path="/details/:slug" />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
