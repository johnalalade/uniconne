import React, { useState, Component } from 'react';
import Logo from '../Images/oau-logo.jpg';
import { Container, Row, Col, Form, Button, Progress } from 'reactstrap';
import './style.css';
import axios from './axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faTwitter } from '@fortawesome/free-brands-svg-icons';


var date = new Date()
date.getFullYear()
var year = date.toString()

class Password extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      message: null,
      err: '',
      loaded: 0
    }
  }
  log = (ev) => {
    ev.preventDefault();
    this.props.history.replace(`/`);
  }
  userN = (ev) => {
    let name = ev.target.value.toLowerCase();
    this.setState({ userName: name });
  }
//   pword = (ev) => {
//     let password = ev.target.value;
//     this.setState({ password: password });
//   }
  click = (ev) => {
    ev.preventDefault();

  }

  submit = (ev) => {
    ev.preventDefault();
    toast.success('Loading,  please wait');
    let user = {
      email: this.state.userName,
    }
    axios.post('/retrive', user, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        })
      }
    })
      .then((res) => {
        if (res.data.id) {
         this.setState({message: `An email has been sent to ${this.state.userName}. Chechk your mail box to reset your password. Thank you!`})
        }
        else { return }
      })
      .then((res) => { toast.error('Login Failed, Please Try Again.' + res.data.message) })

      .catch(err => { toast.error('Login Failed, Please Try Again.') })
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
            {this.state.message && <h6 className="text">{this.state.message}</h6> ||

              <div>
              <h3 className="err">{this.state.err}</h3>
              <Form onSubmit={this.submit}>
                <label for="username" className="text"> Enter Registered Email*.</label>
                <input type="text" name="username" placeholder="Enter Student Email" onChange={this.userN} value={this.state.userName} className="form-control" />
                
                <br></br>
                {this.state.loaded &&
                  <Progress max="100" color="success" value={this.state.loaded}>{Math.round(this.state.loaded, 2)}%</Progress>
                }
                <br />
                <button className="btn btn-success form-control">Retrive</button>
                <ToastContainer />

              </Form>
              <h3 className="text">Don't Have An Account?</h3>
              <Button className="btn btn-danger" onClick={this.log}>Sign up</Button>
              </div>
            }
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

export default Password;
