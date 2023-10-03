import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import Modal from "./CustomerModal";
import ModalDel from  "./CustomerModalDel";
import axios from "axios";
import { Link } from "react-router-dom";

//This Class is the blank structure for the Model that was created in api\models.py
//It is used to read in the information from the MySQL backend and to write out to it
//for editing and deleting.
class Customer extends Component {
    state = {
      activeItem: {
        id: "",
        firstName: "",
        lastName: "",
        driversLicense: "",
        email: "",
        dob: "",
        goldMember: "",
        province: "",
        city: "",
        postalCode: "",
        streetNumber: "",
        streetName: "",
        unitNumber: "", 
        phoneNumber1: "",
        phoneNumber2: "",
        phoneNumber3: "",
       
      },
      //a blank list where the entries from the database will be stored into later
      custList: []
    };
    
    //A method that can be applied to this. It calls the refreshlist method
    componentDidMount() {
      this.refreshList();
    }
  
    //This Method sends a GET request to the Django Rest-API to request the latest updates to the list
    refreshList = () => {
      axios
        //get from the address provided
        .get("/api/customer/")
        //wait on the response and update the state of the list
        .then((res) => {
          this.setState({custList: res.data})
        })
        //a catch statement if there is an error returned from the server
        .catch((err) => console.log(err));
    };
    
