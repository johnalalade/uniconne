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

class Retrive extends Component {
  constructor() {
    super();
    this.state = {
        password: '',
        cpassword: '',
        passwordError: '',
        cpasswordError: '',
        err: '',
        loaded: 0
    }
  }
  log = (ev) => {
    ev.preventDefault();
    this.props.history.replace(`/`);
  }
  pword = (ev) => {
    let password = ev.target.value;
    if (this.state.password.length < 7) {
        this.setState({ passwordError: 'Password too short (8)' })
    } else {
        this.setState({ passwordError: 'Password Okay!!!' })
    }
    this.setState({ password, err:'' });
}
cpword = (ev) => {
    let cpassword = ev.target.value;
    if (this.state.password === cpassword) {
        this.setState({ cpasswordError: 'Password Match!!!' })
    } else {
        this.setState({ cpasswordError: 'Password does not match!!!' })
    }
    this.setState({ cpassword });
}
  click = (ev) => {
    ev.preventDefault();

  }

  submit = (ev) => {
    ev.preventDefault();
    toast.success('Loading,  please wait');
    let user = {
      id: this.props.match.params.id,
      password: this.state.password
    }
    if (user.password.trim() !== this.state.cpassword.trim()) {
        this.setState({ err: 'Password does not match' })
        toast.error('Password does not match')
        return false
    }
    else if (user.password.trim().length < 8) {
        this.setState({ err: 'Password must be atleast 8 characters' })
        toast.error('Password must be atleast 8 characters')
        return false
    }
    else{
    axios.post('/reset', user, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
        })
      }
    })
      .then((res) => {
        if (res.data.id) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('id', res.data.id)
          this.props.history.replace(`/login`)
        }
        else { return }
      })
      .then((res) => { toast.error('Login Failed, Please Try Again.' + res.data.message) })

      .catch(err => { toast.error('Login Failed, Please Try Again.') })
  }
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
              <h3 className="err">{this.state.err}</h3>
              <Form onSubmit={this.submit}>

                <label for="username" className="text"> Enter Password.</label>
                {this.state.passwordError && <p className="text">{this.state.passwordError}</p>}
                <input type="text" name="username" placeholder="Enter Email or Phone" onChange={this.pword} value={this.state.password} className="form-control" />

                <label for="password" className="text"> Confirm Password.</label>
                {this.state.cpasswordError && <p className="text">{this.state.cpasswordError}</p>}
                <input type="password" name="password" placeholder="Enter password" onChange={this.cpword} value={this.state.cpassword} className="form-control" />
                <br></br>
                {this.state.loaded &&
                  <Progress max="100" color="success" value={this.state.loaded}>{Math.round(this.state.loaded, 2)}%</Progress>
                }
                <br />
                <button className="btn btn-success form-control">Reset</button>
                <ToastContainer />

                {/* <p className="text">Forget password? <NavLink to="/password" className="navlink policy">Click here</NavLink></p> */}

              </Form>
              <h3 className="text">Don't Have An Account?</h3>
              <Button className="btn btn-danger" onClick={this.log}>Sign up</Button>
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

export default Retrive;
