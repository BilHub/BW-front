import React, { Component } from 'react';
import Collab from "../user-profile/collab";
import ListeCollabRoleCollab from "../user-profile/ListeCollabRoleCollab";



class CommonCollab extends Component {
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
       { this.state.role==="ad_user" ?<Collab/> : <ListeCollabRoleCollab/> }
      </div>
    );
  }
}

export default CommonCollab;