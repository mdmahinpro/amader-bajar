import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import logo from '../../images/amaderbajar.PNG'
import './Header.css'

function Header() {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext); 
    return (
        <div className="logo">
            <img src={logo} alt={logo}></img>
            <nav className="navbar">
                <Link to="/home">Home</Link>
                <Link to="/review">Review</Link>
                <Link to="/inventory">Inventory</Link>
                <button onClick={()=>setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    )
}

export default Header
