import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-left">
          <img className='logo-img' src={assets.logo_bottom} alt='logo-bottom'/>
          <p>Food prep is a full stack project designed for hands-on teaching, helping students learning full-stack development. It's used by FACEPrep, an ed-tech company focused on equipping students with the skills to achieve their carrer aspiration.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt='facebook_icon' />
             <img src={assets.twitter_icon} alt='twitter_icon' />
              <img src={assets.linkedin_icon} alt='linkedin_icon' />
          </div>
        </div>
        <div className="footer-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Courses</li>
            <li>Reviews</li>
          </ul>
        </div>
        <div className="footer-right">
         <h2>Get in touch</h2>
         <ul>
          <li>+91 9177895782</li>
          <li>muzammilshaik1525p@gmail.com</li>
         </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2025 © FoodPrep.All rights reserved.</p>
    </div>
  )
}

export default Footer
