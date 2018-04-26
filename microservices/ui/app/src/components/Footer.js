import React from 'react'
import '../styles/App.css'
const image = require('../staticContent/images/hasura-logo.png')

const Footer = () => (
  <div className="wd_100">
    <div className="wd_60 display_inline">
      <div className="logo">
        <a href="http://www.hasura.io" target="_blank"><img className="logo_img" src={image} alt="Logo"/></a>
      </div>
      <div className="description add_padd_bottom">
        Brought to you with
        <span className="red_color">❤️</span> by <a href="http://www.hasura.io" target="_blank">hasura.io</a>
      </div>
    </div>
    <div className="wd_40 display_inline">
      <div className="description add_padd_bottom_small">
        <a href="https://github.com/hasura/gitkube" target="_blank">Github</a>
      </div>
      <div className="description add_padd_bottom_small">
        <a href="https://twitter.com/gitkube" target="_blank">Twitter</a>
      </div>
      <div className="description add_padd_bottom_small">
        <a href="https://discord.gg/SX9Rte5" target="_blank">Discord</a>
      </div>
    </div>
  </div>
)

export default Footer
