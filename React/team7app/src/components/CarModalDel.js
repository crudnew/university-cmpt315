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

export default class CarModal extends Component {
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
            //Next the Form Group creates the headers, input fields, and background text for the Student ID.
            //at the bottom the Delete button is rendered inside of the footer
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>Delete Car by ID</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="id">Car ID</Label>
                            <Input 
                              type="integer"
                              name="id"
                              value={this.state.activeItem.carId}
                              onChange={this.handleChange}
                              placeholder="Enter Student ID to Delete"
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={() => onSave(this.state.activeItem)}>
                        Delete
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}