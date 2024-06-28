import React, { Component } from 'react';
import TicketsOuverts from "../tickets/TicketsOuverts";
import TicketsOuvertsCollab from "../tickets_collab/TicketsOuvertsCollab";
class Tickets extends Component {
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
       { this.state.role==="ad_user" ?<TicketsOuverts/> : <TicketsOuvertsCollab/> }
      </div>
    );
  }
}

export default Tickets;