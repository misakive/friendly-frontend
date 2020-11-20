import React, { useState } from 'react';
import './styles.css';
import logo from '../../assets/friendly-v.svg';
import { FiPower } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import MapFriends from '../../components/MapFriends';

function Friends() {
  const history = useHistory()
	const [userLogged] = useState(JSON.parse(localStorage.getItem('@Friend/data')) || null);

  const handleLogout = () =>{
		localStorage.clear()
    history.push('/')
  }
  
  return (
		<div className= "main-container">
      <header>
        <img src={logo} alt="Friendly" className="logo" />
        <span> Bem-vinda, {userLogged.name} </span>

        <Link className="button" onClick={()=>history.goBack()}> Procurar Amigos </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#3853e3" />
        </button>
        </header>

        <MapFriends className="maps" />
    </div>
  );
}

export default Friends;