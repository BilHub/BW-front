import React, { Component } from 'react';
import {withTranslation} from 'react-i18next';

class Footer extends Component {
  render () {
      const {t} = this.props;

      return (
      <footer className="footer">
        <div className="d-sm-flex justify-content-center ">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">{t("Tous droits réservés")} © <a href="https://www.brightway.fr/" target="_blank" rel="noopener noreferrer">brightway </a>2016 - 2023</span>

        </div>
      </footer> 
    );
  }
}

export default withTranslation()(Footer);