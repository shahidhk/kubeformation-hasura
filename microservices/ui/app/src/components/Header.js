import React from 'react'
import '../styles/App.css'

const Header = () => (
  <div>
    <div className="jumbotron jumbotron-fluid header">
      <h1 className="display-4">kubeformation.sh</h1>
      <h4 className="display-6">Create declarative specifications for your managed Kubernetes cloud vendor</h4>
    </div>
    {/*
      <div className="container container-fluid">
        <p>
          With Kubernetes, it becomes possible to start making everything about your application declarative. As cloud vendors start providing managed Kubernetes services, provisioning a Kubernetes cluster via the vendor’s API becomes declarative as well.
        </p>
        <p>
          Kubeformation is a simple web UI and CLI that helps you create “Google Deployment manager” or “Azure Resoure Manager” templates which are a little painful to create by hand.
        </p>
        <p>
          Once you have this file, you can run your cloud vendor CLI on it to provision your cluster. You can edit this file to add vendor specific configuration too
        </p>
        <br/>
        <br/>
      </div>
      */}
  </div>
)

export default Header
