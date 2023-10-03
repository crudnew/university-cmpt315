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

} from "reactstrap";

export default class CarTypeModal extends Component {
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
                <ModalHeader toggle={toggle}>Add New Car Type</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Input 
                                type="text"
                                name="description"
                                value={this.state.activeItem.description}
                                onChange={this.handleChange}
                                placeholder="Description"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="integer"
                                name="dailyCost"
                                value={this.state.activeItem.dailyCost}
                                onChange={this.handleChange}
                                placeholder="Daily Cost"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="integer"
                                name="weeklyCost"
                                value={this.state.activeItem.weeklyCost}
                                onChange={this.handleChange}
                                placeholder="Weekly Cost"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                            type="integer"
                            name="monthlyCost"
                            value={this.state.activeItem.monthlyCost}
                            onChange={this.handleChange}
                            placeholder="Monthly Cost"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="integer"
                                name="lateFee"
                                value={this.state.activeItem.lateFee}
                                onChange={this.handleChange}
                                placeholder="Late Fee"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input 
                                type="integer"
                                name="changeBranchFee"
                                value={this.state.activeItem.changeBranchFee}
                                onChange={this.handleChange}
                                placeholder="Change Branch Fee"
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