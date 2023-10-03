import React, { Component } from "react";
//import the components that we will need for the page
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label

} from "reactstrap";

export default class RentalModal extends Component {
    //setup that we started back in App.js. allows the page to render correctly
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            carTypeList: [],
            customerList: [],
            employeeList: [],
            carList: [],
            branchesList: []
        };
    }

    componentDidMount() {
        this.getBranches();
        this.getCarTypes();
        this.getCustomers();
        this.getEmployees();
        this.getCars();
    }

    getBranches = async() =>{
        const response = await fetch('http://localhost:8000/api/branch/');
        const branchData = await response.json();
        this.setState({
            branchesList : branchData
       })
       //console.log(this.state.branchesList);
    }

    getCarTypes = async() =>{
        const response = await fetch('http://localhost:8000/api/cartype/');
        const carTypeData = await response.json();
        this.setState({
            carTypeList : carTypeData
       })
    //    console.log(this.state.carTypeList);
    }

    getCustomers = async() =>{
        const response = await fetch('http://localhost:8000/api/customer/');
        const customerData = await response.json();
        this.setState({
            customerList : customerData
       })
    //    console.log(this.state.carTypeList);
    }

    getEmployees = async() =>{
        const response = await fetch('http://localhost:8000/api/employee/');
        const employeeData = await response.json();
        this.setState({
            employeeList : employeeData
       })
    //    console.log(this.state.carTypeList);
    }

    getCars = async() =>{
        const response = await fetch('http://localhost:8000/api/car/');
        const carData = await response.json();
        this.setState({
            carList : carData
       })
    //    console.log(this.state.carTypeList);
    }

    //handles any changes to the values that could occur
    handleChange = e => {
        let { name, value } = e.target;
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    };

    //renders the visuals of the popup box.
    render() {
        //pass in the toggle and onSave values from App.js
        const { toggle, onSave } = this.props;

        return (
            //opens the window and sets the appropriate toggle
            //then the Title is added in
            //Next the Form Group creates the headers, input fields, and background text for name and email.
            //at the bottom the Save button is rendered inside of the footer
            <Modal isOpen={true} toggle={toggle} >
                <ModalHeader toggle={toggle}>Add New Rental</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                        <Label for="dob">Date From</Label>
                            <Input 
                              type="date"
                              name="dateFrom"
                              value={this.state.activeItem.dateFrom}
                              onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="dob">Date To</Label>
                            <Input 
                              type="date"
                              name="dateTo"
                              value={this.state.activeItem.dateTo}
                              onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="dob">Date Returned</Label>
                            <Input 
                              type="date"
                              name="dateReturned"
                              value={this.state.activeItem.dateReturned}
                              onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                        <Input 
                                type="text"
                                name="licensePlate"
                                value={this.state.activeItem.licensePlate}
                                onChange={this.handleChange}
                                placeholder="License Plate"
                            />
                        </FormGroup>
                        <FormGroup>
                        <Label for="exampleSelect">Car Type</Label>
                                <Input type="select" name="carType" id="exampleSelect" onChange={this.handleChange}>
                                    <option value={''}>Select car type</option>
                                    {
                                        this.state.carTypeList.map((opts, i)=> <option value={opts.typeId} key={i}>{opts.description}</option>)
                                    }
                                </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="exampleSelect">Car</Label>
                                <Input type="select" name="car" id="exampleSelect" onChange={this.handleChange}>
                                    <option value={''}>Select a Car</option>
                                    {
                                        this.state.carList.map((opts, i)=> <option value={opts.carId} key={i}>{opts.manufacturer + ' ' + opts.model}</option>)
                                    }
                                </Input>
                            

                        </FormGroup>
                        <FormGroup>
                        <Label for="exampleSelect">Customer</Label>
                                <Input type="select" name="customer" id="exampleSelect" onChange={this.handleChange}>
                                    <option value={''}>Select a Customer</option>
                                    {
                                        this.state.customerList.map((opts, i)=> <option value={opts.id} key={i}>{opts.firstName + ' ' + opts.lastName}</option>)
                                    }
                                </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="exampleSelect">Employee</Label>
                                <Input type="select" name="employee" id="exampleSelect" onChange={this.handleChange}>
                                    <option value={''}>Select an Employee</option>
                                    {
                                        this.state.employeeList.map((opts, i)=> <option value={opts.employeeId} key={i}>{opts.firstName + ' ' + opts.lastName}</option>)
                                    }
                                </Input>
                        </FormGroup>
                        <FormGroup>
                        <Label for="exampleSelect">Branch Depart</Label>
                                <Input type="select" name="branchDep" id="exampleSelect" onChange={this.handleChange}>
                                    <option value={''}>Select Departure Branch</option>
                                    {
                                        this.state.branchesList.map((opts, i)=> <option value={opts.branchId} key={i}>{opts.city}</option>)
                                    }
                                </Input>
                        </FormGroup>
                        
                        <FormGroup>
                        <Label for="exampleSelect">Arrival Branch</Label>
                                <Input type="select" name="branchArr" id="exampleSelect" onChange={this.handleChange}>
                                    <option value={''}>Select Arrival Branch</option>
                                    {
                                        this.state.branchesList.map((opts, i)=> <option value={opts.branchId} key={i}>{opts.city}</option>)
                                    }
                                </Input>
                        </FormGroup>
                       
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}