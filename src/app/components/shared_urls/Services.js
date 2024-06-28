import React, { Component } from 'react';
import ListServices from "../services/ListServices";
import ListServicesCollab from "../services_collab/ListServicesCollab";
class Services extends Component {
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
       { this.state.role==="ad_user" ?<ListServices/> : <ListServicesCollab/> }
      </div>
    );
  }
}

export default Services;