import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./PageTitle";
import ContactInfo from "./ContactInfo";
import ContactSupport from "./ContactSupport";
import { withTranslation } from 'react-i18next';
class ContactPage extends Component {
  render() {
   const { t } = this.props;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title={t('Contact')} subtitle={t('Aperçu')} md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <Row>
          <Col lg="4">
            <ContactInfo />
          </Col>
          <Col lg="8">
            <ContactSupport />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withTranslation()(ContactPage);
