import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withTranslation} from 'react-i18next';

export class Error404 extends Component {
    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="d-flex align-items-center text-center error-page bg-primary pt-5 pb-4 h-100">
                    <div className="row flex-grow">
                        <div className="col-lg-8 mx-auto text-white">
                            <div className="row align-items-center d-flex flex-row">
                                <div className="col-lg-6 text-lg-right pr-lg-4">
                                    <h1 className="display-1 mb-0">404</h1>
                                </div>
                                <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                                    <h2>{t("Désolé!")}</h2>
                                    <h3 className="font-weight-light">{t("La page que vous recherchez n'a pas été trouvée.")}</h3>
                                </div>
                            </div>
                            <div className="row mt-5">
                                <div className="col-12 text-center mt-xl-2">
                                    <Link className="text-white font-weight-medium"
                                          to="/dashboard">{t("Retour à l'Accueil")}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Error404)
