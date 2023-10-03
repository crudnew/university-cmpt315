import React, { Component } from "react"
import Table from 'react-bootstrap/Table'
import Modal from "./CarModal";
import ModalDel from  "./CarModalDel";
import axios from "axios";
import { Link } from "react-router-dom";

//This Class is the blank structure for the Model that was created in api\models.py
//It is used to read in the information from the MySQL backend and to write out to it
//for editing and deleting.
class Car extends Component {
    state = {
      activeItem: {
        carId: "",
        carType: "",
        branch: "",
        manufacturer: "",
        model: "",
        fuelType: "",
        colour: "",
        licencePlate: "",
        status: "",
        mielage: "",        
      },
      //a blank list where the entries from the database will be stored into later
      carList: []
    };
    
    //A method that can be applied to this. It calls the refreshlist method
    componentDidMount() {
      this.refreshList();
    }
  
    //This Method sends a GET request to the Django Rest-API to request the latest updates to the list
    refreshList = () => {
      axios
        //get from the address provided
        .get("/api/car/")
        //wait on the response and update the state of the list
        .then((res) => {
          this.setState({carList: res.data})
        })
        //a catch statement if there is an error returned from the server
        .catch((err) => console.log(err));
    };
    
    //A toggle to change the state of the Modal window (the Add New Student popup window)
    //In one state the window is visible, in the other state the window is not visible
    //This toggle also adds the "X" to the uppper right hand corner of the window
    toggle = (item) => {
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

      //check to see if the item ID already exists
      if (item.carId) {
        console.log("status", item.status)
        //if it does, update the values in the database with the newly added values
        axios
          //get from the address provided       
          .put(`/api/car/${item.carId}/`, item)
          //refresh the list
          .then((res) => this.refreshList());
        return;
      }
      
      //If the item ID does not already exist, create a brand new entry in the Database
        axios
        .post("/api/car/", item)
        .then((res) => this.refreshList());
    };
    
    //The Method that is called when a Delete call is made to the server
    //this removes the entry based off of the item.id that is passed into it
    handleDelete = (item) => {
      //toggle the delete window closed
      this.toggledel();
      axios
        //send the Delete request to the address provided with the item ID selected by the user
        .delete(`/api/car/${item.carId}/`)
        .then((res) => this.refreshList());
    };
    //This method creates the Add Student popup when called. It uses the Modal from src/components/Modal.js
    //as the guidelines on what to place and where it should be placed
    createItem = () => {
      const item = {
        carId: "",
        carType: "",
        branch: "",
        manufacturer: "",
        model: "",
        fuelType: "",
        colour: "",
        licencePlate: "",
        status: "",
        mielage: ""};
        
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
        carId: "",
        carType: "",
        branch: "",
        manufacturer: "",
        model: "",
        fuelType: "",
        colour: "",
        licencePlate: "",
        status: "",
        mielage: ""};
      this.setState({ activeItem: item, modaldel: !this.state.modaldel });
    };
    
    //When called this Method will visually render the list of students. This includes ID, Name, and Email.
    //everything is created inside of the return() statement.
    renderItems = () => {
      //creates a list inside the method that can store the items from studList while they are written out
      const newItems = this.state.carList;
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
              <th>Manufacturer</th>
              <th>Type</th>
              <th>Branch</th>
              <th>Model</th>
              <th>Fuel Type</th>
              <th>Colour</th>
              <th>Licence Plate</th>
              <th>Status</th>
              <th>Mileage</th>
    
              <th></th>
            </tr>
          </thead>
          <tbody>
            {newItems.map((item) => {
              return(
                <tr>
                  <td>{item.carId}</td>
                  <td>{item.manufacturer}</td>
                  <td>{item.carType}</td>
                  <td>{item.branch}</td>
                  <td>{item.model}</td>
                  <td>{item.fuelType}</td>
                  <td>{item.colour}</td>    
                  <td>{item.licencePlate}</td>
                  <td>{item.status}</td>
                  <td>{item.mileage}</td>
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
        <h1 className="text-black text-uppercase text-center my-4">Car Database</h1>
        <div className="row">
          
          <div className="col-md-12 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="d-flex justify-content-between">
                <button onClick={this.refreshList} className="btn btn-primary mr-2">Refresh List</button>
                <button onClick={this.createItem} className="btn btn-success mr-2">Add Car</button>
                <button onClick={this.deleteItem} className="btn btn-danger mr-2">Delete Car</button>
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
export default Car;