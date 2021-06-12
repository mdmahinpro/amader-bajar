import React from 'react'
import logo from '../../images/Minimal Cake shop Bakery Logo.png'
import './Header.css'


function Header() {
    return (
        <div className="logo">
            <img src={logo} alt={logo}></img>
            <nav className="navbar">
                <a href="/home">Home</a>
                <a href="/cart">Cart</a>
                <a href="/inventory">Inventory</a>
            </nav>
        </div>
    )
}

export default Header
