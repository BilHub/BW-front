import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import { withTranslation } from 'react-i18next';
import http from "../../http";
import {user_overview_url} from "../../utils/constants"


class UserAccountDetails extends Component {
 constructor(props){
    super(props)

  this.state = {
   nb_tickets: '',
   nb_assets : '',
   description : '',
   nb_services : '',
   unreadTickets: '',



  }

  }

componentDidMount() {
 const user = JSON.parse(localStorage.getItem('user'));
 const role  = user.role
 this.setState({ role : role  });
 const auth=`Bearer ${user.token}`
const config = {
         headers: {
            'Content-Type': 'application/json',
             Authorization: auth }
           }

 if(user){
 const auth=`Bearer ${user.token}`
const config = {
         headers: {
            'Content-Type': 'application/json',
             Authorization: auth }
           }
   http.get(`${user_overview_url}${user.user_id}`)
            .then(res => {
                const data = res.data;
                console.log('data', data)
                this.setState({nb_assets: data.nb_actifs})
                this.setState({nb_tickets: data.nb_tickets})
                this.setState({nb_services: data.nb_services})
                this.setState({unreadTickets: data.count_unread_tickets})

            })

}
  }



   render () {

   const { t } = this.props;
    return (
  <Card small className="mb-4">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{t('Détails')}</h6>
    </CardHeader>
    <ListGroup flush>
      <ListGroupItem className="p-3">
        <Row>
          <Col>
            <Form>
              <Row form>
                {/* First Name */}
                <Col md="6" className="form-group">
                    <strong className="text-muted d-block mb-2">{t('Nombre de services')} </strong>
                 <span >
              {this.state.nb_services}
            </span>
                </Col>
                {/* Last Name */}
                <Col md="6" className="form-group">
                  <div className="progress-wrapper">
          <strong className="text-muted d-block mb-2">
            {t("Nombre d'actifs")}
          </strong>

            <span >
              {this.state.nb_assets}
            </span>

        </div>
                </Col>
              </Row>
              <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                   <strong className="text-muted d-block mb-2">{t('Nombre de tickets ouverts')}  </strong>
                   <span >
              {this.state.nb_tickets}
            </span>
                </Col>
                {/* Password */}

              </Row>

               <Row form>
                {/* Email */}
                <Col md="6" className="form-group">
                   <strong className="text-muted d-block mb-2">{t('Nombre de tickets non lus')}  </strong>
                   <span >
              {this.state.unreadTickets}
            </span>
                </Col>
                {/* Password */}

              </Row>




            </Form>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  </Card>
);

}

}
export default withTranslation()(UserAccountDetails);