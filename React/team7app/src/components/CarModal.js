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
    Label, 
 
} from "reactstrap";

export default class CarModal extends Component {
    //setup that we started back in App.js. allows the page to render correctly
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
            branchesList: [],
            carTypesList: []
        };
    }

    componentDidMount() {
        this.getBranches();
        this.getcarTypes();
    }

    getBranches = async() =>{
        const response = await fetch('http://localhost:8000/api/branch/');
        const branchData = await response.json();
        this.setState({
            branchesList : branchData
       })
       //console.log(this.state.branchesList);
    }

    getcarTypes = async() =>{
        const response = await fetch('http://localhost:8000/api/cartype/');
        const carTypeData = await response.json();
        this.setState({
            carTypesList : carTypeData
       })
       console.log(this.state.carTypesList);
    }
    //handles any changes to the values that could occur
    handleChange = e => {
        let { name, value } = e.target;
        const activeItem = { ...this.state.activeItem, [name]: value };
        this.setState({ activeItem });
        //console.log(activeItem)
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
                <ModalHeader toggle={toggle}>Add New Car</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup> <Label for="exampleSelect">Manufacturer</Label>
                            <Input 
                                type="text"
                                name="manufacturer"
                                value={this.state.activeItem.manufacturer}
                                onChange={this.handleChange}
                                placeholder="Manufacturer"
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
                        <Label for="exampleSelect">Car Type</Label>
                                <Input type="select" name="carType" id="exampleSelect" onChange={this.handleChange}>
                                    <option value={''}>Select a Car Type</option>
                                    {
                                        this.state.carTypesList.map((opts, i)=> <option value={opts.typeId} key={i}>{opts.description}</option>)
                                    }
                                </Input>
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="text"
                                name="model"
                                value={this.state.activeItem.model}
                                onChange={this.handleChange}
                                placeholder="Model"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="text"
                                name="fuelType"
                                value={this.state.activeItem.fuelType}
                                onChange={this.handleChange}
                                placeholder="Fuel Type"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                            type="text"
                            name="colour"
                            value={this.state.activeItem.colour}
                            onChange={this.handleChange}
                            placeholder="Colour"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="text"
                                name="licencePlate"
                                value={this.state.activeItem.licencePlate}
                                onChange={this.handleChange}
                                placeholder="Licence Plate"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Status</Label>
                            <select 
                            id = "status" name="status" 
                            onChange={this.handleChange}
                            value={this.state.activeItem.status}>
                                <option value = ""> -- Choose Status -- </option>
                                <option value = "available">Available</option>
                                <option value = "rented">Rented</option>
                                <option value = "maintanence">Under Maintanence</option>
                            </select>
                            
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="text"
                                name="mileage"
                                value={this.state.activeItem.mileage}
                                onChange={this.handleChange}
                                placeholder="Mileage"
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