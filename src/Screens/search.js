import React, { Component, useState } from 'react';
import Header from './header';
//import {Redirect} from 'react-router-dom'
import axios from './axios';
import './style.css';
import UnVerified from './unverified'

import Logo from '../Images/oau-logo.jpg';
import { Spinner } from 'reactstrap';
// import CardFooter from 'reactstrap/lib/CardFooter';
// import Row from 'reactstrap/lib/Row';
// import Col from 'reactstrap/lib/Col';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'


const picker = Math.round((Math.random() * 10) + 1)
const Placeholder = () => {
  return (
    <div>
      <br />
      <br />

      <FontAwesomeIcon icon={faSearch} className="search-wait"></FontAwesomeIcon>

    </div>
  )
}

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

    setModal(!modal)

    if (fword.indexOf(localStorage.getItem("id")) == -1) {
      fword.push(localStorage.getItem("id"))

    }
    else {
      setFword(fword.filter((u) => u !== localStorage.getItem("id")))

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

const Cards2 = (prop) => {
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
          {prop.img && prop.srctype.indexOf('image') !== -1 && <img width="100%" src={prop.img} alt="prod" /> || prop.img && <video class="video" src={prop.img} width="100%" controls ></video>}

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


// distance
const distance = (long1, lat1, long2, lat2) => {

  const toRadians = (num) => {
    let constant = Math.PI / 180;
    return (constant * num)
  }

  long1 = toRadians(long1);
  long2 = toRadians(long2);
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  const dlong = long2 - long1;
  const dlat = lat2 - lat1;

  const anss = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlong / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(anss));

  // Radius of earth in kilometers. Use 3956  
  // for miles 
  const ra = 6371;

  const conclu = c * ra
  return (Math.round(conclu));

}





class Search extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem('token'),
      search: "",
      found: null,
      users: [],
      posts: [],
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
  // filter
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
  }

  searchbox = (ev) => {
    let value = ev.target.value
    this.setState({ search: value })
  }

  search = (ev) => {
    ev.preventDefault()

    this.setState({ found: "searching" })

    let value = { data: this.state.search }
    if (value.data === "") {
      toast.error(`Please Type Something to search`)
      this.setState({ found: null })
      return
    }

    axios.post('/users/search', value)
      .then((data) => {
        return data.data.response
      })
      // .then(ans => ans.map(this.dateChecker))
      // .then(dd => dd.filter(this.datefilter))
      .then((result) => {
        result.sort(this.customSort);
        return result
      })
      .then((res) => {
        res.slice(0, 1001)
        return res
      })
      //  .then(info => {
      //   info.forEach(this.commentFixer)
      //   return info
      // })
      .then(conclusion => conclusion.filter(this.customfilter))
      .then(data => {

        if (data[0]) {
          this.setState({
            users: data,
            found: "done"
          })
        }
        else {
          toast.dark("Sorry, No user related to you search was found. don't add '@' before a username search")
          this.setState({
            products: data,
            found: null
          })
        }
      })

      .catch(err => {
        toast.error("Couldn't Get Data, Please Try Again.")
        this.setState({ found: null })
      })

    // axios.post('/store/search', search)
    // .then((res)=>this.setState((prev)=> {products: [...prev, res]}))

    let data = { data: this.state.search }
    axios.post('/posts/search', data)

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

      // .then(conclusion => conclusion.filter(this.customfilter))
      .then(dd => dd.filter(this.datefilter))
      // .then(dd => dd.filter(this.followfilter))
      .then(data => {

        this.setState({ found: "done" });
        this.setState({ posts: data })
      })
      // .then(data => this.setState({products: data.data.response}))
      // .then(res => console.log(this.state.products))
      .catch(err => { toast.error("Couldn't Get Data, Please Try Again.") })
  }

  render() {

    const liker = (id) => {
      let comm = {
        token: this.state.token,
        postID: id,
        like: this.state.id
      }
      axios.post('/posts/like', comm)
        //.then(() => console.log("liked"))
        //.catch((err) => console.log("Couldn't add like to post"))
    }

    const comm = (comment, id) => {
      let comm = {
        token: this.state.token,
        postID: id,
        comment: { username: this.state.username, src: this.state.src, comment }
      }
      axios.post('/posts/comment', comm)
        .then(() => toast.success("Comment added"))
        .catch((err) => toast.error("Couldn't add comment to post"))
    }

    const follower = (id) => {
      let comm = {
        token: this.state.token,
        id: id,
        follower: this.state.id
      }
      axios.post('/users/follow', comm)
        //.then(() => console.log("follow"))
        //.catch((err) => console.log("Couldn't add follow to student"))
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
            <Header id={this.state.id} />
            <br />
            <br />
            <div className="search-container">
              <div className="search-panel">
                <form onSubmit={this.search}>
                  <input type="search" name="searchbox" placeholder="Name/User name..." className="searchbox" value={this.state.search} onChange={this.searchbox} />
                  <button type="submit" className="btn btn-search btn-primary"> <FontAwesomeIcon icon={faSearch} size="lg"></FontAwesomeIcon> </button>
                </form>
              </div>
            </div>
            {this.state.found === null && <div className="search-holder">
              <Placeholder /></div> || this.state.found === "searching" && <div className="spin"><Spinner className="spinner" color="primary" size="lg" /> </div> || this.state.found === "done" &&
              //  <Row className="mx-md-5">
              //   <Col>
              <div className="search-card-div">
                {this.state.users.map((user) =>
                  <Cards key={user._id} createdAt={user.createdAt} firstname={user.firstname} lastname={user.lastname} username={user.username} followers={user.followers} phone={user.phone} twitter={user.twitter} telegram={user.telegram}
                    about={user.about} img={user.src}
                    department={user.department}
                    level={user.level}
                    follower={follower} friends={user.friends}
                    id={user._id} friender={friender}
                  />
                )}
                {/* Posts/News */}
                {this.state.posts[0] && <p align="center">Posts/News</p>}
                {this.state.posts.map((post) =>
                  <div>
                    <Cards2 key={post._id} createdAt={post.createdAt} firstname={post.firstname} lastname={post.lastname} username={post.username} owner={post.owner}
                      post={post.post} img={post.src}
                      department={post.department}
                      level={post.level}
                      srctype={post.srctype}
                      comm={comm} liker={liker}
                      comments={post.comments} likes={post.likes} id={post._id}
                      news={post.news}
                      sponsored={post.sponsored} />
                  </div>
                )}

              </div>
              //   </Col>

              //  </Row> 
            }
            <ToastContainer />
            <Footer id={this.state.id} />
          </div>
        }
      </div>
    );
  }
}

export default Search;
