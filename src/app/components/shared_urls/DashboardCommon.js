import React, { Component } from 'react';
import Dashbooard from "../dashboard/Dashboard";
import DashboardCollab from "../dashboard_collab/DashboardCollab";



class DashboardCommon extends Component {
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
       { this.state.role==="ad_user" ?<Dashbooard/> : <DashboardCollab/> }
      </div>
    );
  }
}

export default DashboardCommon;