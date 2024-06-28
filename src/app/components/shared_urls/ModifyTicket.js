import React, { Component } from 'react';
import ModifyTicket from "../tickets/ModifyTicket";
import ModifyTicketCollab from "../tickets_collab/ModifyTicketCollab";
class ModifyTicketCommon extends Component {
constructor(props) {
    super(props);
this.state = {
    role: "",
   id:""
  }
  }
componentDidMount() {
 const user = JSON.parse(localStorage.getItem('user'));
 this.setState({ role: user.role });
  const id = this.props.match.params.id;
  this.setState({ id: id });
}
  render () {
  const {id} = this.state

    return (
      <div>
       { this.state.role==="ad_user" ?<ModifyTicket id={this.props.match.params.id} /> : <ModifyTicketCollab id={this.props.match.params.id} /> }
      </div>
    );
  }
}

export default ModifyTicketCommon;