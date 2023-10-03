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

export default class CustomModal extends Component {
    //setup that we started back in App.js. allows the page to render correctly
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
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
                <ModalHeader toggle={toggle}>Add New Customer</ModalHeader>
                <ModalBody>
                    <Form>
                    <Label for="name">Name</Label>
                        <FormGroup>
                            <Label for="firstName">First Name</Label>
                            <Input 
                              type="text"
                              name="firstName"
                              value={this.state.activeItem.firstName}
                              onChange={this.handleChange}
                              placeholder="Enter Customer's First Name!"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="lastName">Last Name</Label>
                            <Input 
                              type="text"
                              name="lastName"
                              value={this.state.activeItem.lastName}
                              onChange={this.handleChange}
                              placeholder="Enter Customer's Last Name!"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="driversLicense">Driver's License</Label>
                            <Input 
                              type="text"
                              name="driversLicense"
                              value={this.state.activeItem.driversLicense}
                              onChange={this.handleChange}
                              placeholder="Enter Customer's License Number!"
                            />
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
                            <Label for="dob">Date of Birth</Label>
                            <Input 
                              type="date"
                              name="dob"
                              value={this.state.activeItem.dob}
                              onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="goldMember">Gold Member</Label>
                            <Input 
                                type="text" name='goldMember' list="memtype"
                                value={this.state.activeItem.goldMember} 
                                onChange={this.handleChange}/>
                            <datalist id="memtype">
                              <option value="Gold"></option>
                              <option value="Regular"></option>
                            </datalist>
                            

                        </FormGroup>
                        <FormGroup>
                            <Label for="province">Province</Label>
                            <Input 
                              type="text"
                              name="province"
                              value={this.state.activeItem.province}
                              onChange={this.handleChange}
                              placeholder="Enter Customer's Province!"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="city">City</Label>
                            <Input 
                              type="text"
                              name="city"
                              value={this.state.activeItem.city}
                              onChange={this.handleChange}
                              placeholder="Enter Customer's City!"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="postalCode">Postal Code</Label>
                            <Input 
                              type="text"
                              name="postalCode"
                              value={this.state.activeItem.postalCode}
                              onChange={this.handleChange}
                              placeholder="Enter Customer's Postal#!"
                            />  
                        </FormGroup>
                        <Label for="street">Street</Label>
                        <FormGroup>
                            <Label for="streetNumber">Street Number</Label>
                            <Input 
                              type="text"
                              name="streetNumber"
                              value={this.state.activeItem.streetNumber}
                              onChange={this.handleChange}
                              placeholder="Enter Customer's Street#!"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="streetName">Street Name</Label>
                            <Input 
                              type="text"
                              name="streetName"
                              value={this.state.activeItem.streetName}
                              onChange={this.handleChange}
                              placeholder="Enter Customer's Street Name!"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="unitNumber">Unit Number</Label>
                            <Input 
                              type="text"
                              name="unitNumber"
                              value={this.state.activeItem.unitNumber}
                              onChange={this.handleChange}
                              placeholder="Enter Customer's Unit#!"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phoneNumber1">Phone Number1</Label>
                            <Input 
                              type="text"
                              name="phoneNumber1"
                              value={this.state.activeItem.phoneNumber1}
                              onChange={this.handleChange}
                              placeholder="Enter Customer's Phone#!"
                            />
                        </FormGroup>  
                        <FormGroup>
                        <Label for="phoneNumber2">Phone Number2</Label>
                        <Input 
                            type="text"
                            name="phoneNumber2"
                            value={this.state.activeItem.phoneNumber2}
                            onChange={this.handleChange}
                            placeholder="Enter Customer's Phone#!"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phoneNumber3">Phone Number3</Label>
                            <Input 
                              type="text"
                              name="phoneNumber3"
                              value={this.state.activeItem.phoneNumber3}
                              onChange={this.handleChange}
                              placeholder="Enter Customer's Phone#!"
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