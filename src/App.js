import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import './App.css';

import SetUp from './Screens/setup';
import Home from './Screens/home';
import Logins from './Screens/login';
import Friends from './Screens/friends';
import Search from './Screens/search';
// import SetUp from './screen/setup';
import People from './Screens/people';

import Policy from './Screens/policy';
import Password from './Screens/password';
import Profile from './Screens/profile';
import About from './Screens/about';
import SignUp from './Screens/signUp';
import Retrive from './Screens/retrive';
import Chat from './Screens/components/Chat/Chat';
import Privacy from './Screens/privacy';
import Verify from './Screens/verify';


function App() {
  return (
    <div>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={SignUp}/>
            {/* <Route path='/register' component={SignUp}/>
            
            
            <Route path="/details"component={Details}/>
             */}
            <Route path="/verify/:id" component={Verify}/>
            <Route path='/login' component={Logins}/>
            <Route path="/students" component={People}/>
           <Route path="/home" component={Home}/>
           <Route path="/chat" component={Chat}/>
           <Route path="/friends" component={Friends}/>
           <Route path="/search" component={Search}/>
           <Route path="/setup" component={SetUp}/>
           <Route path="/profile" component={Profile}/>
           <Route path="/password" component={Password}/>
           <Route path="/retrive/:id" component={Retrive}/>
           <Route path="/aboutus" component={About}/>
           <Route path="/policy" component={Policy}/>
           <Route path="/privacy" component={Privacy}/> 
            {/*  

            
            
            
            
            
            
           */}

          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
