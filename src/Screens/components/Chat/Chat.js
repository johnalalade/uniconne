import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import axios from '../../axios'

import './Chat.css';
import Header from "../../header";
import Footer from "../../footer";

const ENDPOINT = '/';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(localStorage.getItem('id2'))
  const [sender, setSender] = useState(localStorage.getItem('id'))


  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message,receiver,sender,room, () => setMessage(''));
    }
  }

  const point = '/users/messagelist'

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    axios.post(point, {id: localStorage.getItem('id')})
    .then((data)=> {
     return data.data.response.filter((u) =>  u.message.room == room)
    })
    .then((data) => {
      let m = data.reverse()
      setMessages(messages => [...messages,...m])
    })
  }, [])


  return (
    // <div className="outerContainer">
      <div className="container">
          {/* <InfoBar room={'Unicone chat'} /> */}
          <Header />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
          <Footer/>
      </div>
    // </div>
  );
}

export default Chat;
