import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    FormGroup,
    Input,
    Label,
    } from "reactstrap";

import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { AiFillCar, AiOutlineSearch} from "react-icons/ai";

const CarCards = ({car, branchfrom, branchto, datef, datet}) => {
    const [carType, setCarType] = useState([]);
    const [rentals, setRentals] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [branches, setBranches] = useState([]);
    const [email, setEmail] = useState('');
    const [carPass, setCarPass] = useState([]);
    const [employeePass, setEmployeePass] = useState([]);
    const [branchesfromPass, setBranchesFromPass] = useState([]);
    const [branchestoPass, setBranchesToPass] = useState([]);
    const [show, setShow] = useState(false);

   
    
    const navigate = useNavigate();

    useEffect(() => {
        Promise.all([
        fetch('http://localhost:8000/api/cartype/'),
        fetch('http://localhost:8000/api/rental/'),
        fetch('http://localhost:8000/api/customer/'),
        fetch('http://localhost:8000/api/employee/'),
        fetch('http://localhost:8000/api/branch/'),
    ])
        .then(([resCartype, resRentals, resCustomers, resEmployees, resBranches]) => 
        Promise.all([resCartype.json(), resRentals.json(), resCustomers.json(), resEmployees.json(), resBranches.json()])
    )
        .then(([valCartype, valRentals, valCustomers, valEmployees, valBranches]) => {
        setCarType(valCartype);
        setRentals(valRentals);
        setCustomers(valCustomers);
        setEmployees(valEmployees);
        setBranches(valBranches);
    });
    }, []);

    // handle button 
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        // convert input to fit the datatype
        setEmployeePass(employees.filter(d => d.city.toLowerCase() === branchfrom.toLowerCase()));
        setBranchesFromPass(branches.filter(d => d.city.toLowerCase() === branchfrom.toLowerCase()));
        setBranchesToPass(branches.filter(d => d.city.toLowerCase() === branchto.toLowerCase()));
    }

    
    // Estimate price 
    function totalCost(daily, weekly, monthly, changeBranchFee) {
        var total_days = 0; 
        var months = 0; 
        var weeks = 0; 
        var days = 0;
        var total = 0; 
        var monthCost = 0; 
        var weekCost = 0; 
        var dayCost = 0;
        var diff_to = 0; 
        var branch = 0;

        var dt = new Date(datet)
        var df = new Date(datef)
        // get all different days 
        diff_to = Math.abs(dt - df)
        total_days = Math.ceil(diff_to / (1000 * 60 * 60 * 24)); 
        
        // if it returned on same day, still need to be charged for one day cost
        if (total_days == 0) {
            total_days = 1
        }
        // get how many months, weeks, and days
        months = Math.floor(total_days/30)
        weeks = Math.floor((total_days - months*30)/7)
        days = (total_days - months*30 - weeks*7) 
    
        // get charges based on calculated months, weeks, and days
        if (months > 0) {
            monthCost = monthly * months
        }   
        if (weeks > 0) {
            weekCost = weekly * weeks
        }
        if (days > 0) {
            dayCost = daily * days
        }
            
        // charge fee if departure branch and arrival branch is not the same
        if (branchfrom != branchto) {
            branch = changeBranchFee                
        } 
        // get total price by sum all the values, then return 
        total = monthCost + weekCost + dayCost + branch
        return total       
    }
   
    // Modal handling
    const handleButton = (e) => {
        console.log("from", branchesfromPass, branchfrom)
        for (var em=0; em < customers?.length; em++){
            if (customers[em].email === email){
                navigate("/confirmation", {state: {employee: employeePass, car:car, customer:customers[em], branchf:branchesfromPass, branchto:branchestoPass, datef:datef, datet:datet}});
            }
            else {
                console.log("in")              
                //alert("You are not a member, please contact our agent");    
            }
        }
       
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    
    return (
        <div className='car-card'>
            <div className='car-img-card'>
                <img 
                src={`assets/imgs/${car.manufacturer.toLowerCase()}_${car.model.toLowerCase()}.png`} 
                alt={car.licencePlate} 
                width='100%' />
            </div>
            <div className='car-card-details'>
                <div style={{fontSize: '25px', fontWeight: 'bold'}}> {car.manufacturer} {car.model}</div>
                <div>{car.colour.toUpperCase()} | {car.fuelType} gas | {car.mileage} mi.</div>
                <div> 
                    {(carType?.length > 0)
                        ? (      
                        <div>                         
                            {carType.map((type) => {                                    
                                return (type.typeId===car.carType)
                                    ? (
                                    <div>
                                        <div style={{fontWeight:"bold", color:"#328b13"}}>{type.description}</div>
                                        <div style={{fontSize: "13px"}}>
                                        Daily:&emsp;&ensp;&ensp;&ensp;${type.dailyCost}
                                        <br></br>
                                        Weekly:&emsp;&ensp;${type.weeklyCost}
                                        <br></br>
                                        Monthly:&emsp;${type.monthlyCost} 
                                        </div>
                                    </div>                                      
                                    ) : null                            
                            })}   
                        </div>                                                     
                        ) : null      
                    }
                    
                </div>
            </div>
            <div className="vl"> 
                <div style={{marginLeft: "5%", marginTop: "5%", width: "15vw", fontWeight: "bold", color: "darkgreen"}}>Estimated Price:</div>
                <div style={{marginLeft: "5%", marginTop: "5%", width: "15vw", color: "darkgreen"}}>CAD$</div> 
                <div style={{marginLeft: "30%", marginRight: "30%", marginTop: "-4vh", fontSize: "40px", width: "15vw", fontWeight: "bold", color: "green"}}>
                    {carType.map((type) => {                                    
                                return (type.typeId===car.carType)
                                    ? (
                                    <div>
                                        {totalCost(type.dailyCost, type.weeklyCost, type.monthlyCost, type.changeBranchFee)}
                                    </div>                                      
                                    ) : null                            
                            })}
                </div>
                    <Button                       
                        onClick={handleShow} 
                        style={{border: "1px solid white", backgroundColor:"#E65700", color:"white", width: "80%", height: "40px", margin: "0% 10% 2% 10%"}}>
                        Book Now!
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Sign in</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="Form.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                onChange={handleEmail}                           
                            />
                            </Form.Group>
                        </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    
                        <Button 
                            variant="primary" 
                            onClick={handleButton}  
                            id={car.carId}
                            value={car.carId} 
                        >
                            Continue
                        </Button>
                        
                        </Modal.Footer>                        
                    </Modal>
            </div>           
        </div>
        )
}
export default CarCards;