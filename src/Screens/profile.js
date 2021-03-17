import React, { Component, useState } from 'react';
import Header from './header';
import UnVerified from './unverified';
import './style.css';
import FlutterwaveHook from './flutterwavehooks'

import axios from './axios';
//import { Redirect } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Spinner, Form, Progress } from 'reactstrap';
import Footer from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'



const Cards = (prop) => {
    const [comment, setComment] = useState('');
    const [lword, setLword] = useState(prop.likes)
    const [modal, setModal] = useState(false);

    const det = (ev) => {
        prop.deta(prop.id);
    }


    const toggle = () => {
        setModal(!modal)
    }

    const liketoggle = (ev) => {
        setModal(!modal)


        if (lword.indexOf(localStorage.getItem("id")) == -1) {
            lword.push(localStorage.getItem("id"))
        } else {
            setLword(lword.filter((u) => u !== localStorage.getItem("id")))
        }
        prop.liker(prop.id);
    }

    const commenter = () => {
        if (comment.trim() === '') {
            return
        }
        else {
            prop.comm(comment, prop.id)
            prop.comments.unshift({ comment: comment, src: localStorage.getItem('src'), username: localStorage.getItem('username') })
            setComment('')
        }

    }

    return (
        <div>

            <div className="card-bg">
                {/* <br /> */}
                {/* <hr /> */}
                <div onClick={toggle}>
                    <div className="c-top">
                        <div>
                            {prop.firstname && <h6>{prop.firstname} {prop.lastname}</h6>}
                            <p className="h-h5">@{prop.username}</p>
                        </div>
                        {prop.news && <p className="text-mute">News/Trends</p> || prop.sponsored && <p className="text-mute">Sponsored</p> || <Moment className="datetime" fromNow>{prop.createdAt}</Moment>}

                    </div>
                    {prop.post &&
                        <div>
                            <hr />
                            <p className="desc">{prop.post}</p>
                            <hr />
                        </div>
                    }
                    {prop.url &&
                        <div className="url-div">
                        
                            <a href={prop.url} target="_blank" className="btn btn-primary">Click Link</a>
                            
                        </div>
                    }
                    {/* <hr /> */}
                    {prop.img && prop.srctype.indexOf('image') !== -1 && <img width="100%" src={prop.img} alt="prod" /> || prop.img && <video class="video" src={prop.img} width="100%" controls></video>}

                    <div>

                        {/* <a className="btn btn-primary form-control" onClick={det}><FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon> Visit</a> */}
                    </div>
                    {lword.indexOf(localStorage.getItem("id")) == -1 && <div><FontAwesomeIcon onClick={liketoggle} icon={faHeart}></FontAwesomeIcon> {lword.length}</div>
                        ||
                        <div>
                            <FontAwesomeIcon icon={faHeart} onClick={liketoggle} color="red"></FontAwesomeIcon> {lword.length}</div>}
                </div>
                <p>Comments({prop.comments.length})</p>
                {prop.comments[0] && <div>
                    {prop.comments[0].src && <img src={prop.comments[0].src} className="comment-img" />}
                    <div><p className="text-muted">@{prop.comments[0].username}</p><p className="comment">{prop.comments[0].comment}</p></div></div> || "No comments on this post yet"}

                <div className="commenting">
                    <textarea type="text" name="comment" placeholder="comment on this post..." onChange={
                        (ev) => {
                            let comment = ev.target.value;
                            setComment(comment);
                        }} value={comment} className="form-control" ></textarea>
                    <button className="btn btn-warning" onClick={commenter}>comment</button>
                </div>
                <br />
                <a className="btn btn-danger" onClick={det}>Delete</a>
            </div>
            <Modal isOpen={modal} toggle={toggle} fade={false}>
                <ModalHeader toggle={toggle}>~@{prop.username}</ModalHeader>
                <ModalBody>

                    <div className="card-bg2">
                        {/* <br /> */}
                        {/* <hr /> */}
                        <div className="c-top">
                            <div>
                                {prop.firstname && <h6>{prop.firstname} {prop.lastname}</h6>}
                                <p className="h-h5">@{prop.username}</p>
                            </div>
                            {prop.news && <p className="text-mute">News</p> || prop.sponsored && <p className="text-mute">Sponsored</p> || <Moment className="datetime" fromNow>{prop.createdAt}</Moment>}
                        </div>

                        {prop.post &&
                            <div>
                                <hr />
                                <p className="desc">{prop.post}</p>
                                <hr />
                            </div>
                        }
                        {prop.url &&
                        <div className="url-div">
                        
                            <a href={prop.url} target="_blank" className="btn btn-primary">Click Link</a>
                            
                        </div>
                    }
                        {/* <hr /> */}
                        {prop.img && prop.srctype.indexOf('image') !== -1 && <img width="100%" src={prop.img} alt="prod" /> || prop.img && <video class="video" width="100%" src={prop.img} controls autoPlay></video>}

                        <div>

                            {/* <a className="btn btn-primary form-control" onClick={det}><FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon> Visit</a> */}
                        </div>
                        {lword.indexOf(localStorage.getItem("id")) == -1 && <div><FontAwesomeIcon onClick={liketoggle} icon={faHeart}></FontAwesomeIcon>  {lword.length}</div> || <div><FontAwesomeIcon icon={faHeart} onClick={liketoggle} color="red"></FontAwesomeIcon> {lword.length}</div>}

                        <p>Comments({prop.comments.length})</p>
                        <textarea type="text" name="comment" placeholder="comment on this post..." onChange={
                            (ev) => {
                                let comment = ev.target.value;
                                setComment(comment);
                            }} value={comment} className="form-control" ></textarea>
                        <button className="btn btn-warning" onClick={commenter}>comment</button>
                        <br />
                        {prop.comments[0] && prop.comments.map((comment) => <div>
                            {comment.src && <img src={comment.src} className="comment-img" />}
                            <div><p className="text-muted">@{comment.username}</p><p className="comment">{comment.comment}</p>
                            </div>
                        </div>) || "No comments on this post yet"}


                    </div>
                </ModalBody>
                <ModalFooter>

                    <a className="btn btn-danger" onClick={det}>Delete</a>

                </ModalFooter>

            </Modal>
            <br></br>
        </div>
    );
}


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
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
            about: '',
            twitter: "",
            telegram: "",
            password: '',
            cpassword: '',
            passwordError: '',
            cpasswordError: '',
            err: '',
            modal: false,
            loaded: 0,
            loaded2: 0,
            posts: [],
            profile: {},
            img: null,
            src: null,
            checker: null,
            checkerImg: null,
            checkerImage: false,
            img2: null,
            src2: null,
            srctype: null,
            modal2: false,
            post: '',
            img3: null,
            src3: null,
            srctype3: null,
            modal3: false,
            news: '',
            loaded3: 0,
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id'),
            fmodal: false,
            myFollowers: [],
            img4: null,
            src4: null,
            srctype4: null,
            modal4: false,
            adwords: '',
            url: '',
            durations: [7, 14, 21, 30],
            duration: 7,
            amount: 2000,
            companyname: '',
            loaded4: ''
        }
    }

    // dateChecker
    dateChecker = (c) => {

        var date1 = new Date(c.createdAt);
        var date2 = new Date();

        var difference_In_Time = date1.getTime() - date2.getTime();

        var difference_In_Days = difference_In_Time / (1000 * 3600 * 24)
        if (c.duration) {
            if (difference_In_Days >= c.duration) {
                let todele = { id: c._id, token: this.state.token }
                axios.post('/posts/delete', todele)
                return c = { owner: "delete" }

            }
        }
         if (difference_In_Days >= 10) {
            let todele = { id: c._id, token: this.state.token }
            axios.post('/posts/delete', todele)
            return c = { owner: "delete" }

        }
        else {
            return c
        }
    }

    // filter
    datefilter = (k) => {
        return k.owner !== "delete"
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.replace(`/login`);
        }
        let user = { userID: localStorage.getItem('id')}
        axios.post('/users/showone', user)

            .then((data) => {
                this.setState({
                    profile: data.data.response,
                    firstname: data.data.response.firstname,
                    lastname: data.data.response.lastname,
                    username: data.data.response.username,
                    email: data.data.response.email,
                    phone: data.data.response.phone,
                    department: data.data.response.department,
                    level: data.data.response.level,
                    twitter: data.data.response.twitter,
                    telegram: data.data.response.telegram,
                    src: data.data.response.src,
                    about: data.data.response.about
                })
            })
            .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })

        let prod = { id: this.state.id }
        axios.post('/posts/myposts', prod)
            .then((data) => { return data.data.response })
            .then(ans => { ans.map(this.dateChecker); return ans })
            .then(dd => dd.filter(this.datefilter))
            .then((data) => {
                this.setState({
                    posts: data.reverse()
                })
            
            })
            .then(() =>{ this.followers()})
            .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })
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
                src: window.URL.createObjectURL(ev.target.files[0]),
                checkerImage: true
            })
        }
    }


    firstN = (ev) => {
        let name = ev.target.value;
        this.setState({ firstname: name, err: '' });
    }
    lastN = (ev) => {
        let name = ev.target.value;
        this.setState({ lastname: name, err: '' });
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
    about = (ev) => {
        let name = ev.target.value;
        this.setState({ about: name, err: '' });
    }
    twitter = (ev) => {
        let name = ev.target.value;
        this.setState({ twitter: name, err: '' });
    }
    telegram = (ev) => {
        let name = ev.target.value;
        this.setState({ telegram: name, err: '' });
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
        data.append('firstname', this.state.firstname)
        data.append('lastname', this.state.lastname)
        data.append('username', this.state.username)
        data.append('email', this.state.email)
        data.append('phone', this.state.phone)
        data.append('department', this.state.department)
        data.append('level', this.state.level)
        data.append('telegram', this.state.telegram)
        data.append('twitter', this.state.twitter)
        data.append('checkerImage', this.state.checkerImage)
        data.append('userID', this.state.id)
        data.append('about', this.state.about)

        let user = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            department: this.state.department,
            level: this.state.level,


        }
        if (user.firstname.trim() == "" || user.lastname.trim() == "" || user.email.trim() == "" || user.phone.trim() == "") {
            toast.error('Please All Stared Fields Are Required');
            this.setState({ err: 'Please All Fields Are Required' })
            return false
        }
        // else if (user.password.trim() !== this.state.cpassword.trim()) {
        //     this.setState({ err: 'Password does not match' })
        //     toast.error('Password does not match')
        //     return false
        // }
        // else if (user.password.trim().length < 8) {
        //     this.setState({ err: 'Password must be atleast 8 characters' })
        //     toast.error('Password must be atleast 8 characters')
        //     return false
        // }
        else if (user.email.trim().indexOf('@student.oauife.edu.ng') == -1) {
            this.setState({ err: "Please add a valid OAU student email" })
            toast.error('Please add a valid OAU student email')
            return false
        }
        else {
            toast.success('Loading,  please wait');
            axios.post('/users/updateone', data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                }
            })
                .then((res) => {
                    // console.log(res)
                    if (res.data.response) {
                        // console.log(res)
                        localStorage.setItem('username', res.data.response.username)
                        localStorage.setItem('src', res.data.response.src)
                        localStorage.setItem('department', res.data.response.department)
                        localStorage.setItem('phone', res.data.response.phone)
                        localStorage.setItem('level', res.data.response.level)
                        // this.setState({
                        //     profile: {
                        //         firstname: data.firstname, phone: data.phone,
                        //         lastname: data.lastname, twitter:  data.twitter,
                        //         department:  data.department, level:  data.level,
                        //         src:  data.src, _id:  data._id,
                        //         username:  data.username, followers:  data.followers

                        //     }
                        // })

                    }
                    else { return }
                })
                .then(() => {
                    let user = { userID: localStorage.getItem('id'), token: this.state.token }
                    axios.post('/users/showone', user)

                        .then((data) => {
                            this.setState({
                                profile: data.data.response,
                            })
                        })
                })
                .then((res) => { this.modal(); toast.success('Profile updated') })

                .catch(err => {
                    this.setState({ loaded: 0 })
                    toast.error('Profile update Failed, Please Try Again.')
                })
            return true
        }

    }
    modal = () => {
        this.setState({
            modal: !this.state.modal,
            loaded: 0
        })
    }

    // posts

    filer2 = (ev) => {

        let file = ev.target.files[0]
        if (file.size > 10000 * 10000 * 10) {
            toast.error("Attachment Size Too Large (max 10mb)")
        } else {
            this.setState({
                img2: ev.target.files[0],
                src2: window.URL.createObjectURL(ev.target.files[0]),
                srctype: file.type
            })
        }

    }


    post = (ev) => {
        let name = ev.target.value;
        this.setState({ post: name, err: '' });
    }

    submit2 = (ev) => {
        ev.preventDefault()
        let data = new FormData()
        if (this.state.img2) {
            data.append('file', this.state.img2)
            data.append('filename', this.state.img2.name)
        }
        data.append('firstname', this.state.profile.firstname)
        data.append('lastname', this.state.profile.lastname)
        data.append('username', this.state.profile.username)
        data.append('post', this.state.post)
        data.append('owner', this.state.profile._id)
        data.append('department', this.state.profile.department)
        data.append('level', this.state.profile.level)
        data.append('followers', this.state.profile.followers)


        if (this.state.img2 === null && this.state.post === "") {
            toast.error("Please add a post")
        }
        else {
            axios.post('/posts/addpost', data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded2: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                }
            })
                .then(() => {
                    let prod = { id: this.state.id, token: this.state.token }
                    axios.post('/posts/myposts', prod)
                        .then((data) => { return data.data.response })
                        .then(ans => ans.map(this.dateChecker))
                        .then(dd => dd.filter(this.datefilter))
                        .then((data) => {
                            this.setState({
                                posts: data.reverse()
                            })
                        })
                        .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })
                })
                .then(() => {
                    this.modal2()
                })
                .catch((err) => {
                    this.setState({ loaded2: 0 })
                    toast.error("Could'nt add post")
                })
        }

    }

    modal2 = () => {
        this.setState({
            modal2: !this.state.modal2,
            src2: null,
            img2: null,
            post: '',
            loaded2: 0,
            srctype: null
        })
    }


    // News

    filer3 = (ev) => {

        let file = ev.target.files[0]
        if (file.size > 10000 * 10000 * 10) {
            toast.error("Attachment Size Too Large (max 10mb)")
        } else {
            this.setState({
                img3: ev.target.files[0],
                src3: window.URL.createObjectURL(ev.target.files[0]),
                srctype3: file.type
            })
        }

    }

    news = (ev) => {
        let name = ev.target.value;
        this.setState({ news: name, err: '' });
    }

    submit3 = (ev) => {
        ev.preventDefault()
        let data = new FormData()
        if (this.state.img3) {
            data.append('file', this.state.img3)
            data.append('filename', this.state.img3.name)
        }
        data.append('username', this.state.profile.username)
        data.append('post', this.state.news)
        data.append('owner', this.state.profile._id)
        //data.append('token', this.state.token)

        if (this.state.img3 === null && this.state.news === "") {
            toast.error("Please add a post")
        }
        else {
            axios.post('/posts/addnews', data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded3: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                }
            })
                .then(() => {
                    let prod = { id: this.state.id, token: this.state.token }
                    axios.post('/posts/myposts', prod)
                        .then((data) => { return data.data.response })
                        .then(ans => ans.map(this.dateChecker))
                        .then(dd => dd.filter(this.datefilter))
                        .then((data) => {
                            this.setState({
                                posts: data.reverse()
                            })
                        })
                        .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })
                })
                .then(() => {
                    this.modal3()
                })
                .catch((err) => {
                    this.setState({ loaded3: 0 })
                    toast.error("Could'nt add post.")
                })
        }

    }
    modal3 = () => {
        this.setState({
            modal3: !this.state.modal3,
            src3: null,
            img3: null,
            news: '',
            loaded3: 0,
            srctype3: null
        })
    }

    //followers view
    followers = () => {
        // this.setState({
        //     fmodal: !this.state.fmodal
        // })

        let user = { userID: localStorage.getItem('id')}

        this.state.profile.followers.map((f) =>
            // { userID: f, token: this.state.token }
            axios.post('/users/showone', { userID: f }).then((data) => data.data.response)
                .then((data) => {
                    if (this.state.myFollowers.indexOf(data) == -1) {
                        this.setState({ myFollowers: [data, ...this.state.myFollowers] })
                    }
                    else { return }
                })
        )

        // this.setState({myFollowers: folks})
    }

    followersToggle = () => {
        this.setState({
            fmodal: !this.state.fmodal
        })
    }

    //Ads
    filer4 = (ev) => {

        let file = ev.target.files[0]
        if (file.size > 10000 * 10000 * 10) {
            toast.error("Attachment Size Too Large (max 10mb)")
        } else {
            this.setState({
                img4: ev.target.files[0],
                src4: window.URL.createObjectURL(ev.target.files[0]),
                srctype4: file.type
            })
        }

    }
    companyname = (ev) => {
        let texts = ev.target.value;
        this.setState({ companyname: texts, err: '' });
    }
    ads = (ev) => {
        let texts = ev.target.value;
        this.setState({ adwords: texts, err: '' });
    }

    url = (ev) => {
        let texts = ev.target.value;
        this.setState({ url: texts, err: '' });
    }

    duration = (ev) => {
        let duration = ev.target.value
        this.setState({ duration: duration, err: '' })
        if(duration ==7){this.setState({ amount: 2000, err: '' })}
        else if(duration ==14){this.setState({ amount: 4000, err: '' })}
        else if(duration ==21){this.setState({ amount: 6000, err: '' })}
        else if(duration ==30){this.setState({ amount: 8000, err: '' })}
    }

    

    submit4 = (res) => {
        //ev.preventDefault()
        let data = new FormData()
        if (this.state.img4) {
            data.append('file', this.state.img4)
            data.append('filename', this.state.img4.name)
        }
        data.append('username', this.state.companyname)
        data.append('post', this.state.adwords)
        data.append('url', this.state.url)
        data.append('duration', this.state.duration)
        data.append('owner', this.state.id)
        

        if (this.state.img4 === null && this.state.adwords === "") {
            toast.error("Please add a post (image/video or posts)")
        }
        else if(res.status == "successful"){
            axios.post('/posts/addads', data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded4: (ProgressEvent.loaded / ProgressEvent.total * 100),
                    })
                }
            })
                .then(() => {
                    let prod = { id: this.state.id, token: this.state.token }
                    axios.post('/posts/myposts', prod)
                        .then((data) => {return data.data.response })
                        .then(ans => {return ans.map(this.dateChecker)})
                        .then(dd => {return dd.filter(this.datefilter)})
                        .then((data) => {
                            this.setState({
                                posts: data.reverse()
                            })
                        })
                        .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })
                })
                .then(() => {
                    this.modal4()
                })
                .catch((err) => {
                    this.setState({ loaded4: 0 })
                    toast.error("Could'nt add Advert")
                })
        }

    }
    modal4 = () => {
        this.setState({
            modal4: !this.state.modal4,
            src4: null,
            img4: null,
            adwords: '',
            url: '',
            loaded4: 0,
            amount: 2000,
            duration: 7,
            srctype4: null
        })
    }

    render() {

        const liker = (id) => {
            let comm = {
                postID: id,
                like: this.state.id
            }
            axios.post('/posts/like', comm)
                // .then(() => console.log("liked"))
                //.catch((err) => console.log("Couldn't add like to post."))
        }

        const comm = (comment, id) => {
            let comm = {
                postID: id,
                comment: { username: this.state.username, src: this.state.profile.src, comment }
            }
            axios.post('/posts/comment', comm)
                .then(() => toast.success("Comment added"))
                .catch((err) => toast.error("Couldn't add comment to post."))
        }

        const deta = (id) => {
            let todele = { id: id}
            toast.success('Deleting, please wait...')
            axios.post('/posts/delete', todele)
                .then(() => toast.success('Delete Successful.'))
                .then(() => this.setState(
                    prevState => {
                        return {
                            posts: prevState.posts.filter((u) => {
                                return u._id !== id
                            })
                        }
                    }
                ))
        }


        const follow = (f) => {
            let comm = {
                id: f._id,
                follower: this.state.id
            }
            axios.post('/users/follow', comm)
                // .then(() => console.log("follow"))
                .then(() => {
                    if (f.followers.indexOf(localStorage.getItem("id")) == -1) {
                        f.followers.push(localStorage.getItem("id"))
                        this.setState({})
                    }
                    else {
                        var nf = f.followers.filter((u) => u !== localStorage.getItem("id"))
                        this.state.myFollowers[this.state.myFollowers.indexOf(f)].followers = nf
                    }
                })
                .then(()=> this.setState({fmodal: !this.state.fmodal}))
                .then(()=> this.setState({fmodal: !this.state.fmodal}))
                //.catch((err) => console.log("Couldn't add follow to student."))
        }

        return (
            <div>
                {localStorage.getItem('isVerified') !== "true" && <UnVerified /> ||
                    <div>
                        <Header id={this.state.id} />
                        {this.state.profile.firstname &&
                            <div className="setup-div">

                                <br />
                                <br />
                                <div className="card-bg-setup">
                                    <br />
                                    <div className="img-card">
                                        {this.state.profile.src && <img src={this.state.profile.src} className="setupimg" alt="profile img" /> || <FontAwesomeIcon icon={faUser} size='lg'></FontAwesomeIcon>}
                                    </div>
                                    <br />
                                    {this.state.profile.firstname &&
                                        <div className="lists">

                                            <h5>{this.state.profile.firstname} {this.state.profile.lastname}</h5>

                                            <p className="text-muted">~@{this.state.profile.username}</p>

                                            <p className="text-muted">{this.state.profile.department}</p>

                                            <p className="text-muted">{this.state.profile.level} Level</p>

                                            <div className="follower-section">
                                            <p>{this.state.profile.followers.length} Followers </p> <a className="btn btn-primary" onClick={this.followersToggle}>view</a>
                                            </div>

                                            <div className="buttons">
                                                <a className="btn btn-outline-primary" onClick={this.modal} >Update Profile</a>
                                                
                                                <a className="btn btn-success" onClick={this.modal2} >Add A Post</a>
                                                
                                            </div>

                                            <br/>

                                            <div className="buttons">

                                                <a className="btn btn-warning" onClick={this.modal4}>Post Ads</a>

                                                {this.state.profile.admin && 
                                                <a className="btn btn-outline-warning" onClick={this.modal3} >Post A News</a>
                                                }
                                                </div>
                                        </div>}

                                </div>
                                <br /> <br />
                                <p align="center"> Your Posts</p>
                                <div className="home-div2 homer">
                                    <div>
                                        {this.state.posts.map((post) =>
                                            <Cards key={post._id} createdAt={post.createdAt} firstname={post.firstname} lastname={post.lastname} username={post.username} owner={post.owner}
                                                post={post.post} img={post.src}
                                                department={post.department}
                                                level={post.level}
                                                srctype={post.srctype}
                                                comm={comm} liker={liker} deta={deta}
                                                comments={post.comments} likes={post.likes} id={post._id}
                                                news={post.news}
                                                sponsored={post.sponsored} url={post.url} />
                                        )}
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                    </div>
                                </div>
                                <Modal isOpen={this.state.modal} toggle={this.modal} fade={false}>
                                    <ModalHeader toggle={this.modal}>Update Profile</ModalHeader>
                                    <ModalBody>

                                        <label><h6>Profile Picture</h6></label>

                                        <input type='file' className="form-control" onChange={this.filer} accept="image/*" />

                                        <br />
                                        {this.state.src &&
                                            <img src={this.state.src} width="100%" />
                                        }

                                        <Form>
                                            <h3 className="err">{this.state.err}</h3>

                                            {/* first name */}
                                            <label for="firstname" className="text"> Enter First Name.*</label>
                                            <input type="text" name="firstname" placeholder="First Name" onChange={this.firstN} value={this.state.firstname} className="form-control" />

                                            {/* last name */}
                                            <label for="lastname" className="text"> Enter Last Name.*</label>
                                            <input type="text" name="lastname" placeholder="Last Name" onChange={this.lastN} value={this.state.lastname} className="form-control" />

                                            {/* Username */}
                                            <label for="username" className="text"> Enter A User Name.*</label>
                                            <input type="text" name="username" placeholder="username" onChange={this.username} value={this.state.username} className="form-control" />

                                            {/* email */}
                                            <label for="email" className="text"> Enter Student Email.*</label>
                                            <input type="email" name="email" placeholder="xxxxxxxxx@student.oauife.edu,ng" onChange={this.email} value={this.state.email} className="form-control" />

                                            {/* phone */}
                                            <label for="phone" className="text"> Enter Whatsapp Number.*</label>
                                            <input type="tel" name="phone" placeholder="eg +2349000000000" onChange={this.phone} value={this.state.phone} className="form-control" />

                                            {/* about */}
                                            <label for="about" className="text"> About.</label>
                                            <textarea name="about" placeholder="e.gwhat youdo,favorite interest, best quote etc..." onChange={this.about} value={this.state.about && this.state.about} className="form-control" ></textarea>

                                            {/* twitter */}
                                            <label for="phone" className="text"> Twitter User Name.</label>
                                            <input type="text" name="phone" placeholder="e.g @Agathos7" onChange={this.twitter} value={this.state.twitter && this.state.twitter} className="form-control" />

                                            {/* telegram */}
                                            <label for="phone" className="text"> Telegram User Name.</label>
                                            <input type="text" name="phone" placeholder="e.g @Agathos" onChange={this.telegram} value={this.state.telegram && this.state.telegram} className="form-control" />

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
                                            {/* <label for="password" className="text"> Enter Password.*</label>
                                    {this.state.passwordError && <p className="text">{this.state.passwordError}</p>}
                                    <input type="password" name="password" placeholder="Enter password" onChange={this.pword} value={this.state.password} className="form-control" /> */}
                                            {/* confirm password */}
                                            {/* <label for="password" className="text"> Confirm Password.*</label>
                                    {this.state.cpasswordError && <p className="text">{this.state.cpasswordError}</p>}
                                    <input type="password" name="password" placeholder="Confirm password" onChange={this.cpword} value={this.state.cpassword} className="form-control" /> */}
                                            <br></br>
                                            {this.state.loaded &&
                                                <Progress max="100" color="success" value={this.state.loaded}>{Math.round(this.state.loaded, 2)}%</Progress>
                                            }


                                            <ToastContainer />

                                        </Form>

                                    </ModalBody>
                                    <ModalFooter>
                                        <button onClick={this.submit} className="btn btn-success form-control">Update</button>
                                    </ModalFooter>

                                </Modal>

                                {/* Post Modal */}
                                <Modal isOpen={this.state.modal2} toggle={this.modal2} fade={false}>
                                    <ModalHeader toggle={this.modal2}>Add A Post</ModalHeader>
                                    <ModalBody>
                                        <label><h6>Image or Video</h6></label>

                                        <input type='file' className="form-control" onChange={this.filer2} accept="image/*,video/*" />

                                        <br />
                                        {this.state.src2 && this.state.srctype && this.state.srctype.indexOf('image/') !== -1 &&
                                            <img src={this.state.src2} width="100%" />
                                            || this.state.srctype &&
                                            <video width="100%" controls src={this.state.src2} autoPlay={true} ></video> || null
                                        }

                                        <br />

                                        <label for="post" className="text"> Post.</label>
                                        <textarea name="post" className="form-control" col="30" row="40" value={this.state.post} onChange={this.post}></textarea>

                                        <br></br>
                                        {this.state.loaded2 &&
                                            <Progress max="100" color="success" value={this.state.loaded2}>{Math.round(this.state.loaded2, 2)}%</Progress>
                                        }
                                    </ModalBody>
                                    <ModalFooter>
                                        <button onClick={this.submit2} className="btn btn-success form-control">Post</button>
                                    </ModalFooter>

                                </Modal>
                                <ToastContainer />

                                {/* News Modal */}
                                <Modal isOpen={this.state.modal3} toggle={this.modal3} fade={false}>
                                    <ModalHeader toggle={this.modal3}>Add News</ModalHeader>
                                    <ModalBody>
                                        <label><h6>Image or Video</h6></label>

                                        <input type='file' className="form-control" onChange={this.filer3} accept="image/*,video/*" />

                                        <br />
                                        {this.state.src3 && this.state.srctype3 && this.state.srctype3.indexOf('image/') !== -1 &&
                                            <img src={this.state.src3} width="100%" />
                                            || this.state.srctype3 &&
                                            <video width="100%" controls src={this.state.src3} autoPlay={true} ></video> || null
                                        }

                                        <br />

                                        <label for="post" className="text"> News.</label>
                                        <textarea name="post" className="form-control" col="30" row="40" value={this.state.news} onChange={this.news}></textarea>

                                        <br></br>
                                        {this.state.loaded3 !== 0 &&
                                            <Progress max="100" color="success" value={this.state.loaded3}>{Math.round(this.state.loaded3, 2)}%</Progress>
                                        }
                                    </ModalBody>
                                    <ModalFooter>
                                        <button onClick={this.submit3} className="btn btn-success form-control">Broadcast</button>
                                    </ModalFooter>

                                </Modal>

                                        {/* Ads Modal*/}
                                <Modal isOpen={this.state.modal4} toggle={this.modal4} fade={false}>
                                    <ModalHeader toggle={this.modal4}>Post Ads</ModalHeader>
                                    <ModalBody>
                                        <label><h6>Image or Video</h6></label>

                                        <input type='file' className="form-control" onChange={this.filer4} accept="image/*,video/*" />

                                        <br />
                                        {this.state.src4 && this.state.srctype4 && this.state.srctype4.indexOf('image/') !== -1 &&
                                            <img src={this.state.src4} width="100%" />
                                            || this.state.srctype4 &&
                                            <video width="100%" controls src={this.state.src4} autoPlay={true} ></video> || null
                                        }

                                        <br />

                                        <label for="post" className="text"> Post.</label>
                                        <textarea name="post" className="form-control" col="30" row="40" value={this.state.adwords} onChange={this.ads}></textarea>

                                        <br />

                                        <label for="url" className="text">URl.(put your link here)</label>
                                        <input type="text" name="url" placeholder="(optional) urls here: https://...." className="form-control" onChange={this.url} value={this.state.url} />

                                        <br />

                                        <label for="post" className="text"> Business/Company Name.</label>
                                        <input type="text" name="url" placeholder="Your company name or username" className="form-control" onChange={this.companyname} value={this.state.companyname} />


                                        <br />

                                        <label for="duration" className="text"> Duration.*</label>
                                    <select value={this.state.duration} name="level" onChange={this.duration} className="form-control">
                                        {this.state.durations.map((dur) =>
                                            <option value={dur}>{dur} Days</option>
                                        )}

                                    </select>
                                        <p className="text">Amount: &#8358; {this.state.amount}</p>
                                        <br></br>
                                        {this.state.loaded4 !== 0 &&
                                            <Progress max="100" color="success" value={this.state.loaded4}>{Math.round(this.state.loaded4, 2)}%</Progress>
                                        }
                                    </ModalBody>
                                    <ModalFooter>
                                        {/* <button onClick={this.submit4} className="btn btn-success form-control">Post</button> */}
                                        <FlutterwaveHook id={this.state.id} amount={this.state.amount} email={this.state.email} phone={this.state.phone} username={this.state.companyname} submit={this.submit4} img4={this.state.img4} adwords={this.state.adwords} url={this.state.url}  />
                                    </ModalFooter>

                                </Modal>

                                {/* Followers Modal */}
                                <Modal isOpen={this.state.fmodal} toggle={this.followersToggle} fade={false}>
                                    <ModalHeader toggle={this.followersToggle}>Your Followers</ModalHeader>
                                    <ModalBody>
                                        
                                        {this.state.myFollowers.map((f) => {
                                            
                                            return (<div className="followers-list">
                                                {f.src && <img src={f.src} className="followers-img" />}
                                                <div className="followers-name">
                                                    <h6>{f.firstname} {f.lastname}</h6>
                                                    <p>@{f.username}</p>
                                                </div>
                                                {f.followers.indexOf(localStorage.getItem("id")) == -1 && <a className="btn btn-outline-primary" onClick={()=>{follow(f)}}> Follow</a>
                                                    ||
                                                    <a className="btn btn-primary" onClick={()=>{follow(f)}}> Following</a>}
                                            </div>)
                                        }
                                        )}
                                    </ModalBody>
                                    <ModalFooter>
                                        <button onClick={this.followersToggle} className="btn btn-primary">Close</button>
                                    </ModalFooter>

                                </Modal>
                            </div>
                            || <div className="spin"><Spinner className="spinner" color="primary" size="lg" /></div>}
                        <Footer id={this.state.id} />
                    </div>
                }
            </div>
        );
    }

}

export default Profile;

//<a className="btn btn-primary" onClick={this.followers}>view</a>