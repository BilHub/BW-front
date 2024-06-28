import React, {Component} from 'react';
import {withTranslation} from 'react-i18next';


export class AbonnementCollab extends Component {
    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="d-flex align-items-center text-center error-page bg-dark pt-5 pb-4 h-100">
                    <div className="row flex-grow">
                        <div className="col-lg-7 mx-auto text-white">
                            <div className="row align-items-center d-flex flex-row">
                                <div className="col-lg-6 text-lg-right pr-lg-4">
                                    <h1 className="display-1 mb-0">401</h1>
                                </div>
                                <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                                    <h2>{t("Désolé!")}</h2>
                                    <h3 className="font-weight-light">{t("Vous n'êtes pas autorisé à accéder à cette page!")}</h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(AbonnementCollab)
