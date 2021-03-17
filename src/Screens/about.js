import React, { useState, Component } from 'react';
import Logo from '../Images/oau-uniconne.jpg';
import Header from './header';
import Footer from './footer';
import { Row, Col } from 'reactstrap';
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faTwitter } from '@fortawesome/free-brands-svg-icons';


var date = new Date()
date.getFullYear()
var year = date.toString()

class About extends Component {
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
                <Header id={this.state.id} />
                <div className="container-fluid login-con">
                    <div>
                        <div>
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
                            <h6 className="text">OAU-Connect</h6>
                            <p className="text">Welcome to OAU-Connect, where you connect with fellow students on OAU campus.</p>
                            <p className="text">With the advent of the online class programme, connecting with other students has become a challenge even for the online class programme! That's why OAU-Connect was created, to bridge the gap of disconnection</p>
                            <p className="text">OAU-Connect is exclusive to OAU students. However, we are working to make a version available for other schools as soon as possible! You can reach out to John for details on other schools</p>
                            <p className="text">Hope you enjoy your time on campus! Kind regards .</p>
                            <span className="quote text">~John Alalade
                            <div className="quote-icons"><a href="https://twitter.com/@Agathos7" target="_blank"><FontAwesomeIcon icon={faTwitter} size='lg'></FontAwesomeIcon></a>
                                    <a href="mailto:johnalalade3@gmail.com">
                                        <FontAwesomeIcon icon={faGooglePlusG} size='lg' color="red"></FontAwesomeIcon></a></div></span>
                        </div>

                    </div>
                </div>
                <Footer id={this.state.id} />
            </div>
        );
    }
}

export default About;
