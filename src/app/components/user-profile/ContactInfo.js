import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  Button,
  ListGroup,
  ListGroupItem,
  Progress
} from "shards-react";

import { Trans } from 'react-i18next';
import { withTranslation } from 'react-i18next';
class ContactInfo extends Component {
constructor(props){
    super(props)
 this.state = {
    userDetails: {
      name: "Brightway",
      avatar: require("./assets/images/logo-brightway.png"),
      adresse : <Trans> Adresse </Trans>,
      adresseValue: "16 rue Troyon 92310 Sèvres",
      phoneNumberTitle: 'Téléphone',
      phoneNumberValue: '0145343538',
      emailTitle: 'Email',
      emailValue: 'contact@brightwatch.fr',
    }

  }
}
  render() {
    const { t } = this.props;
    return (
      <Card small className="mb-4 pt-3">
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
            <img
              src={this.state.userDetails.avatar}
              alt={this.state.userDetails.name}
              width="110"
            />
          </div>
          <h4 className="mb-0">{this.state.userDetails.name}</h4>
          <span className="text-muted d-block mb-2">{this.state.userDetails.jobTitle}</span>

          <a href="https://brightway.fr/" target="_blank" rel="noopener noreferrer">{t('Visiter le site web')}</a>


        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="px-4">
            <div className="progress-wrapper">
              <strong className="text-muted d-block mb-2">
                {t('Adresse')}
              </strong>

                <span >
                  {this.state.userDetails.adresseValue}
                </span>

            </div>
          </ListGroupItem>
           <ListGroupItem className="px-4">
            <div className="progress-wrapper">
              <strong className="text-muted d-block mb-2">
                 {t('Téléphone')}
              </strong>

                <span >
                  {this.state.userDetails.phoneNumberValue}
                </span>

            </div>
          </ListGroupItem>
           <ListGroupItem className="px-4">
            <div className="progress-wrapper">
              <strong className="text-muted d-block mb-2">
                {this.state.userDetails.emailTitle}
              </strong>

                <span >
                  {this.state.userDetails.emailValue}
                </span>

            </div>
          </ListGroupItem>
        </ListGroup>
      </Card>
    );
  }
}

export default withTranslation()(ContactInfo);
