import React, { Component } from 'react';
import Abonnement from "../user-profile/Abonnement";
import AbonnementCollab from "../user-profile/AbonnementCollab";



class CommonAbonnement extends Component {
state = {
    role: ""

  }
componentDidMount() {
 const user = JSON.parse(localStorage.getItem('user'));
 this.setState({ role: user.role });
}
  render () {
    return (
      <div>
       { this.state.role==="ad_user" ?<Abonnement/> : <AbonnementCollab/> }
      </div>
    );
  }
}

export default CommonAbonnement;