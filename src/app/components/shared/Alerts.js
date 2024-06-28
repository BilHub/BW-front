import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {list_alerts} from "../../utils/constants"
import {Dropdown} from 'react-bootstrap';
import axios from "axios";
import {Trans} from 'react-i18next';
import http from "../../http";
import {withTranslation} from 'react-i18next';


export class Alerts extends Component {
    constructor(props) {
        super(props);
        this.state = {

            alerts: [],


        }
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            http.get(list_alerts)
                .then(res => {
                    const alerts = res.data;
                    this.setState({alerts});
                    console.log('res', res)
                })
        }
    }

    render() {
        const {t} = this.props;

        return (

            <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                    <i className="mdi mdi-email-outline"></i>
                    <span className="count-symbol bg-danger"></span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="preview-list navbar-dropdown">
                    <h6 className="p-3 mb-0"><Trans>{t("Alertes")}</Trans></h6>
                    <div className="dropdown-divider"></div>
                    {
                        this.state.alerts.map((item) => {

                            const {id, created_at} = item;
                            return (
                                <Dropdown.Item className="dropdown-item preview-item"
                                               onClick={evt => evt.preventDefault()}>
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-danger">
                                            <i className="mdi mdi-clipboard-alert"></i>
                                        </div>
                                    </div>
                                    <div
                                        className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><Trans>{t("Nouvelle alerte")}</Trans></h6>
                                        <p className="text-gray mb-0">
                                            {created_at}
                                        </p>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                </Dropdown.Item>


                            )
                        })}
                    <Link to='/tickets-ouverts'><h6 className="p-3 mb-0 text-center cursor-pointer"><Trans>{t("Voir toutes les notifications")}</Trans></h6></Link>

                </Dropdown.Menu>
            </Dropdown>

        )
    }
}

export default withTranslation()(Alerts)
