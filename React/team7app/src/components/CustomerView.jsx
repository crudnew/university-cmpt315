import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MapView from './MapView';

import { 
    Link, 
    useLocation,
    useNavigate
    } from "react-router-dom";
import {
    FormGroup,
    Input,
    Label,
    } from "reactstrap";

import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReactSlider from "react-slider";

import { 
    AiFillCar,
    AiOutlineSearch
} from "react-icons/ai";
import CarCards from './CarCards';


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


const CustomerView = () => {
    const location = useLocation();
    const [cars, setCars] = useState([]);
    const [branches, setBranches] = useState([]);
    const [branchFrom, setBranchFrom] = useState(location.state.ddbranchfrom);
    const [branchFromVal, setBranchFromVal] = useState(location.state.ddbranchfrom);
    const [branchTo, setBranchTo] = useState('');
    const [branchToVal, setBranchToVal] = useState('');
    const [rentals, setRentals] = useState([]);
    const [rdateFrom, setRdateFrom] = useState(location.state.inputdatefrom);
    const [rdateFromVal, setRdateFromVal] = useState(location.state.inputdatefrom);
    const [rdateTo, setRdateTo] = useState(location.state.inputdateto);
    const [rdateToVal, setRdateToVal] = useState(location.state.inputdateto);
    const [filtered, setFiltered] = useState([]);
    const [colour, setColour] = useState('');
    const [fuel, setFuel] = useState('');
    const [maxMile, setmaxMile] = useState('');

    //let filtered = [];
    var branchId;
    
    
    useEffect(() => {
        Promise.all([
            fetch('http://localhost:8000/api/car/'),
            fetch('http://localhost:8000/api/branch/'),
            fetch('http://localhost:8000/api/rental/'),
        ])
        .then(([resCars, resBranches, resRentals]) => 
        Promise.all([resCars.json(), resBranches.json(), resRentals.json()])
        )
        .then(([valCars, valBranches, valRentals]) => {
        setCars(valCars);
        setBranches(valBranches);
        setRentals(valRentals);
    });
    }, []);

     // Set drop down menu options if anything passed from RentalCard
    function setDropdownVal() {
        // if (!branchTo && location.state.ddbranchto) {
        //     return setBranchTo(location.state.ddbranchto)
        // } 
        if (branchToVal ==='' && location.state.ddvalue === "op2" && location.state.ddbranchto !== '') {
            setBranchTo(location.state.ddbranchto)
            setBranchToVal(location.state.ddbranchto)
        } 
        // else if (!branchTo && location.state.ddvalue === "op1" && location.state.ddbranchto === ''){
        //     setBranchToVal(location.state.ddbranchfrom)
        // }
        // else if (!branchTo && location.state.ddvalue === "op2" && location.state.ddbranchto === ''){
        //     setBranchToVal(location.state.ddbranchfrom)
        // }
           
    }

    // Dropdown, input handlers in search bar
    const handleSelectDateFrom=(e)=>{
        setRdateFromVal(rdateFromVal=>e.target.value)     
    } 

    const handleSelectDateTo=(e)=>{
        setRdateToVal(rdateToVal=>e.target.value)    
    }

    const ddhandleSelectBranchTo=(e)=>{
        setBranchToVal(e)
      }

    const ddhandleSelectBranchFrom=(e)=>{
        setBranchFromVal(e)
    } 

    // Get branch id from user input
    for (var i =0; i < branches?.length; i++) {
            if (branchFrom === '') {
                if (location.state.ddbranchfrom === branches[i].city) {
                    branchId=branches[i].branchId;   
                } 
               
            } 
            else {
                for (var i =0; i < branches.length; i++) {
                    if (branchFrom === branches[i].city){
                        branchId=branches[i].branchId;    
                    }
                }
            } 
    }
    
    // Search Button handler
    const handleButton=(e)=>{
        setBranchTo(branchTo => branchToVal)
        setBranchFrom(branchFrom => branchFromVal)

        const itemRemove = [];        
        rentals.map((r) => {            
            if((r.dateFrom <= rdateFromVal && rdateToVal <= r.dateTo) ||
            (r.dateTo >= rdateFromVal && rdateToVal >= r.dateTo) ||
            (r.dateFrom >= rdateFromVal && rdateToVal >= r.dateFrom) ||
            (r.dateFrom >= rdateFromVal && rdateToVal >= r.dateTo)) {

                itemRemove.push(r.car)
            }        
        })
        const carAvailable = cars.filter(prd => !itemRemove.includes(prd.carId))
       
        setFiltered(carAvailable)
        
        setRdateTo(rdateToVal)
        setRdateFrom(rdateFromVal)  
    }
    

    // Find availability of cars with user input value from the home page 
    console.log(Object.keys(filtered).length)
    if (Object.keys(filtered).length === 0 && Object.keys(cars).length !== 0 ){ 

        const itemRemove = [];        
        rentals.map((r) => {            
            if((r.dateFrom <= rdateFromVal && rdateToVal <= r.dateTo) ||
            (r.dateTo >= rdateFromVal && rdateToVal >= r.dateTo) ||
            (r.dateFrom >= rdateFromVal && rdateToVal >= r.dateFrom) ||
            (r.dateFrom >= rdateFromVal && rdateToVal >= r.dateTo)) {

                itemRemove.push(r.car)
            }        
        })
        const carAvailable = cars.filter(prd => !itemRemove.includes(prd.carId))
       
        setFiltered(carAvailable)
    }

    // for filter bar
    // get unique value of colour and fuel type
    let uniqueColor = [...new Set(cars.map(item=>item.colour))];
    uniqueColor = ["All"].concat(uniqueColor);
    let uniqueFuel = [...new Set(cars.map(item=>item.fuelType))];
    uniqueFuel = ["ALL"].concat(uniqueFuel);
    let uniqueMile = [...new Set(cars.map(item=>(item.mileage*1)))];
    var maxVal = Math.max.apply(Math, uniqueMile);
 
    // dropdown handler 
    const handleColor=(e)=>{
        if (e === "All"){
           setFiltered(cars)
        }
        else{
            for (var cl=0; cl < cars?.length; cl++) {          
                setFiltered(cars.filter(d => d.colour === e));            
            }
        }
        setColour(e)     
    } 
    const handleFuel=(e)=>{
        if (e === "ALL"){
            setFiltered(cars)
         }
         else{
             for (var cl=0; cl < cars?.length; cl++) {          
                 setFiltered(cars.filter(d => d.fuelType === e));            
             }
         }
        setFuel(e)     
    } 
    const handleSlider=(e)=>{
        console.log(e)
        setmaxMile(e)
        const itemRemove = [];   
        cars.map((c) => {
            if ((c.mileage*1) <= e) {
                itemRemove.push(c.carId)
            }         
        })
        const carAvailable = cars.filter(prd => itemRemove.includes(prd.carId))
        setFiltered(carAvailable)
    
        
    }
    
    return (
        <div>
            <Header/>  

            <div className='background'>
            <div className='top-search'>
                <Dropdown style={{margin: "0.5% 2vw 5px 6vw"}} onSelect={ddhandleSelectBranchFrom}>
                    <Dropdown.Toggle 
                        variant="lightgrey" id="dropdown-custom5" 
                        style={{backgroundColor: "#D3D3D3", width:"13vw", textAlign: "start", border: "1.5px solid lightgrey"}}>
                        {<AiFillCar/>} {branchFromVal? (
                                "From: " + branchFromVal
                            ):(
                                "From: " + location.state.ddbranchfrom)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{width:"85%",}} className="dropdown-style">
                        {branches.map((e, index) => {
                            return <Dropdown.Item eventKey={e.city} key={index}>{e.city}</Dropdown.Item>;       
                        })}
                    </Dropdown.Menu>
                </Dropdown>
                
                {setDropdownVal()}
                
                <Dropdown style={{margin:"0.5% 0 5px 0"}} onSelect={ddhandleSelectBranchTo} >
                    <Dropdown.Toggle variant="lightgrey" id="dropdown-custom2" 
                                     style={{backgroundColor: "#D3D3D3", width:"13vw", textAlign: "start", border: "1.5px solid lightgrey"}}>
                        {<AiFillCar/>}{branchToVal?
                        (
                            "To: " + branchToVal
                        ):(
                            "To: " + location.state.ddbranchfrom
                        )
                        }
                    </Dropdown.Toggle >
                    <Dropdown.Menu  style={{width:"85%", position: "relative"}}>
                        {branches.map((e, index) => {
                        return <Dropdown.Item eventKey={e.city} key={index}>{e.city}</Dropdown.Item>;       
                        })}
                </Dropdown.Menu>
            </Dropdown>
 
            <FormGroup style={{width: "13vw", margin:"0.5% 1% 1% 5%"}}>
                <Input 
                    type="date"
                    id="startDate"
                    name="startDate"
                    //defaultValue={location.state.inputdatefrom}
                    value={rdateFromVal}
                    onChange={handleSelectDateFrom}
                    style={{backgroundColor: "#D3D3D3"}} 
                />
            </FormGroup>

            <FormGroup style={{width: "13vw", margin:"0.5% 1% 1% 1%"}}>
                <Input 
                    type="date"
                    id="endDate"
                    name="endDate"
                    //defaultValue={location.state.inputdateto}
                    value={rdateToVal}
                    onChange={handleSelectDateTo}
                    style={{backgroundColor: "#D3D3D3"}}
                />
            </FormGroup> 
             
            <button 
                className="btn mr-2"
                style={{display: "flex", backgroundColor:"#E65700", color:"white", width: "40px", height: "40px", margin: "0.5% 0% 1% 4%"}}
                onClick={handleButton}>
                    <div style={{display: "flex", width: "40px", height: "40px", fontSize: "20px", marginTop: "30%", marginLeft: "-20%"}}>
                        {<AiOutlineSearch/>}
                    </div>
            </button>               
        </div> 
        
        <div className='filtering'>
            <div style={{fontWeight: "bold", margin: "3vh", fontSize: "20px"}}>Filters</div>
            <div className="hl"></div>
            
            <Dropdown style={{margin: "3vh 3vw 10px 1vw"}} onSelect={handleColor}>
            <Label>Colour</Label>
            <Dropdown.Toggle 
                variant="lightgrey" id="dropdown-custom6" 
                style={{backgroundColor: "#D3D3D3", width:"10vw", textAlign: "start", border: "1.5px solid lightgrey"}}>
                {colour? (
                     colour.toUpperCase()
                 ):(
                     "Choose from")}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{width:"85%"}}>
                    {uniqueColor.map((e, index) => {
                        return <Dropdown.Item eventKey={e} key={index}>{e.toUpperCase()}</Dropdown.Item>;       
                    })}
                </Dropdown.Menu>
            </Dropdown>

            <Dropdown style={{margin: "8vh 3vw 10px 1vw"}} onSelect={handleFuel} >
            <Label>Fuel Type</Label>
             <Dropdown.Toggle 
                 variant="lightgrey" id="dropdown-custom7" 
                 style={{backgroundColor: "#D3D3D3", width:"10vw", textAlign: "start", border: "1.5px solid lightgrey"}}>
                {fuel? (
                    fuel
                ):( 
                    "Choose from" 
                    )}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{width:"85%"}}>
                    
                    {uniqueFuel.map((e, index) => {
                    return <Dropdown.Item eventKey={e} key={index}>{e}</Dropdown.Item>;       
                    })}
                </Dropdown.Menu>
            </Dropdown>
            <Label style={{margin:"8vh 3vw 0 3vw"}}>Mileage</Label>
            <ReactSlider 
                min={0}
                max={maxVal>= 0?(
                    maxVal * 1.5
                    ):(
                    0
                )}
                defaultValue={maxVal>= 0?(
                    maxVal * 1.5
                    ):(
                    0
                )}
                onChange={handleSlider}
                className="horizontal-slider"
                thumbClassName="example-thumb"
                trackClassName="example-track"
                renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            />
        </div>  
            
            <div style={{display:"flex"}}>
            {(filtered?.length > 0)
                ? (
                    <div style={{marginTop: "10vh"}}>                       
                        {filtered.map((car) => {                            
                            return branchId===car.branch
                                ? (
                                    <CarCards car={car} branchfrom={branchFrom} branchto ={branchTo} datef={rdateFrom} datet={rdateTo}/>                                
                                ) : null                            
                        })}   
                                        
                    </div>
                ) : ( 
                    <div style={{width: "50vw", height: "20vh", margin: "95px 15px 15px 37vw", backgroundColor: "#FFF", borderRadius: "20px", boxShadow: "5px 5px 5px #D3D3D3"}}>
                        <h2 style={{marginLeft: "30%", marginRight: "20%", marginTop: "5vh", color: "red"}}>No cars found</h2>
                        <br></br>
                        <h5 style={{marginLeft: "30%", marginRight: "10%", marginTop: "5vh"}}>Please try to search again. </h5>
                    </div>
                )       
            } 
            
            </div>

                          
            </div>      
        </div>
    )
}



export default CustomerView;