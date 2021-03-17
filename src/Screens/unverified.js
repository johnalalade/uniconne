import React, { useState, Component } from 'react';
import Logo from '../Images/oau-logo.jpg';
import { Container, Row, Col, Form, Button, Progress } from 'reactstrap';
import './style.css';
import axios from './axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


var date = new Date()
date.getFullYear()
var year = date.toString()

class UnVerified extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    log = (ev) => {
        ev.preventDefault();
        window.location = '/login';
    }
    

   
    render() {

        return (
            <div>
                <div className="container-fluid login-con">
                    <Row>
                        <Col md="6">
                            <div className="about-logo">
                                <img src={Logo} className="img" align="center" alt="logo" />
                                <h2 className="text" align="center">Welcome To OAU-Connect,</h2>
                                <p className="lead text" align="center">connect with students on campus...</p>
                                {/* <p className="lead text" align="center">*Created By John Alalade</p> */}
                                <span align="center" className="quote lead text">*Created By John Alalade
                            <div className="lead text quote-icons"><a href="https://twitter.com/@Agathos7" target="_blank"><FontAwesomeIcon icon={faTwitter} size='lg'></FontAwesomeIcon></a>
                                        <a href="mailto:johnalalade3@gmail.com">
                                            <FontAwesomeIcon icon={faGooglePlusG} size='lg' color="red"></FontAwesomeIcon></a></div></span>
                            </div>
                        </Col>
                        <Col md="6">
                            <h6 className="text">Your account is not yet verfied, please check your email to verify your account. Then go to login page.</h6>

                            <br/>
                            <button onClick={this.log} className="btn btn-success">Login</button>
                        </Col>
                    </Row>
                </div>
                <div className="bottom">
                    <p align="center"><b>Uniconnect Team &#169; {year.slice(10, 15)}</b></p>
                </div>
            </div>
        );
    }
}

export default UnVerified;
