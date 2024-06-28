import React, { Component } from 'react';
import AssetAdminPage from "../actifs/AssetAdminPage";
import AssetPage from "../actifs_collab/AssetPage";
class Asset extends Component {
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
       { this.state.role==="ad_user" ?<AssetAdminPage/> : <AssetPage/> }
      </div>
    );
  }
}

export default Asset;