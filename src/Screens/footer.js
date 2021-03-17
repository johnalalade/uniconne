import React from 'react';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faSearch, faUniversity, faUsers } from '@fortawesome/free-solid-svg-icons';
import './style.css';
 

function Footer(prop) {
  return (
    <nav className="tab">

       <NavLink activeClassName="current" className="navlink" to={`/home?oau=true`}> 
       <FontAwesomeIcon icon={faUniversity} size="lg" />
       </NavLink>

       

       <NavLink className="navlink" activeClassName="current" to={`/students?oau=true`}>
         <FontAwesomeIcon icon={faUsers} size="lg"></FontAwesomeIcon>
         </NavLink>

         <NavLink className="navlink" activeClassName="current" to={`/friends?oau=true`}> 
      <FontAwesomeIcon icon={faComment} size="lg"></FontAwesomeIcon>
      </NavLink>

      <NavLink className="navlink" activeClassName="current" to={`/search?oau=true`}> 
      <FontAwesomeIcon icon={faSearch} size="lg"></FontAwesomeIcon>
      </NavLink>
      
    </nav>
  );
}

export default Footer;
