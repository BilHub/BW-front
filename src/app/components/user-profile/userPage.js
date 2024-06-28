import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./PageTitle";
import UserDetails from "./userDetails";
import UserAccountDetails from "./UserAccountDetails";
import { withTranslation } from 'react-i18next';


class UserProfile extends Component {
  render() {
  const { t } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title={t('Profil')} subtitle={t('Aperçu')} md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
          <Col lg="4">
            <UserDetails />
          </Col>
          <Col lg="8">
            <UserAccountDetails />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withTranslation()(UserProfile);
