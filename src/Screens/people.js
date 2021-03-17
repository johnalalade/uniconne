import React, { useState, Component } from 'react'
import Header from './header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnVerified from './unverified'
import './style.css';
import axios from './axios';


import Footer from './footer';
import { Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import { faTelegram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'

const Cards = (prop) => {
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);
    // const [following, setFollowing] = useState(prop.followers.length)
    const [fword, setFword] = useState(prop.followers)
    const [friends, setFriends] = useState(prop.friends)

    const toggle = () => {
        setModal(!modal)
    }

   const friendToggle = () => {

       prop.friender(prop.id)

       setFriends(friends.push(localStorage.getItem('id')))
   }

    const followToggle = (ev) => {

        //setModal(!modal)

        if (fword.indexOf(localStorage.getItem("id")) == -1) {
            fword.push(localStorage.getItem("id"))

        }
        else {
            var nf = fword.filter((u) => u !== localStorage.getItem("id"))
            setFword(nf)
            //console.log(fword)
            // console.log(prop.followers.length)
        }
        prop.follower(prop.id);
    }

    return (
        <div>

            <div className="card-bg" onClick={toggle}>
                {/* <br /> */}
                {/* <hr /> */}
                <div className="img-card">
                    {prop.img && <img width="100%" src={prop.img} alt="prod" className="img" /> || <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>}

                    <div className="c-top">
                        <div>
                            {prop.firstname && <h5>{prop.firstname} {prop.lastname}</h5>}
                            <h6 className="h-h5 text-muted">~@{prop.username}</h6>
                        </div>
                        {/* <Moment className="datetime" fromNow>{prop.createdAt}</Moment> */}
                    </div>

                    <p class="text-muted">{prop.department}</p>
                    <p className="twxt-muted">{prop.level} Level</p>
                    {prop.about &&
                        <p>{prop.about}</p>}
                </div>
                <hr />
                <div className="followers">
                    <p className='text-muted'>{fword.length} Followers</p>
                    <div className="buttons">
                        {fword.indexOf(localStorage.getItem("id")) == -1 && <a className="btn btn-outline-primary" onClick={followToggle}> Follow</a>
                            ||
                            <a className="btn btn-primary" onClick={followToggle}> Following</a>}

                        <a className="btn btn-success" onClick={toggle}> Connect</a>
                        {friends.indexOf(localStorage.getItem('id')) == -1 && <a className="btn btn-outline-warning" onClick={friendToggle}>Chat</a>}
                    </div>
                </div>

            </div>
            <Modal isOpen={modal} toggle={toggle} fade={false}>
                <ModalHeader toggle={toggle}>~@{prop.username}</ModalHeader>
                <ModalBody>

                    <div className="card-bg2">
                        {/* <br /> */}
                        {/* <hr /> */}
                        <div className="img-card">
                            {prop.img && <img width="100%" src={prop.img} alt="prod" /> || <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>}

                            <div className="c-top">
                                <div>
                                    {prop.firstname && <h5>{prop.firstname} {prop.lastname}</h5>}
                                    <h6 className="h-h5 text-muted">~@{prop.username}</h6>
                                </div>
                                {/* <Moment className="datetime" fromNow>{prop.createdAt}</Moment> */}
                            </div>
                            <p className="text-muted">{prop.department}</p>
                            <p className="twxt-muted">{prop.level} Level</p>

                            {prop.about &&
                                <div>
                                    <hr />
                                    <p>{prop.about}</p>
                                    <hr />
                                </div>
                            }

                        </div>
                        <div className="followers">
                            <p className='text-muted'>{fword.length} Followers</p>
                            <div className="buttons">
                                {fword.indexOf(localStorage.getItem("id")) == -1 && <a className="btn btn-outline-primary" onClick={followToggle}> Follow</a>
                                    ||
                                    <a className="btn btn-primary" onClick={followToggle}> Following</a>}
                            </div>
                        </div>
                        <hr />
                        <p align="center">Connections</p>
                        <div className="conne-btns">
                        {friends.indexOf(localStorage.getItem('id')) == -1 && <a className="btn btn-outline-warning" onClick={friendToggle}>Chat</a>}
                        <br/>
                        <div className="buttons">
                            <a className="enq btn btn-success" target="_blank" href={`https://wa.me/${prop.phone}?text=${prop.message}`} ><FontAwesomeIcon icon={faWhatsapp} size="lg" >Whatsapp</FontAwesomeIcon></a>

                            {prop.twitter && <a className="enq btn btn-primary" target="_blank" href={`https://twitter.com/${prop.twitter}`} ><FontAwesomeIcon icon={faTwitter} size="lg" >Twitter</FontAwesomeIcon></a>}

                            {prop.telegram && <a className="enq btn btn-primary" target="_blank" href={`https://t.me/${prop.telegram}`} ><FontAwesomeIcon icon={faTelegram} size="lg" >Telegram</FontAwesomeIcon></a>}

                        </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Close</Button>
                </ModalFooter>

            </Modal>
            {/* m2 */}

            <br></br>
        </div>
    )
}



class People extends Component {
    constructor() {
        super();
        this.state = {
            token: localStorage.getItem('token'),
            loader: 0,
            users: [],
            username: localStorage.getItem('username'),
            src: localStorage.getItem('src'),
            id: localStorage.getItem('id')
        }
    }

    customfilter = (u) => {
        return u._id !== this.state.id
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


        axios.post('/users')

            .then((data) => {
                //console.log(data)
                // data.data.response.forEach(this.distancer)
                return data.data.response

            })

            .then((result) => {
                result.sort(this.customSort);
                return result
            })

            .then((res) => {

                res.slice(0, 1001)
                return res
            })

            .then(conclusion => conclusion.filter(this.customfilter))
            //     .then(dd => dd.filter(this.datefilter))
            // then(dd => dd.filter(this.followfilter))
            .then(data => {

                this.setState({ loader: 1 });
                this.setState({ users: data })
            })
            // .then(data => this.setState({products: data.data.response}))
            // .then(res => console.log(this.state.products))
            .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })
    }


    render() {
        const follower = (id) => {
            let comm = {
                id: id,
                follower: this.state.id
            }
            axios.post('/users/follow', comm)
                //.then(() => console.log("follow"))
                // .catch((err) => console.log("Couldn't add follow to student"))
        }

        const friender = (id) => {
            let data = {
                sender: localStorage.getItem('id'),
                receiver: id
            }
            axios.post('/users/friend', data)

            let data2 = {
                sender: localStorage.getItem('id'),
                receiver: id,
                room: localStorage.getItem('id') + id
            }
            axios.post('/users/chat', data2)
            .then((dtta) => {
                localStorage.setItem('id2',id)
                window.location = `/chat?name=${this.state.username}&room=${data2.room}`

            })
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
                                    <p>Follow other students to see their post, also connect.</p>
                    


                                    {this.state.users.map((user) =>
                                        <Cards key={user._id} createdAt={user.createdAt} firstname={user.firstname} lastname={user.lastname} username={user.username} followers={user.followers} phone={user.phone} twitter={user.twitter} telegram={user.telegram}
                                            about={user.about} img={user.src}
                                            department={user.department}
                                            level={user.level}
                                            follower={follower} friends={user.friends}
                                            id={user._id} friender={friender}
                                        />
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
export default People