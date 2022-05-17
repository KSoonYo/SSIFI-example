import React, { useState } from 'react'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import './navbar.css'
import logo from '../../assets/logo_white_background.jpg'
import { Link } from 'react-router-dom'

const Menu = () => (
  <>
    <p>
      <a href="https://ssifi-ai.com">Demo</a>
    </p>
    <p>
      <a href="https://lab.ssafy.com/kcw0360/ssifi">GitHub</a>
    </p>
    <p>
      <Link to="/ms/intro">Docs</Link>
    </p>
  </>
)
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="navbar-start">
        <button type="button">Get Started</button>
      </div>
      <div className="navbar-menu">
        {toggleMenu ? (
          <RiCloseLine color="#000" size={27} onClick={() => setToggleMenu(!toggleMenu)} />
        ) : (
          <RiMenu3Line color="#000" size={27} onClick={() => setToggleMenu(!toggleMenu)} />
        )}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <Menu />
              <div className="navbar-menu-container-links-start">
                <button type="button">Get Started</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
