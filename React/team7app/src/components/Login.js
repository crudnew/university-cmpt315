/*import React, { Component, useEffect, useState } from "react";
import axios from "axios";

import {Modal, ModalBody} from 'react-bootstrap';
import { Form, FormGroup, Input } from "reactstrap";


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginErrors: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        const { username, password } = this.state;

        axios
            .post(
                "http://localhost:3000/sessions",
                {
                    user: {
                        username: username,
                        password: password
                    }
                },
                { withCredentials: true }
            )
            .then(response => {
                console.log("res from login", response);
            })
            .catch(error => {
                console,log("login error", error);
            });
        event.preventDefault();
    }

    render() {

        return(
            
            <div>
            <Form>
              <FormGroup>
                <Input
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleChange}
                />
                <Input
                type="text"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                />
                <button type='submit'>Login</button>
              </FormGroup>
            </Form>
            </div>
        );
    }
}*/