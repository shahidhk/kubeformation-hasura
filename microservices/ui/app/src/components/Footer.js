import React from 'react'
import '../styles/App.css'
const image = require('../staticContent/images/hasura-logo.png')

const Footer = () => (
  <div className="footer">
    <hr />
    <div className="wd_60 display_inline">
      <div className="logo">
        <a href="http://www.hasura.io" target="_blank" rel="noopener noreferrer">
          <img className="image" src={image} alt="Logo"/>
        </a>
      </div>
      <div className="description bottomPadding">
        Brought to you with &nbsp;
        <span className="red_color">❤️</span> &nbsp;
        by &nbsp;
        <a href="http://www.hasura.io" target="_blank" rel="noopener noreferrer">
          hasura.io
        </a>
      </div>
    </div>
  </div>
)

export default Footer
