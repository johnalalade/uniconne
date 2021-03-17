import React, { Component } from 'react';
import Logo from '../Images/oau-logo.jpg';
import { Row, Col, Form, Button, Progress } from 'reactstrap';
import './style.css';
import axios from './axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'


var date = new Date()
date.getFullYear()
var year = date.toString();


class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            phone: '',
            department: "Accountancy / Accounting",
            level: '100',
            levels: ["100", "200", "300", "400", "500", "600", "700"],
            departments: ["Accountancy / Accounting",
                "Adult Education",
                "Agricultural Economics",
                "Agricultural Engineering",
                "Agricultural Extension and Rural Development",
                "Animal Science",
                "Applied Geophysics",
                "Architecture",
                "Biochemistry",
                "Building",
                "Chemical Engineering",
                "Chemistry",
                "Civil Engineering",
                "Computer Engineering",
                "Computer Science With Economics",
                "Computer Science With Mathematics",
                "Crop Production And Protection",
                "Demography and Social Statistics",
                "Dentistry And Dental Surgery",
                "Dentistry and Dental Technology",
                "Drama / Dramatic / Performing Arts",
                "Economics",
                "Education and Biology",
                "Education and Chemistry",
                "Education and Economics",
                "Education and English Language",
                "Education Fine and Applied Arts",
                "Education and French",
                "Education and Geography",
                "Education and Geography / Physics",
                "Education and History",
                "Education and Integrated Science",
                "Education and Language Arts",
                "Education and Mathematics",
                "Education and Music",
                "Education and Physics",
                "Education and Political Science",
                "Education and Religious Studies",
                "Education and Social Studies",
                "Education and Yoruba",
                "Educational Management",
                "Electrical / Electronic Engineering",
                "Engineering Physics",
                "English Language",
                "Entrepreneurship",
                "Estate Management",
                "Family, Nutrition and Consumer Sciences",
                "Food Science and Technology",
                "French",
                "Geography",
                "Geology",
                "German",
                "Guidance and Counseling",
                "Health Education",
                "History",
                "Home Economics and Education",
                "Industrial Chemistry",
                "Integrated Science / Mathematics Education",
                "International Relations",
                "Law",
                "Linguistics",
                "Linguistics and African Languages",
                "Literature in English",
                "Local Government Administration",
                "Local Government Studies",
                "Mathematics",
                "Mechanical Engineering",
                "Medical Rehabilitation",
                "Medicine and Surgery",
                "Metallurgical and Material Engineering",
                "Microbiology",
                "Music",
                "Nursing / Nursing Science",
                "Nutrition And Consumer Services",
                "Pharmacy",
                "Philosophy",
                "Physical and Health Education",
                "Physics",
                "Political Science",
                "Portuguese",
                "Psychology",
                "Public Administration",
                "Quantity Surveying",
                "Religious Studies",
                "Sociology and Anthropology",
                "Soil Science",
                "Statistics",
                "Surveying and Geo-Informatics",
                "Urban and Regional Planning",
                "Yoruba",
                "Zoology"],
            img: '',
            src: '',
            password: '',
            cpassword: '',
            passwordError: '',
            cpasswordError: '',
            err: '',
            modal: true,
            loaded: 0
        }
    }

    modal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    filer = (ev) => {

        this.setState({
            checkerImg: "loading"
        })

        let file = ev.target.files[0]
        if (file.size > 5000 * 5000 * 5) {
            toast.error("Attachment Size Too Large (max 5mb)")
        } else {
            this.setState({
                img: ev.target.files[0],
                src: window.URL.createObjectURL(ev.target.files[0])

            })
        }
    }
    log = (ev) => {
        ev.preventDefault();
        this.props.history.push(`/login`);
    }
    firstN = (ev) => {
        let name = ev.target.value;
        this.setState({ firstName: name, err: '' });
    }
    lastN = (ev) => {
        let name = ev.target.value;
        this.setState({ lastName: name, err: '' });
    }
    username = (ev) => {
        let name = ev.target.value;
        this.setState({ username: name, err: '' });
    }
    phone = (ev) => {
        let name = ev.target.value;
        this.setState({ phone: name, err: '' });
    }
    email = (ev) => {
        let name = ev.target.value.toLowerCase();
        this.setState({ email: name, err: '' });
    }
    department = (ev) => {
        let dept = ev.target.value
        this.setState({ department: dept, err: '' })
    }
    level = (ev) => {
        let level = ev.target.value
        this.setState({ level: level, err: '' })
    }
    pword = (ev) => {
        let password = ev.target.value;
        if (this.state.password.length < 7) {
            this.setState({ passwordError: 'Password too short (8)' })
        } else {
            this.setState({ passwordError: 'Password Okay!!!' })
        }
        this.setState({ password, err: '' });
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
        let data = new FormData()
        if (this.state.img) {
            data.append('file', this.state.img)
            data.append('filename', this.state.img.name)
        }
        data.append('firstname', this.state.firstName)
        data.append('lastname', this.state.lastName)
        data.append('username', this.state.username)
        data.append('email', this.state.email)
        data.append('phone', this.state.phone)
        data.append('department', this.state.department)
        data.append('level', this.state.level)
        data.append('password', this.state.password)
        let user = {
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            department: this.state.department,
            level: this.state.level,
            password: this.state.password,

        }
        if (user.firstname.trim() == "" || user.lastname.trim() == "" || user.email.trim() == "" || user.phone.trim() == "" || user.password.trim() == "" || this.state.cpassword.trim() == "") {
            toast.error('Please All Fields Are Required');
            this.setState({ err: 'Please All Fields Are Required' })
            return false
        }
        else if (user.password.trim() !== this.state.cpassword.trim()) {
            this.setState({ err: 'Password does not match' })
            toast.error('Password does not match')
            return false
        }
        else if (user.password.trim().length < 8) {
            this.setState({ err: 'Password must be atleast 8 characters' })
            toast.error('Password must be atleast 8 characters')
            return false
        }
        else if (user.email.trim().indexOf('student.oauife.edu.ng') == -1) {
            this.setState({ err: 'You are not an OAU student' })
            toast.error('You are not an OAU student! site is for OAU students')
            return false
        }
        else {
            toast.success('Loading,  please wait');
            axios.post('/register', data, {
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
                        localStorage.setItem('username', res.data.username)
                        localStorage.setItem('src', res.data.src)
                        localStorage.setItem('department', res.data.department)
                        localStorage.setItem('phone', res.data.phone)
                        this.props.history.replace(`/home?oauife=true`)
                    }
                    else { return }
                })
                .then((res) => { toast.error('Sign Up Failed, Please Try Again.' + res.data.message) })
                .then((res) => { toast.success('Sign Up Successful') })

                .catch(err => { toast.error('Sign Up Failed, Please Try Again.') })
            return true
        }

    }

    render() {

        return (
            <div>
                <div className="login-div">
                    <div className="container-fluid log-con">
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
                                <Form onSubmit={this.submit}>
                                    <h3 className="err">{this.state.err}</h3>

                                    {/* First Name */}
                                    <label for="firstname" className="text"> Enter First Name.*</label>
                                    <input type="text" name="firstname" placeholder="First Name" onChange={this.firstN} value={this.state.firstName} className="form-control" />

                                    {/* last name */}
                                    <label for="lastname" className="text"> Enter Last Name.*</label>
                                    <input type="text" name="lastname" placeholder="Last Name" onChange={this.lastN} value={this.state.lastName} className="form-control" />
                                    {/* last name */}
                                    <label for="username" className="text"> Enter A User Name.*</label>
                                    <input type="text" name="username" placeholder="username" onChange={this.username} value={this.state.username} className="form-control" />

                                    {/* email */}
                                    <label for="email" className="text"> Enter Student Email.*</label>
                                    <input type="email" name="email" placeholder="xxxxxxxxx@student.oauife.edu,ng" onChange={this.email} value={this.state.email} className="form-control" />

                                    {/* phone */}
                                    <label for="phone" className="text"> Enter Whatsapp Number.*</label>
                                    <input type="tel" name="phone" placeholder="e.g +2349000000000" onChange={this.phone} value={this.state.phone} className="form-control" />
                                    {/* department */}
                                    <label for="department" className="text"> Department.*</label>
                                    <select value={this.state.department} name="department" onChange={this.department} className="form-control">
                                        {this.state.departments.map((department) =>
                                            <option value={department}>{department}</option>
                                        )}

                                    </select>

                                    {/* level */}
                                    <label for="department" className="text"> Level.*</label>
                                    <select value={this.state.level} name="level" onChange={this.level} className="form-control">
                                        {this.state.levels.map((level) =>
                                            <option value={level}>{level} level</option>
                                        )}

                                    </select>

                                    {/* password */}
                                    <label for="password" className="text"> Enter Password.*</label>
                                    {this.state.passwordError && <p className="text">{this.state.passwordError}</p>}
                                    <input type="password" name="password" placeholder="Enter password" onChange={this.pword} value={this.state.password} className="form-control" />
                                    {/* confirm password */}
                                    <label for="password" className="text"> Confirm Password.*</label>
                                    {this.state.cpasswordError && <p className="text">{this.state.cpasswordError}</p>}
                                    <input type="password" name="password" placeholder="Confirm password" onChange={this.cpword} value={this.state.cpassword} className="form-control" />

                                    <label for="password" className="text"> Profile Image.</label>
                                    <input type='file' className="form-control" onChange={this.filer} accept="image/*" />

                                    <br />
                                    {this.state.src &&
                                        <img src={this.state.src} className="img" width="100%" />
                                    }
                                    
                                    <br></br>
                                    {this.state.loaded &&
                                        <Progress max="100" color="success" value={this.state.loaded}>{Math.round(this.state.loaded, 2)}%</Progress>
                                    }
                                    <br />
                                    <p className="text">By signing up, you agree to our <NavLink to="/policy" className="navlink policy">privacy policy</NavLink></p>

                                    <button className="btn btn-success form-control">Sign Up</button>
                                    <ToastContainer />

                                </Form>
                                <h3 className="text">Already Have An Account?</h3>
                                <Button className="btn btn-danger" onClick={this.log}>Log in</Button>
                            </Col>
                        </Row>
                    </div>
                    {/* modal */}
                    <Modal isOpen={this.state.modal} toggle={this.modal} fade={false}>
                        <ModalHeader toggle={this.modal}>Welcome To OAU-Connect</ModalHeader>
                        <ModalBody className="conne-welcome">
                            <h6>OAU-Connect</h6>
                            <p>Welcome to OAU-Connect, where you connect with fellow students on OAU campus.</p>
                            <p>With the advent of the online class programme, connecting with other students has become a challenge even for the online class programme! That's why OAU-Connect was created, to bridge the gap of disconnection</p>
                            <p>Hope you enjoy your time on campus</p>
                            <span className="quote">~John Alalade
                            <div className="quote-icons"><a href="https://twitter.com/@Agathos7" target="_blank"><FontAwesomeIcon icon={faTwitter} size='lg'></FontAwesomeIcon></a>
                                    <a href="mailto:johnalalade3@gmail.com">
                                        <FontAwesomeIcon icon={faGooglePlusG} size='lg' color="red"></FontAwesomeIcon></a></div></span>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.modal}>Continue</Button>
                        </ModalFooter>

                    </Modal>
                </div>
                <div className="bottom">
                    <p align="center"> <b>Uniconne Team &#169; {year.slice(10, 15)}</b></p>
                </div>
            </div>
        );
    }
}

export default SignUp;

//&#169;

// {
//     headers: { Authorization: `Bearer ${token}` }
// };