import React, { useState, useEffect } from "react"
import axios from "axios";
import { 
  Link, 
  useLocation,
  useNavigate,
  } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Label } from "reactstrap";
import Modal from 'react-bootstrap/Modal';


const Header = () =>{
    
    return  (
      <div className="header-style">
        <Link to='/'>
            <img 
            src="https://www.bing.com/th/id/OGC.645a1e3e0c8bd024038b070e227f66e5?pid=1.7&rurl=http%3a%2f%2f1.bp.blogspot.com%2f-vABWDW_xyUg%2fU2mZpQL-uRI%2fAAAAAAAAFHk%2fGfQ5PTazWAo%2fs1600%2fFerrari%2b11.gif&ehk=cnnFemsOnak4Kcorf3ThDkYc3sr%2btR1zA%2fHUmb4EgsQ%3d" 
            alt=""
            style={{width: "130px"}}/>
        </Link>
            <h1 style={{color: "white", fontFamily:"Impact"}}>Canada-Wide Car Rental Service</h1>          
            {/* <div className="search-style">
                <input placeholder="Quick Car Search" style={{height: "50px", width:"140px", borderRadius: '10px'}}/>
            </div> */}
      </div>
    );
}


const Confirm = () =>  {
  const location = useLocation();
  const [customers, setCustomers] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [show, setShow] = useState(false);

  const[item, setItem] = useState({
    rentalId: "",
    dateFrom: location.state.datef,
    dateTo: location.state.datet,
    dateReturned: location.state.datet,
    licensePlate: location.state.car.licencePlate,
    carType: location.state.car.carType,
    car: location.state.car.carId,
    customer: location.state.customer.id,
    employee: location.state.employee[0].employeeId, 
    branchDep: location.state.branchf[0].branchId,
    branchArr: location.state.branchto[0].branchId,
  })

  const[cust, setCust] = useState({
      id: "",
      firstName: location.state.customer.firstName,
      lastName: location.state.customer.lastName,
      driversLicense: location.state.customer.driversLicense,
      email: location.state.customer.email,
      dob: location.state.customer.dob,
      goldMember: true,
      province: location.state.customer.province,
      city: location.state.customer.city,
      postalCode:location.state.customer.postalCode,
      streetNumber: location.state.customer.streetNumber,
      streetName: location.state.customer.streetName,
      unitNumber: location.state.customer.unitNumber, 
      phoneNumber1: location.state.customer.phoneNumber1,
      phoneNumber2: location.state.customer.phoneNumber2,
      phoneNumber3: location.state.customer.phoneNumber3,
  })
  
  const handleClose = () => setShow(false);
  const handleShow = () => {
      setShow(true);
  }
  const submitForm = (e) => {
    e.preventDefault();

    axios
      .post('/api/rental/', item )
      .then((res) => {
        const userList=[];
        const feeList=[];
        var yearList=[];
        rentals.map((r) => {            
          if(res.data.customer === r.customer) {

              feeList.push(r.totalCost)
              
              var date = new Date(r.dateFrom)
              yearList.push(date.getUTCFullYear())
            }        
        })
        //get totalfee if it is over $2000 whithn 
        const feeTotal = rentals.reduce((total, currentValue) => total = total + currentValue.totalCost,0)
        
        yearList=yearList.slice(Math.max(yearList.length - 2, 0))
      
        var custDate = new Date(res.data.dateFrom)
        
        const allEqual = arr => arr.every(v => v === arr[0])

        if ((yearList[0] === custDate.getUTCFullYear()) && allEqual(yearList)) {
          if ((feeTotal > 2000) && yearList.length >= 2) {
            
            axios
            .put(`/api/customer/${location.state.customer.id}/`, cust)
            .then((res) => {
              console.log(res)
              console.log(res.data)

            })
          }
        };
      })

      setShow(true);      
  };

  useEffect(() => {
      fetch('http://localhost:8000/api/rental/')
  
      .then((resRentals) => (resRentals.json())
  )
      .then((valRentals) => {
        setRentals(valRentals);
      
    });
  }, []);

  
  
  
  
  

    
    return (
      <div>
        <Header />
        <div className='background'>
          <div className='confirmation-page'>
            <h1 style={{margin:"2vh 10vw 4vh 30vw"}}>Order Confirmation</h1>
            <div className="hl"></div>
            <div style={{margin: "2vh 2vw 2vh 4vw", position: "flex"}}>
              <div className='car-img-card' style={{borderRadius: "20px", width: 350 }}>
              <img 
                src={`assets/imgs/${location.state.car.manufacturer.toLowerCase()}_${location.state.car.model.toLowerCase()}.png`} 
                alt={location.state.car.licencePlate} 
                width='100%' />
              </div>
              <div style={{marginLeft:"40%", marginTop: "-30vh", marginBottom:"10vh"}}>
                <h4>Book for: </h4> 
                <h5 > {location.state.customer.firstName} {location.state.customer.lastName} ({location.state.customer.email}) </h5>
                <br></br>
                <h4>Vehicle Information : </h4>
                <h5>{location.state.car.manufacturer} {location.state.car.model}</h5>
                <h6>{location.state.car.colour} | {location.state.car.fuelType} gas | {location.state.car.mileage} mi.</h6>
                <br></br>
                <h4>Reservation details : </h4>
                <h5>Location from: {location.state.branchf[0].city}</h5>
                <h5>To: {location.state.branchto[0].city}</h5>
                <h5>Date rent: {location.state.datef}</h5>
                <h5>Date return: {location.state.datet}</h5>
              </div>
              
            </div>
           
            <Button                       
            onClick={submitForm} 
            style={{border: "1px solid white", backgroundColor:"#E65700", color:"white", width: "30%", height: "40px", margin: "0% 10% 2% 10%"}}>
            Confirm
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmed</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="Form.ControlInput1">
                    <Form.Label>Your Book was confirmed!</Form.Label>
                    </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} style={{color:"white"}}>
                  <a href="/">
                    Close
                  </a>             
              </Button>
            </Modal.Footer>
          </Modal>
          
            
             
            <Link to='/'>
            <Button                       
                variant="secondary"
                style={{border: "1px solid white", color:"white", width: "30%", height: "40px", margin: "0% 10% 2% 10%"}}>
                Cancel
            </Button>
            </Link>
          </div>
          
         
  
        </div>
       
      </div>
    )

  
  
}

export default Confirm;