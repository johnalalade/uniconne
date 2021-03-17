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

class Verify extends Component {
    constructor() {
        super();
        this.state = {
            
            err: 'Verifying Account, please wait...',
            loaded: 0
        }
    }
    log = (ev) => {
        ev.preventDefault();
        this.props.history.replace(`/`);
    }
    

    componentDidMount() {

        toast.success('Loading,  please wait');
        let user = {
            id: this.props.match.params.id
        }
        axios.post('/verification', user)
            .then((res) => {
                if (res.data) {
                    this.setState({err: "Account Verified, Congratulations!"})
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('id', res.data.id)
                    this.props.history.replace(`/login`)
                }
                else { return }
            })
            .then((res) => { toast.error('Error Verifying Email, Please Try Again.' + res.data.message) })

            .catch(err => { toast.error('Error Verifying Email, Please Try Again.') })
    }

    render() {

        return (
            <div>
                <div className="container-fluid login-con">
                    <Row>
                        <Col md="6">
                            <div className="about-logo">
                                <img src={Logo} className="img" align="center" alt="logo" />
                                <h1 className="text" align="center">Welcome To OAU-Connect,</h1>
                                <p className="lead text" align="center">connect with students on campus...</p>
                                {/* <p className="lead text" align="center">*Created By John Alalade</p> */}
                                <span align="center" className="quote lead text">*Created By John Alalade
                            <div className="lead text quote-icons"><a href="https://twitter.com/@Agathos7" target="_blank"><FontAwesomeIcon icon={faTwitter} size='lg'></FontAwesomeIcon></a>
                                        <a href="mailto:johnalalade3@gmail.com">
                                            <FontAwesomeIcon icon={faGooglePlusG} size='lg' color="red"></FontAwesomeIcon></a></div></span>
                            </div>
                        </Col>
                        <Col md="6">
                            <h6 className="text">{this.state.err}</h6>
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

export default Verify;
