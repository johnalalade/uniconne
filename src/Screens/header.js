import React,{useState} from 'react';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBars, faBell} from '@fortawesome/free-solid-svg-icons';
import {Nav, Tooltip} from 'reactstrap';
import Logo from '../Images/oau-uniconne.jpg';
import './style.css';

 

function Header(prop) {
  const[tooltipOpen, setTooltipOpen] = useState(false);
  
  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <Nav className="header">
  
     <NavLink activeClassName="current" className="navlink" to={`/setup?oau=true`}> <FontAwesomeIcon icon={faBars} size="lg"></FontAwesomeIcon></NavLink>
    

  
      <NavLink className="navlink" to={`/home?oau=true`}><img src={Logo} className="img-h" alt="logo"></img></NavLink>
    

  
      <NavLink className="navlink delivery" to="#" id="delivery"> <FontAwesomeIcon icon={faBell} size="lg"></FontAwesomeIcon>
      <Tooltip placement="left" isOpen={tooltipOpen} target="delivery" toggle={toggle}>Notifications: No notifications yet</Tooltip>
      </NavLink>
    
    </Nav>
  );
}

export default Header;
//  <nav className="header">  </nav> 
// /${prop.id}
//<Tooltip placement="left" isOpen={tooltipOpen} target="delivery" toggle={toggle}>Delivery: Coming Soon</Tooltip>
// disabled 