    //A toggle to change the state of the Modal window (the Add New Student popup window)
    //In one state the window is visible, in the other state the window is not visible
    //This toggle also adds the "X" to the uppper right hand corner of the window
    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };

    //The Toggle for the ModalDel window (the Delete Student window). Same functionality as above.
    toggledel = () => {
      this.setState({ modaldel: !this.state.modaldel });
    };
    
    //A Method that is called when new data needs to be POST'ed to the Django server.
    handleSubmit = (item) => {
      //toggle the window closed
      this.toggle();
      
      if (item.goldMember==='Gold') {
        item.goldMember = true;
      } else if(item.goldMember==='Regular') {
        item.goldMember = false;
      }
      //check to see if the item ID already exists
      if (item.id) {
        //if it does, update the values in the database with the newly added values
        axios
          //get from the address provided       
          .put(`/api/customer/${item.id}/`, item)
          //refresh the list
          .then((res) => this.refreshList());
        return;
      }
      
      //If the item ID does not already exist, create a brand new entry in the Database
        axios
        .post("/api/customer/", item)
        .then((res) => this.refreshList());
    };
    
    //The Method that is called when a Delete call is made to the server
    //this removes the entry based off of the item.id that is passed into it
    handleDelete = (item) => {
      //toggle the delete window closed
      this.toggledel();
      axios
        //send the Delete request to the address provided with the item ID selected by the user
        .delete(`/api/customer/${item.id}/`)
        .then((res) => this.refreshList());
    };
    //This method creates the Add Student popup when called. It uses the Modal from src/components/Modal.js
    //as the guidelines on what to place and where it should be placed
    createItem = () => {
      const item = {
        id: "",
        firstName: "",
        lastName:"",
        driversLicense:"",
        email: "", 
        dob:"",
        goldMember:"",
        province:"",
        city:"",
        postalCode:"",
        streetNumber:"",
        streetName:"",
        unitNumber:"",
        phoneNumber1: "",
        phoneNumber2: "",
        phoneNumber3: ""};
        
      this.setState({ activeItem: item, modal: !this.state.modal });
    };

    //This method creates the Edit Student popup when called. It uses the Modal from src/components/Modal.js
    //as the guidelines on what to place and where it should be placed. it is the same layout as the Add Student
    //above, but this one will have the existing data filled in.
    editItem = (item) => {
      this.setState({ activeItem: item, modal: !this.state.modal });
    };

    //This method creates the Delete Student popup when called. It uses the Modal from src/components/ModalDel.js
    //as the guidelines on what to place and where it should be placed
    deleteItem = () => {
      const item = {
      id: "",
      firstName: "",
      lastName:"",
      driversLicense:"",
      email: "",
      dob:"",
      goldMember:"",
      province:"",
      city:"",
      postalCode:"",
      streetNumber:"",
      streetName:"",
      unitNumber:"",
      phoneNumber1:"",
      phoneNumber2:"",
      phoneNumber3:""};
      this.setState({ activeItem: item, modaldel: !this.state.modaldel });
    };
    
    //When called this Method will visually render the list of students. This includes ID, Name, and Email.
    //everything is created inside of the return() statement.
    renderItems = () => {
      //creates a list inside the method that can store the items from studList while they are written out
      const newItems = this.state.custList;
      //inside of the return is where the output is given shape and form.
      //start by defining the header for the table with all of the columns and their titles
      //after that define the body
      //inside create a smaller sub-function that will loop through the list above (newItems) and populates the table
      //with all of the information that you need to display
      //in the final column add in a Button that will be used to Edit the student information
      return ( (
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Driver's License</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>GoldMember</th>
              <th>Province</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Street</th>
              <th>Phone Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {newItems.map((item) => {
              return(
                <tr>
                  <td>{item.id}</td>
                  <td>{item.lastName}, {item.firstName}</td>
                  <td>{item.driversLicense}</td>
                  <td>{item.email}</td>
                  <td>{item.dob}</td>
                  <td>{String(item.goldMember)}</td>               
                  <td>{item.province}</td>
                  <td>{item.city}</td>
                  <td>{item.postalCode}</td>
                  <td>{item.unitNumber} {item.streetNumber} {item.streetName} </td>
                  <td>{item.phoneNumber1}<br/>
                      {item.phoneNumber2}<br/>
                      {item.phoneNumber3}</td>
                  <td><button 
                        className="btn btn-secondary mr-2"
                        onClick={() => this.editItem(item)}>Edit
                      </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ));
    };

    /*This is the render that creates the actual webpage. all above methods will be called from inside of here
      when it is appropriate for them to execute. 
      First the page is given shape, the Header is placed. 
      Next the page is separated so that the card (the box) where everything else will be is placed. 
      Once the card is created the buttons are created and placed at the top. The buttons are given function and
      the "onClick" command is set to call the appropriate method. 
      Under the buttons there is a header to explain the information fields that will come next.
      Next the renderItems method is called. This will fill the remaining area with the information that has been
      pulled from the Django database and is stored in a local class (studList).
      At the very end is where the Modal states (the popup windows) are set up and hidden, awaiting the button to 
      activate them.
    */
    render() {
      //everything is inside of a return so that it is all rendered on the webpage.
      return (
        <main className="content">
        <h1 className="text-black text-uppercase text-center my-4">Customer Database</h1>
        <div className="row">
          <div className="col-md-12 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="d-flex justify-content-between">
                <button onClick={this.refreshList} className="btn btn-primary mr-2">Refresh List</button>
                <button onClick={this.createItem} className="btn btn-success mr-2">Add Customer</button>
                <button onClick={this.deleteItem} className="btn btn-danger mr-2">Delete Customer</button>
              </div>
              <div>
                <ul className="list-group list-group-flush">
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          /* calls the Modal component to render the Add Student popup*/
          <Modal
          /*activates it on the page */
            activeItem={this.state.activeItem}
            /*toggles it to be visible*/
            toggle={this.toggle}
            /*When the Save button is clicked, calls the handleSubmit method to send the appropriate POST request */
            onSave={this.handleSubmit}
          />
        ): null}
        {this.state.modaldel ? (
          /* calls the ModalDel component*/
          <ModalDel
          /*activates it on the page */
            activeItem={this.state.activeItem}
            /*toggles it to be visible*/
            toggle={this.toggledel}
            /*When the Save button is clicked, calls the handleDelete method to send the DELETE request */
            onSave={this.handleDelete}
          />
        ): null}
      </main>
      )
    }
  }
//closing statement
export default Customer;