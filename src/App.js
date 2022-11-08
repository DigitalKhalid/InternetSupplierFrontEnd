import './App.css';
import './components/Sidebar/Sidebar.css'
import React, { useState } from 'react'
// import { Sidebar } from './components/Sidebar';
// import { SideMenu } from './components/SideMenu';
import { Header } from './components/Header';
// import { User } from './components/contents/User'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/Sidebar/Sidebar';
import { Content } from './components/Content';

function App() {


  return (
    <>
    <Content/>

    </>
    // <>
    //   <Router>
    //     {/* <Header /> */}
    //     <div className="container-float mx-3 my-3">
    //       <div className="row">
    //         <div className="col-md-12">
    //           <SideMenu />
    //         </div>
    //         <Routes>
    //           {/* <Route
    //           path='/'
    //           element={
    //             <div className="col md 10">
    //               <Dashboard />
    //             </div>
    //           }
    //         /> */}

    //           <Route
    //             path='/users'
    //             element={
    //               <div className="col md 10">
    //                 <User />
    //               </div>
    //             }
    //           />
    //         </Routes>

    //       </div>
    //     </div>
    //   </Router>
    // </>
  );
}

export default App;
