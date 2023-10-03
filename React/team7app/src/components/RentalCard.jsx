import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AiFillCar } from "react-icons/ai";
import {
  FormGroup,
  Input,
} from "reactstrap";
import Dropdown from 'react-bootstrap/Dropdown';

import '../App.css';

const RentalCard = ({branches}) => {
  const [ ddvalue, setDdValue ] = useState('');
  const [ ddbranchfrom, setDdBranchFrom ] = useState('');
  const [ ddbranchto, setDdBranchTo ] = useState('');
  const [ inputdatefrom, setDatefrom ] = useState('');
  const [ inputdateto, setDateto ] = useState('');
  
  const ddhandleSelect=(e)=>{
    setDdValue(e)
  }

  const ddhandleSelectBranchFrom=(e)=>{
    setDdBranchFrom(e)
  }

  const ddhandleSelectBranchTo=(e)=>{
    setDdBranchTo(e)
  }

  const handleDateFrom=(e)=>{
    setDatefrom(e.target.value);
  };

  const handleDateTo=(e)=>{
    setDateto(e.target.value);
  };

  // handle date form
  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var dateFrom = curr.toISOString().substring(0,10);
  
  if (inputdatefrom === '') {
    setDatefrom(dateFrom)
  }

  var curr2 = new Date();
  curr2.setDate(curr.getDate() + 7);
  var dateTo = curr2.toISOString().substring(0,10);

  if (inputdateto === '') {
    setDateto(dateTo)
  }

  function createDD(){
    if (ddvalue === "op2") {
      // Different drop-off
      return <Dropdown onSelect={ddhandleSelectBranchTo}>
              <Dropdown.Toggle variant="light grey" id="dropdown-custom3" 
                                style={{backgroundColor: "#D3D3D3", textAlign: "start"}}>
              {<AiFillCar/>} {ddbranchto? (
                "To: " + ddbranchto
              ) : (
                "To: " 
              )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {branches.map((e, index) => {
                    return <Dropdown.Item eventKey={e.props.children.props.children} key={index}>{e}</Dropdown.Item>;
                  })}
              </Dropdown.Menu>
            </Dropdown>
    }
  }

    function buttonFunc() {
      if (ddvalue===''){
        setDdValue("op1");
      }
    
      if (ddbranchfrom==='' && branches.length > 0){
      setDdBranchFrom(branches[0].props.children.props.children)
      }
    };

    return (
      <>
  
        <div className="card-style">
          <h1>Get a rental</h1>
          <p>Select a car type and get a quick estimated cost.<br/></p>
          <section className='card-section'>
          {/* <h1 style={{color:"black", fontWeight:"bold", marginLeft:"6%", marginTop:"5%"}}>Get a rental</h1>
          <p style={{color: "black", marginLeft:"30px"}}>Select a car type and get a quick estimated cost.<br/></p>
          <section style={{height: "25vh", width:"25vw", marginLeft:"8%"}}> */}
            <Dropdown id="dropOffdd" onSelect={ddhandleSelect}>
              <Dropdown.Toggle variant="white" id="dropdown-custom1" size="sm">
                {ddvalue==="op2" ? (
                  "Different drop-off"                  
                ) : (
                  "Same drop-off"
                )}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="op1">Same drop-off</Dropdown.Item>
                <Dropdown.Item eventKey="op2">Different drop-off</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* <Dropdown style={{padding:"10px 0 5px 0"}} onSelect={ddhandleSelectBranchFrom} > */}
            <Dropdown className='dropdown-1' onSelect={ddhandleSelectBranchFrom} >
            <Dropdown.Toggle variant="light grey" id="dropdown-custom2" 
                                style={{backgroundColor: "#D3D3D3", textAlign: "start"}}>
              {/* <Dropdown.Toggle variant="light grey" id="dropdown-custom2" 
                                style={{backgroundColor: "#D3D3D3", width:"85%", textAlign: "start"}}> */}
              {<AiFillCar/>} {ddbranchfrom? (
                ddbranchfrom
              ) : (
                branches[0]
              )}
              </Dropdown.Toggle >
              {/* <Dropdown.Menu  style={{width:"85%", color:"black"}}> */}
              <Dropdown.Menu className='dropdown-menu'>
                {branches.map((e, index) => {
                  return <Dropdown.Item eventKey={e.props.children.props.children} key={index}>{e}</Dropdown.Item>;       
                })}
              
              </Dropdown.Menu>
            </Dropdown>
            {createDD()}
            <FormGroup>
            {/* <FormGroup style={{width: "42%", float: "left"}}> */}
              <Input 
                type="date"
                id="startDate"
                name="startDate"
                // defaultValue={dateFrom}
                value={inputdatefrom}
                onChange={handleDateFrom}
                style={{backgroundColor: "#D3D3D3"}} 
              />
              </FormGroup>
              {/* <FormGroup style={{width: "42%", float: "right", marginRight: "15%"}}> */}
              <FormGroup>
              <Input 
                  type="date"
                  id="endDate"
                  name="endDate"
                  // defaultValue={dateTo}
                  value={inputdateto}
                  onChange={handleDateTo}
                  style={{backgroundColor: "#D3D3D3"}}
                />
              </FormGroup> 
              
              {buttonFunc()}
              <Link to="/customerview" state={{ddvalue, ddbranchfrom, ddbranchto, inputdatefrom, inputdateto}} >
              <button 
                className="btn mr-2"
                style={{backgroundColor:"saddlebrown", color:"white"}}
                onClick={()=>{}}>Search
              </button>
              </Link>
              
              
          </section>

      </div>
    </>
  )}

  export default RentalCard;