import './App.css';
import React from 'react'
import { Admin } from './components/Admin.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import PopupState from './context/popup/PopupState.js'

function App() {
  return (
    <>
      <PopupState>
        <Router>
          <Routes>
            <Route
              path='/admin/login'
              element={
                <Login />
              }
            />
          </Routes>
        </Router>
        <Admin />
      </PopupState>
    </>
  );
}

export default App;
