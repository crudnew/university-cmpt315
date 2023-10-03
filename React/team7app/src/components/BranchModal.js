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

export default class BranchModal extends Component {
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
                <ModalHeader toggle={toggle}>Add New Branch</ModalHeader>
                <ModalBody>
                    <Form>
                    <Label for="address">Address</Label>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="province"
                              value={this.state.activeItem.province}
                              onChange={this.handleChange}
                              placeholder="Province"
                            />
                            <Input 
                              type="text"
                              name="city"
                              value={this.state.activeItem.city}
                              onChange={this.handleChange}
                              placeholder="City"
                            />
                            <Input 
                              type="text"
                              name="postalCode"
                              value={this.state.activeItem.postalCode}
                              onChange={this.handleChange}
                              placeholder="Postal Code"
                            />  
                        </FormGroup>
                        <label for="street">Street</label>
                        <FormGroup>
                            <Input 
                              type="text"
                              name="streetNumber"
                              value={this.state.activeItem.streetNumber}
                              onChange={this.handleChange}
                              placeholder="Street Number"
                            />
                            <Input 
                              type="text"
                              name="streetName"
                              value={this.state.activeItem.streetName}
                              onChange={this.handleChange}
                              placeholder="Street Name"
                            />
                            <Input 
                              type="text"
                              name="unitNumber"
                              value={this.state.activeItem.unitNumber}
                              onChange={this.handleChange}
                              placeholder="Unit Number"
                            />
                        </FormGroup>
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