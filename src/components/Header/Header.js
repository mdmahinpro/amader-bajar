import React from 'react'
import logo from '../../images/amaderbajar.PNG'
import './Header.css'


function Header() {
    
    return (
        <div className="logo">
            <img src={logo} alt={logo}></img>
            <nav className="navbar">
                <a href="/home">Home</a>
                <a href="/review">Review</a>
                <a href="/inventory">Inventory</a>
            </nav>
        </div>
    )
}

export default Header
