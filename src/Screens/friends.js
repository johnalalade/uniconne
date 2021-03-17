import React, { useState, Component } from "react"
import axios from "./axios"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./style.css"

import Header from "./header"
import Footer from "./footer"
import UnVerified from "./unverified"


class Friends extends Component {
    constructor() {
        super();
        this.state = {
            rooms: [],
            myroomates: []
        }
    }

    roomers = () => {
        // let user = { userID: localStorage.getItem('id') }

        this.state.rooms.map((f) => {
            // { userID: f, token: this.state.token }
            if (f.sender != localStorage.getItem('id')) {
                axios.post('/users/showone', { userID: f.sender }).then((data) => data.data.response)
                    .then((data) => {
                        //console.log(data)
                        this.setState({ myroomates: [data, ...this.state.myroomates] })
                    })
            }

            if (f.receiver != localStorage.getItem('id')) {
                axios.post('/users/showone', { userID: f.receiver }).then((data) => data.data.response)
                    .then((data) => {
                        //console.log(data)
                        this.setState({ myroomates: [data, ...this.state.myroomates] })
                    })
            }
        })


        // this.setState({myFollowers: folks})
    }

    componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.replace(`/login`);
        }
        let data = { id: localStorage.getItem("id") }
        axios.post('/users/roomlist', data)
            .then((res) => {
                return res.data.response
            })
            .then((info) => {
                console.log()
                this.setState({
                    rooms: info
                })
            })
            .then(() => {
                this.roomers()
            })
            .catch(err => {
                toast.warning("Couldn't get data, an error occured")
            })

    }

    render() {

        const chat = (f) => {

            let room1 = {
                sender: localStorage.getItem('id'),
                room: localStorage.getItem('id') + f._id,
                receiver: f._id
            }
            let room2 = {
                sender: f._id,
                room: f._id + localStorage.getItem('id'),
                receiver: localStorage.getItem('id')
            }


            if (this.state.rooms.find(item => item.room == room1.room)) {
                let roo = this.state.rooms.find(item => item.room == room1.room)
                window.location = `/chat?name=${localStorage.getItem('username')}&room=${roo.room}`
                localStorage.setItem('id2', roo.receiver)
            }

            if (this.state.rooms.find(item => item.room == room2.room)) {
                let roo = this.state.rooms.find(item => item.room == room2.room)
                window.location = `/chat?name=${localStorage.getItem('username')}&room=${roo.room}`
                localStorage.setItem('id2', roo.receiver)
            }
        }

        return (
            <div>
                {localStorage.getItem('isVerified') !== "true" && <UnVerified /> ||
                    <div>
                        <div className="head">
                            <Header id={this.state.id} />
                        </div>
                        <br />
                        <br />
                        <br />
                        <p className="text">Your chat with people shows here</p>
                        <br/>
                        {this.state.myroomates.map((f) =>
                            <div className="f-pad">
                            <div className="followers-list">
                                {f.src && <img src={f.src} className="followers-img" />}
                                <div className="followers-name">
                                    <h6>{f.firstname} {f.lastname}</h6>
                                    <p>@{f.username}</p>
                                </div>
                                <a className="btn btn-primary" onClick={() => { chat(f) }}>Chat</a>
                            </div>
                            </div>
                        )
                        }

                        <Footer id={this.state.id} />

                    </div>}
                    <ToastContainer />
            </div>
        )
    }

}


export default Friends;