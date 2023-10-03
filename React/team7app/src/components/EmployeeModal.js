import React, { Component, useEffect, useState } from "react";
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
    Label,} from "reactstrap";

        // const o = [
        //     { value: 'blues', label: 'Blues' },
        //     { value: 'rock', label: 'Rock' },
        //     { value: 'jazz', label: 'Jazz' },
        //     { value: 'orchestra', label: 'Orchestra' } 
        // ];

// const GetBranches = () =>{
//     const[branchesList, setBranchesList] = useState([]);

//     useEffect(() => {
//         getCLients();
//   }, []);

//     const getCLients = async() =>{
//         const response = await fetch('http://localhost:8000/api/branch/');
//         const data = await response.json();
//         console.log(data);
//         // setBranchesList(data.map((d) => {{d.city:d.branchId}}));
//         setBranchesList(data);
//     }
//     return branchesList;
// }

export default class EmployeeModal extends Component {
    //setup that we started back in App.js. allows the page to render correctly
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            branchesList: []
        };

        this.createSelectBranch = this.createSelectBranch.bind(this);
    }

    componentDidMount() {
        this.getBranches();
    }

    getBranches = async() =>{
        const response = await fetch('http://localhost:8000/api/branch/');
        const data = await response.json();
        this.setState({
            branchesList : data
       })
       console.log(this.state.branchesList);
    }

    //handles any changes to the values that could occur
    handleChange = e => {
        let { name, value } = e.target;
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
    };

    createSelectBranch(){
        let items = [];
        // for (let i = 0; i <= this.state.activeItem.branch.maxValue; i++) {
        //     items.push(<option key={i} value={i}>{i}</option>);
        // }

        
        items.push(<option value={''}>Select a branch</option>);
        items.push(<option value={'4'}>Vancouver</option>);
        items.push(<option value={'2'}>Calgary</option>);
        return items;
    }
    onDropdownSelected(e) {
        this.setState({
             branch : parseInt(e.target.value)
            //branch : e.target.value
        })
    }


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
                <ModalHeader toggle={toggle}>Add New Employee</ModalHeader>
                <ModalBody>
                    <Form>  
                        <FormGroup>
                        <Label for="name">Name</Label>
                            <Input 
                              type="text"
                              name="firstName"
                              value={this.state.activeItem.firstName}
                              onChange={this.handleChange}
                              placeholder="First Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="lastName"
                              value={this.state.activeItem.lastName}
                              onChange={this.handleChange}
                              placeholder="Last Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">Branch</Label>
                                <Input type="select" name="branch" id="exampleSelect" onChange={this.handleChange}>
                                    <option value={''}>Select a Branch</option>
                                    
                                    {
                                        this.state.branchesList.map((opts, i)=> <option value={opts.branchId} key={i}>{opts.city}</option>)
                                    }
                                </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                            type="email"
                            name="email"
                            value={this.state.activeItem.email}
                            onChange={this.handleChange}
                            placeholder="Enter Customer Email!"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="password"
                              value={this.state.activeItem.password}
                              onChange={this.handleChange}
                              placeholder="Password"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="salt"
                              value={this.state.activeItem.salt}
                              onChange={this.handleChange}
                              placeholder="Salt"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                              type="integer"
                              name="salary"
                              value={this.state.activeItem.salary}
                              onChange={this.handleChange}
                              placeholder="Salary"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="rank"
                              value={this.state.activeItem.rank}
                              onChange={this.handleChange}
                              placeholder="Rank"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dob">Date of Birth</Label>
                            <Input 
                              type="date"
                              name="dob"
                              value={this.state.activeItem.dob}
                              onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Label for="province">Address</Label>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="province"
                              value={this.state.activeItem.province}
                              onChange={this.handleChange}
                              placeholder="Province"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="city"
                              value={this.state.activeItem.city}
                              onChange={this.handleChange}
                              placeholder="City"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="postalCode"
                              value={this.state.activeItem.postalCode}
                              onChange={this.handleChange}
                              placeholder="Postal Code"
                            />  
                        </FormGroup>
                        <Label for="street">Street</Label>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="streetNumber"
                              value={this.state.activeItem.streetNumber}
                              onChange={this.handleChange}
                              placeholder="Street Number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="streetName"
                              value={this.state.activeItem.streetName}
                              onChange={this.handleChange}
                              placeholder="Street Name"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="unitNumber"
                              value={this.state.activeItem.unitNumber}
                              onChange={this.handleChange}
                              placeholder="Unit Number"
                            />
                        </FormGroup>
                        <Label for="phoneNumber1">Phone Number</Label>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="phoneNumber1"
                              value={this.state.activeItem.phoneNumber1}
                              onChange={this.handleChange}
                              placeholder="Phone Number"
                            />
                        </FormGroup>  
                        <FormGroup>
                        <Input 
                            type="text"
                            name="phoneNumber2"
                            value={this.state.activeItem.phoneNumber2}
                            onChange={this.handleChange}
                            placeholder="Phone Number"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="phoneNumber3"
                              value={this.state.activeItem.phoneNumber3}
                              onChange={this.handleChange}
                              placeholder="Phone Number"
                            />
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