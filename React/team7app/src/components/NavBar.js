import React, {Component, useState} from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from 'react-bootstrap';
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Customer from "./Customer";
import Car from "./Car";
import Branch from "./Branch";
import CarType from "./CarType";
import Rental from "./Rental";
import Employee from "./Employee";

const NavBar = () =>{
    const[selectedColor, setSelectedColor] = useState('white');
    const[selectedColor2, setSelectedColor2] = useState('saddlebrown');
    const[selectedColor3, setSelectedColor3] = useState('saddlebrown');
    const[selectedColor4, setSelectedColor4] = useState('saddlebrown');
    const[selectedColor5, setSelectedColor5] = useState('saddlebrown');
    const[selectedColor6, setSelectedColor6] = useState('saddlebrown');
   return (
    // <Router>
        <div >
           
            <Navbar variant={'light'} expand="lg" style={{backgroundColor:"saddlebrown"}}>
            {/* <img style={{ alignItems:""}} src="https://www.bing.com/th/id/OGC.645a1e3e0c8bd024038b070e227f66e5?pid=1.7&rurl=http%3a%2f%2f1.bp.blogspot.com%2f-vABWDW_xyUg%2fU2mZpQL-uRI%2fAAAAAAAAFHk%2fGfQ5PTazWAo%2fs1600%2fFerrari%2b11.gif&ehk=cnnFemsOnak4Kcorf3ThDkYc3sr%2btR1zA%2fHUmb4EgsQ%3d" alt=""/> */}
            
                <Navbar.Brand  className='nav-half' href="" style={{height:"60px"}}><h1 style={{color: "white", fontFamily:"Impact", marginLeft:"10px"}}>Administrative</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className='nav-wrapper'>
                    <Nav.Link className='nav-link-admin' as={Link} to={"/admin/customer"} style={{backgroundColor:selectedColor, fontSize:"14px", color:"black"}} onClick={() => 
                        {setSelectedColor('white'); setSelectedColor2('saddlebrown'); setSelectedColor3('saddlebrown'); setSelectedColor4('saddlebrown'); setSelectedColor5('saddlebrown'); setSelectedColor6('saddlebrown')}}>{'Manage Customers'}</Nav.Link>
                    <Nav.Link className='nav-link-admin' as={Link} to={"/admin/employee"} style={{backgroundColor:selectedColor2, fontSize:"14px", color:"black"}} onClick={() => 
                        {setSelectedColor('saddlebrown'); setSelectedColor2('white'); setSelectedColor3('saddlebrown'); setSelectedColor4('saddlebrown'); setSelectedColor5('saddlebrown'); setSelectedColor6('saddlebrown')}}>{'Manage Employees'}</Nav.Link>
                    <Nav.Link className='nav-link-admin' as={Link} to={"/admin/branch"} style={{backgroundColor:selectedColor3, fontSize:"14px", color:"black"}} onClick={() => 
                        {setSelectedColor('saddlebrown'); setSelectedColor2('saddlebrown'); setSelectedColor3('white'); setSelectedColor4('saddlebrown'); setSelectedColor5('saddlebrown'); setSelectedColor6('saddlebrown')}}>{'Manage Branches'}</Nav.Link>
                    <Nav.Link className='nav-link-admin' as={Link} to={"/admin/car"} style={{backgroundColor:selectedColor4, fontSize:"14px", color:"black"}} onClick={() => 
                        {setSelectedColor('saddlebrown'); setSelectedColor2('saddlebrown'); setSelectedColor3('saddlebrown'); setSelectedColor4('white'); setSelectedColor5('saddlebrown'); setSelectedColor6('saddlebrown')}}>{'Manage Cars'}</Nav.Link>
                    <Nav.Link className='nav-link-admin' as={Link} to={"/admin/cartype"} style={{backgroundColor:selectedColor5, fontSize:"14px", color:"black"}} onClick={() => 
                        {setSelectedColor('saddlebrown'); setSelectedColor2('saddlebrown'); setSelectedColor3('saddlebrown'); setSelectedColor4('saddlebrown'); setSelectedColor5('white'); setSelectedColor6('saddlebrown')}}>{'Manage Car Types'}</Nav.Link>
                    <Nav.Link className='nav-link-admin' as={Link} to={"/admin/rental"} style={{backgroundColor:selectedColor6, fontSize:"14px", color:"black"}} onClick={() => 
                        {setSelectedColor('saddlebrown'); setSelectedColor2('saddlebrown'); setSelectedColor3('saddlebrown'); setSelectedColor4('saddlebrown'); setSelectedColor5('saddlebrown'); setSelectedColor6('white')}}>{'Manage Rental Transactions'}</Nav.Link>
                    <NavDropdown className='item-nav' align="end" title="Exit" id="basic-nav-dropdown" style={{backgroundColor:"whitesmoke", marginLeft:"10px", fontSize:"20px", fontWeight:"bold", fontStyle:"italic"}}>
                        <NavDropdown.Item href="/home">Home Page</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item href="#action/3.2">Sign Out</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            
            </Navbar>

        <div>
            <Routes>
                <Route path='*' element={<Customer/>}/>
                <Route path='/employee' element={<Employee/>}/>
                <Route path='/branch' element={<Branch/>}/>
                <Route path='/car' element={<Car/>}/>
                <Route path='/cartype' element={<CarType/>}/>
                <Route path='/rental' element={<Rental/>}/>
            </Routes>
        </div>
        </div>
    // </Router>
            
   )      
}
export default NavBar;