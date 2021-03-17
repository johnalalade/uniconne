import React, { Component, useState } from 'react';
import Header from './header';
import Logo from '../Images/oau-logo.jpg';
import './style.css';
import UnVerified from './unverified'

import axios from './axios';
import { Redirect } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Spinner } from 'reactstrap';
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
                            {prop.firstname && <h5>{prop.firstname} {prop.lastname}</h5>}
                            <h6 className="h-h5">{prop.username}</h6>
                        </div>
                        {prop.news && <p className="text-mute">News</p> || prop.sponsored && <p className="text-mute">Sponsored</p> || <Moment className="datetime" fromNow>{prop.createdAt}</Moment>}

                    </div>
                    <hr />
                    <p className="desc">{prop.post}</p>
                    <hr />
                    {/* <hr /> */}
                    {prop.srctype.indexOf('image') !== -1 && <img width="100%" src={prop.img} alt="prod" className="product-img" /> || <video class="video" src={prop.img} controls autoPlay={true}></video>}

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
                    <img src={prop.comments[0].src} />
                    <div><p className="text-muted">@{prop.comments[0].username}</p><p className="comment">{prop.comments[0].comment}</p></div></div> || "No comments on this post yet"}

                <div className="commenting">
                    <textarea type="text" name="comment" placeholder="comment on this post..." onChange={
                        (ev) => {
                            let comment = ev.target.value;
                            setComment(comment);
                        }} value={comment} className="form-control" ></textarea>
                    <button className="btn btn-warning" onClick={commenter}>comment</button>
                </div>
                <a className="btn btn-danger" onClick={det}>Delete</a>
            </div>
            <Modal isOpen={modal} toggle={toggle} fade={false}>
                <ModalHeader toggle={toggle}>~@{prop.username}</ModalHeader>
                <ModalBody>

                    <div className="card-bg2" width="100%">
                        {/* <br /> */}
                        {/* <hr /> */}
                        <div className="c-top">
                            <div>
                                {prop.firstname && <h5>{prop.firstname} {prop.lastname}</h5>}
                                <h6 className="h-h5">{prop.username}</h6>
                            </div>
                            {prop.news && <p className="text-mute">News</p> || prop.sponsored && <p className="text-mute">Sponsored</p> || <Moment className="datetime" fromNow>{prop.createdAt}</Moment>}
                        </div>
                        <hr />
                        <p className="desc">{prop.post}</p>
                        <hr />
                        {/* <hr /> */}
                        {prop.srctype.indexOf('image') != -1 && <img width="100%" src={prop.img} alt="prod" className="product-img" /> || <video class="video" src={prop.img} controls autoPlay={true}></video>}

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
                        {prop.comments[0] && prop.comments.map((comment) => <div>
                            <img src={comment.src} />
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



class SetUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // posts: [],
            profile: {},
            token: localStorage.getItem('token'),
            id: localStorage.getItem('id')
        }
    }

    // dateChecker
    dateChecker = (c) => {

        var date1 = new Date(c.createdAt);
        var date2 = new Date();

        var difference_In_Time = date2.getTime() - date1.getTime();

        var difference_In_Days = difference_In_Time / (1000 * 3600 * 24)
        if (c.duration) {
            if (difference_In_Days >= c.duration) {
                let todele = { id: c._id, token: this.state.token }
                axios.post('/posts/delete', todele)
                return c = { owner: "delete" }

            }
        }
        else if (difference_In_Days >= 10) {
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

            .then((data) => { this.setState({ profile: data.data.response }) })
            .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })

        // let prod = { id: this.state.id, token: this.state.token }
        // axios.post('/posts/myposts', prod)
        //     .then((data) => { return data.data.response })
        //     .then(ans => ans.map(this.dateChecker))
        //     .then(dd => dd.filter(this.datefilter))
        //     .then((data) => {
        //         this.setState({
        //             posts: data
        //         })
        //     })
        //     .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })
    }
    render() {

        const deta = (id) => {
            let todele = { product: id }
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
                                    <div className="lists">
                                        <h5>{this.state.profile.firstname} {this.state.profile.lastname}</h5>
                                        <a className="card-list" onClick={() =>
                                            this.props.history.push(`/profile?oau=true`)} >View Profile</a>
                                        <hr />
                                        {/* <a className="card-list" onClick={() =>
                                    this.props.history.push(`/mystore?gigvee=true&product=1`)} >Add A Post</a>
                                <hr /> */}
                                        <a className="card-list" onClick={() => {
                                            localStorage.clear();
                                            this.props.history.replace(`/login`);
                                        }} >Log Out</a>
                                        <hr />
                                        <a className="card-list" onClick={() =>
                                            this.props.history.push(`/privacy?oau=true`)} >Privacy Policy</a>
                                        <hr />
                                        <a className="card-list" onClick={() =>
                                        this.props.history.push(`/aboutus?oau=true`)} >About Us</a>
                                    </div>
                                </div>

                                <br></br>
                                <br></br>
                                <br></br>
                                <ToastContainer />
                            </div>
                            || <div className="spin"><Spinner className="spinner" color="primary" size="lg" /></div>}
                        <Footer id={this.state.id} />
                    </div>
                }
            </div>
        );
    }

}

export default SetUp;

