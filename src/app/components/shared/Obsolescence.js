import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {notif_obsolescence, notif_obsolescence_seen} from "../../utils/constants"
import {Dropdown} from 'react-bootstrap';
import axios from "axios";
import {Trans} from 'react-i18next';
import http from "../../http";
import {withTranslation} from 'react-i18next';
import AlertTemplate from 'react-alert-template-basic'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import { useAlert } from 'react-alert'
import { withAlert } from 'react-alert'

export class obsolescences extends Component {
    constructor(props) {
        super(props);
        this.state = {

            obsolescences: [],


        }
    }

    async componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            await http.get(notif_obsolescence)
                .then(res => {
                    const obsolescences = res.data;
                    this.setState({obsolescences});
                })
        }
        let not = true
        this.state.obsolescences.forEach((item)=>{
            console.log(item)
            if (!item.read) {
                http.put(notif_obsolescence_seen+item.id.toString(), ).then(r => {})
                if (not){
                    this.props.alert.show('consultez vos notifications d\'obsolescence.')
                    not = false
                }
            }
        })

    }

    render() {
        const {t} = this.props;

        return (

            <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                    <i className="mdi mdi-alarm-light"></i>
                    <span className="count-symbol bg-danger"></span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="preview-list navbar-dropdown">
                    <h6 className="p-3 mb-0"><Trans>{t("Obsolescence")}</Trans></h6>
                    <div className="dropdown-divider"></div>
                    {
                        this.state.obsolescences.map((item) => {

                            const { eol, product_cpe  } = item;
                            return (
                                <Dropdown.Item className="dropdown-item preview-item"
                                               onClick={evt => evt.preventDefault()}>
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-danger">
                                            <i className="mdi mdi-alarm-light"></i>
                                        </div>
                                    </div>
                                    <div
                                        className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal"><Trans>{product_cpe}</Trans></h6>
                                        <p className="text-gray mb-0">
                                            <Link to="/list-obsolescence">
                                                {eol}
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                </Dropdown.Item>


                            )
                        })}
                    <Link to='/list-obsolescence'><h6 className="p-3 mb-0 text-center cursor-pointer"><Trans>{t("Voir toutes les notifications")}</Trans></h6></Link>

                </Dropdown.Menu>
            </Dropdown>

        )
    }
}

export default withAlert()(withTranslation()(obsolescences))
//product cpe, eol, version