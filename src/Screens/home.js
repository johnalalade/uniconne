import React, { useState, Component } from 'react';
import Header from './header';
//import Logo from '../Images/oau-logo.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnVerified from './unverified';
import './style.css';
import axios from './axios';


import Footer from './footer';
import { Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                    {prop.img && prop.srctype.indexOf('image') !== -1 && <img width="100%" src={prop.img} alt="prod" /> || prop.img && <video class="video" src={prop.img} width="100%" controls loop></video>}

                    <div>

                        {/* <a className="btn btn-primary form-control" onClick={det}><FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon> Visit</a> */}
                    </div>
                    {lword.indexOf(localStorage.getItem("id")) == -1 && <div style={{ fontSize: "20px" }}><FontAwesomeIcon onClick={liketoggle} icon={faHeart}></FontAwesomeIcon> {lword.length}</div>
                        ||
                        <div style={{ fontSize: "20px" }}>
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
            </div>
            <Modal isOpen={modal} toggle={toggle} fade={false}>
                <ModalHeader toggle={toggle}>~@{prop.username}</ModalHeader>
                <ModalBody>

                    <div className="card-bg2" width="100%">
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
                        {prop.img && prop.srctype.indexOf('image') !== -1 && <img width="100%" src={prop.img} alt="prod" /> || prop.img && <video class="video" src={prop.img} width="100%" controls autoPlay loop></video>}


                        <div>

                            {/* <a className="btn btn-primary form-control" onClick={det}><FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon> Visit</a> */}
                        </div>
                        {lword.indexOf(localStorage.getItem("id")) == -1 && <div style={{ fontSize: "20px" }}><FontAwesomeIcon onClick={liketoggle} icon={faHeart}></FontAwesomeIcon>  {lword.length}</div> || <div style={{ fontSize: "20px" }}><FontAwesomeIcon icon={faHeart} onClick={liketoggle} color="red"></FontAwesomeIcon> {lword.length}</div>}

                        <p>Comments({prop.comments.length})</p>
                        {prop.comments[0] && prop.comments.map((comment) => <div>
                            {comment.src && <img src={comment.src} className="comment-img" />}
                            <div><p className="text-muted">@{comment.username}</p><p className="comment">{comment.comment}</p>
                            </div>
                        </div>) || "No comments on this post yet"}


                    </div>
                </ModalBody>
                <ModalFooter>

                    <textarea type="text" name="comment" placeholder="comment on this post..." onChange={
                        (ev) => {
                            let comment = ev.target.value;
                            setComment(comment);
                        }} value={comment} className="form-control" ></textarea>
                    <button className="btn btn-warning" onClick={commenter}>comment</button>

                </ModalFooter>

            </Modal>
            <br></br>
        </div>
    );
}








class Home extends Component {
    constructor() {
        super();
        this.state = {
            token: localStorage.getItem('token'),
            loader: 0,
            posts: [],
            username: localStorage.getItem('username'),
            src: localStorage.getItem('src'),
            id: localStorage.getItem('id')
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
                let todele = { id: c._id }
                axios.post('/posts/delete', todele)
                return c = { owner: "delete" }

            }
        }
         if (difference_In_Days >= 10) {
            let todele = { id: c._id }
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
    // customfilter = (u) => {
    //     return u.owner !== this.state.id
    // }
    followfilter = (u) => {
        if (u.news) { return u }
        else if (u.sponsored) { return u }
        else if (u.followers) { return u.followers.indexOf(this.state.id) !== -1 }
        // else {return u} 
    }

    // sort
    customSort = (a, b) => {
        var date1 = new Date(a.createdAt)
        var date2 = new Date(b.createdAt)



        if (date1.getTime() > date2.getTime()) return -1;
        if (date1.getTime() < date2.getTime()) return 1;

        return 0;
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.replace(`/login`);
        }


        //let token = { token: this.state.token }
        axios.post('/posts')

            .then((data) => {
                //console.log(data)
                // data.data.response.forEach(this.distancer)
                return data.data.response
            })
            .then(ans => ans.map(this.dateChecker))

            .then((result) => {
                result.sort(this.customSort);
                return result
            })

            .then((res) => {

                res.slice(0, 1001)
                return res
            })

            //.then(conclusion => conclusion.filter(this.customfilter))
            .then(dd => dd.filter(this.datefilter))
            .then(dd => dd.filter(this.followfilter))
            .then(data => {

                this.setState({ loader: 1 });
                this.setState({ posts: data })
            })
            // .then(data => this.setState({products: data.data.response}))
            // .then(res => console.log(this.state.products))
            .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })
        let user = { userID: localStorage.getItem('id') }
        axios.post('/users/showone', user)
            .then((data) => data.data.response)
            .then((res) => localStorage.setItem('isVerified', res.isVerified))
    }



    render() {
        const liker = (id) => {
            let like = {
                postID: id,
                like: this.state.id
            }
            axios.post('/posts/like', like)
                //.then(() => console.log("liked"))
                //.catch((err) => console.log("Couldn't add like to post."))
        }

        const comm = (comment, id) => {
            let comm = {
                postID: id,
                comment: { username: this.state.username, src: this.state.src, comment }
            }
            axios.post('/posts/comment', comm)
                .then(() => toast.success("Comment added"))
                .catch((err) => toast.error("Couldn't add comment to post."))
        }

        return (

            <div>
                {localStorage.getItem('isVerified') !== "true" && <UnVerified /> ||
                    <div>
                        <div className="head">
                            <Header id={this.state.id} />
                        </div>

                        {this.state.loader === 0 && <div className="spin">  <Spinner color="primary" className="spinner" size="lg" /> </div> ||
                            <div className="home-div homer">


                                {/* <Row className="mx-md-5"> */}
                                {/* <Col> */}
                                <div className="cardy">
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <p align="center">Posts and News appear here.</p>
                                    <div className="buttons">
                                        <a className="btn btn-primary" onClick={() => window.location = '/profile?oau=true'}>Add A Post</a>
                                    </div>



                                    {this.state.posts.map((post) =>
                                        <Cards key={post._id} createdAt={post.createdAt} firstname={post.firstname} lastname={post.lastname} username={post.username} owner={post.owner}
                                            post={post.post} img={post.src}
                                            department={post.department}
                                            level={post.level}
                                            srctype={post.srctype}
                                            comm={comm} liker={liker}
                                            comments={post.comments} likes={post.likes} id={post._id}
                                            news={post.news}
                                            sponsored={post.sponsored} />
                                    )}
                                </div>
                                {/* </Col> */}
                                <ToastContainer />
                                {/* </Row> */}
                                <br /><br />
                                <br /><br />
                            </div>
                        }

                        <Footer id={this.state.id} />
                    </div>
                }
            </div>
        );
    }

}

export default Home;
