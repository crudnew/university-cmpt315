import React, { useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {AiOutlineCopyrightCircle, AiFillCar, AiOutlineMail} from "react-icons/ai";
import { Link } from "react-router-dom";

import RentalCard from './RentalCard';
import '../App.css';

import {Modal, ModalBody} from 'react-bootstrap';
import { Form, FormGroup, Input } from "reactstrap";
import {Routes, Route, useNavigate} from 'react-router-dom';

const Header = ({}) =>{
  return  (
    <div className="header-style">
          <img src="https://www.bing.com/th/id/OGC.645a1e3e0c8bd024038b070e227f66e5?pid=1.7&rurl=http%3a%2f%2f1.bp.blogspot.com%2f-vABWDW_xyUg%2fU2mZpQL-uRI%2fAAAAAAAAFHk%2fGfQ5PTazWAo%2fs1600%2fFerrari%2b11.gif&ehk=cnnFemsOnak4Kcorf3ThDkYc3sr%2btR1zA%2fHUmb4EgsQ%3d" alt=""/>
          <h1 style={{color: "white", fontFamily:"Impact"}}>Canada-Wide Car Rental Service</h1>
          
          {/* <a href={'/navbar'} style={{textDecoration:"none"}}><h4 style={{color:"white", marginLeft:"550px", marginTop:"10px"}}>Sign in</h4></> */}
          {/* <div className="search-style">
              <input
                placeholder=" Quick Car Search" style={{height: "50px", width:"140px", borderRadius:"10px", border:"1px solid saddlebrown"}}/>
          </div> */}
    </div>
  );
}


const BranchesCard = ({branches}) => {
  return (
    <>
      <div className="card-style-branches">
        <h1 style={{color:"black", fontSize: "35px"}}>Explore Our Top Branch Destinations</h1>
        <p style={{color: "#454545"}}>Check out our current available branches across Canada, including major cities like Toronto, Vancouver and Montreal.</p>
        <section style={{overflowY:"hidden", height: "45%", width:"25vw", color:"black"}}>
          {branches?.map((d, index) => 
            <a href={`https://www.${d.props.children.props.children}.ca/`} key={index} target="_blank" rel="noopener noreferrer">
              <li className='list-item'style={{color:"black"}} >{d}</li>
            </a>)}
        </section>
      </div>
    </>
)}



const Cards = ({branches}) => {
  return (
    <>
  {/* <div className="cards-style"> */}
  <div className="cards-container">
    <div className="cards-style">
    <BranchesCard branches={branches}/>
    <RentalCard branches={branches}/>
    </div>
  </div>
  </>
)}


const login_credentials = {admin_username: "group7admin" , admin_password: "macewan315"};

const Footer = (setIsClicked) =>{ 

  //Modal handling
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const [username,  setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameChange = event => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  const handleLogin = (e) => {
    if (login_credentials.admin_username === username ) {
      if (login_credentials.admin_password === password) {
        navigate("/admin");
      } 
      else {
        alert("Incorrect Password");
      }
    }
    else {
      alert("Incorrect Username")
    }
  } 

  return(
    
    <div className="footer-container">
      <div className="footer-wrapper footer-wrapper-padding">
        <div className='footer-half'>
          <div className='footer-col'>
            <h4>Top rentals</h4>
            <p>Toyota Rav4<br/>Honda Civic<br/>Tesla Model X<br/>Toyota Corolla<br/>Range Rover Sport</p>
          </div>

          <div className='footer-col'>
            <h4>Cheap rentals</h4>
            <p>Toyota Rav4<br/>Honda Civic<br/>Tesla Model X<br/>Toyota Corolla<br/>Range Rover Sport</p>
          </div>
        </div>

        <div className='footer-half'>
          <div className='footer-col'>
            <h4>Latest updates</h4>
            <p>Due to the recent increase in oil prices,<br/> 
            a late fee will be applied for rentals past<br/>the reservation return date.<br/>
              <p>Courtesy of the Management:<br/>
              {'Copyright '}{<AiOutlineCopyrightCircle/>}{' 2022 >> Cmpt 315 Group 7'}
              </p>
            </p>
          </div>

          <div className='footer-col'>
            <h4>Contact us</h4>
            <p>
              {<AiOutlineMail/>} hans28@mymacewan.ca<br/>
              {<AiOutlineMail/>} mcneillyd2@macewan.ca<br/>
              {<AiOutlineMail/>} rudnewc@mymacewan.ca<br/>
              {<AiOutlineMail/>} hossainnr2@mymacewan.ca<br/>
              {<AiOutlineMail/>} aromolaranm@mymacewan.ca
            </p>
          </div>
        </div>
      </div>
      

      <div className='footer-wrapper-admin'>
        <button className='btn-admin' onClick={handleShow}> Admin </button>
          <Modal className="my-modal" show={show} onHide={handleClose}>
          <Modal.Header closeButton className="mymodal-head">
            <Modal.Title className="mymodal-title"><h4>Admin Login</h4></Modal.Title>
          </Modal.Header>
          <ModalBody>
            <Form>
              <FormGroup>
                <Input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleUsernameChange}
                value={username}
                />
                <Input
                type="text"
                name="password"
                placeholder="Password"
                onChange={handlePasswordChange}
                value={password}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <Modal.Footer className="mymodal-footer">  
            <button className='btn-login' onClick={handleLogin}> Login </button>
          </Modal.Footer>
          </Modal>
      </div>
    </div>
  );
    // <div className="footer-style">
    //   <div style={{}}>
    //     <h4 style={{color:"chocolate", marginLeft:"5vw", marginTop:"10px", width:"100%"}}>Top rentals</h4>
    //     <p style={{color:"white", marginLeft:"5vw", width:"100%"}}>Toyota Rav4<br/>Honda Civic<br/>Tesla Model X<br/>Toyota Corolla<br/>Range Rover Sport</p>
    //   </div>

    //   <div style={{}}>
    //     <h4 style={{color:"chocolate", marginLeft:"10vw", marginTop:"10px", width:"100%"}}>Cheap rentals</h4>
    //     <p style={{color:"white", marginLeft:"10vw", width:"100%"}}>Toyota Rav4<br/>Honda Civic<br/>Tesla Model X<br/>Toyota Corolla<br/>Range Rover Sport</p>
    //   </div>

    //   <div style={{}}>
    //     <h4 style={{color:"chocolate", marginLeft:"10vw", marginTop:"10px", width:"25vw"}}>Latest updates</h4>
    //     <p style={{color:"white", marginLeft:"10vw", fontStyle:"italic"}}>Due to the recent increase in oil prices,<br/> 
    //     a late fee will be applied for rentals past<br/>the reservation return date.<br/>
    //       <p style={{fontStyle:"normal"}}>Courtsey of the Management:<br/>
    //       {'Copyright '}{<AiOutlineCopyrightCircle/>}{' 2022 >> Cmpt 315 Group 7'}
    //       </p>
    //     </p>
    //   </div>

    //   <div style={{}}>
    //     <h4 style={{color:"chocolate", marginLeft:"3vw", marginTop:"10px", width:"20vw"}}>Contact us</h4>
    //     <p style={{color:"white", marginLeft:"3vw"}}>
    //       {<AiOutlineMail/>} hans28@mymacewan.ca<br/>
    //       {<AiOutlineMail/>} mcneillyd2@macewan.ca<br/>
    //       {<AiOutlineMail/>} rudnewc@mymacewan.ca<br/>
    //       {<AiOutlineMail/>} hossainnr2@mymacewan.ca<br/>
    //       {<AiOutlineMail/>} aromolaranm@mymacewan.ca
    //     </p>
    //   </div>
    //   <div>
    //     <Link to="/admin">
    //         <button 
    //           style={{width: "10vw", height:"7vh", marginTop:"12vh", backgroundColor:"saddlebrown", borderColor:"saddlebrown"}} 
    //           onClick={() => {setIsClicked(true);}}>
    //             <h4 style={{color:"white", marginTop:"10px"}}>Admin</h4>
    //         </button>
    //     </Link>
    //   </div>
    // </div>
  // );
}
const Home = () => {
  const[branches, setBranches] = useState([]);
  const[isClicked, setIsClicked] = useState(false);

  //handleLogin = (username, password) => {}

  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async() =>{
    const response = await fetch('http://localhost:8000/api/branch/');
    const data = await response.json();
    
    setBranches(data.map((d) => <><>{d.city}</></>));
    // setBranches(data.map((d) => <a href="#"><li style={{color:"black", marginLeft:"30px"}}>{d.city}</li></a>));
  }

  const display = () =>{

    // if (isClicked === false){
      return <>
        <div className="main-body-style">
          <Header setIsClicked={setIsClicked}/>
          <Cards branches={branches}/>
          <Footer/>          
        </div>

      </>
    // }

    // else{
      // setIsClicked(false);
      // return <><NavBar/></>

    // }

  }

  return (
    <>
      {
        display(isClicked)
      }
    </>
  );
}
  
export default Home;

//<Link to="/admin">
//<button className='btn-login' onClick={() => {setIsClicked(true);}}> Login </button>
//</Link>