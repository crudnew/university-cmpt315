//import React, { Component }  from 'react';
import React  from 'react';
import "./App.css";
import {Button} from 'react-bootstrap'
// importing components from react-router-dom package
import {
  BrowserRouter as Router,
  Routes,
  Route,
  //Navigate,
} from "react-router-dom";
  
// import Home component
import Home from "./components/Home";
// import Customer component
import Customer from "./components/Customer";
// import Car component
import Car from "./components/Car";
// import Branch component
import Branch from "./components/Branch";
// import CarType component
import CarType from "./components/CarType";
// import Rental component
import Rental from "./components/Rental";
// import Employee component
import Employee from "./components/Employee";
import NavBar from './components/NavBar';
import CustomerView from './components/CustomerView';
import Confirmation from './components/Confirmation';
import Test from './components/Test';

  
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/customerview" element={<CustomerView/>}/>
          <Route path="/confirmation" element={<Confirmation/>}/>
          <Route path="/admin/*" element={<NavBar/>}/>
          <Route path="*" element={< Home />} />
        </Routes>
      </Router>
    </>
    
    // {/* <Home/> */}
  );
}
  
export default App;