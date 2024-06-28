import React, { Component } from 'react';
import TicketsDetail from "../tickets/TicketDetail";
import TicketsDetailCollab from "../tickets_collab/TicketDetailCollab";
class DetailTicketCommon extends Component {
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
       { this.state.role==="ad_user" ?<TicketsDetail id={this.props.match.params.id}/> : <TicketsDetailCollab id={this.props.match.params.id}/> }
      </div>
    );
  }
}

export default DetailTicketCommon;