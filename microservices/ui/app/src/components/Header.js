import React from 'react'
import '../styles/App.css'
const image = require('../staticContent/images/Kubeformation.svg')

const Header = () => (
  <div>
    <div className="jumbotron jumbotron-fluid header">
      <h1 className="display-4">kubeformation.sh</h1>
      <h4 className="display-6">Create declarative cluster specifications for your managed Kubernetes vendor (GKE, AKS)</h4>
      <img className='header-img' src={image} alt="HeaderImage"/>
    </div>
  </div>
)

export default Header
