import React, {Component} from 'react';
import {notifications} from "../../utils/constants"
import {Dropdown} from 'react-bootstrap';
import http from '../../http';
import {Trans} from 'react-i18next';
import {withTranslation} from 'react-i18next';


export class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
        }
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            http.get(notifications)
                .then(res => {
                    const notifications = res.data;
                    this.setState({notifications});
                    console.log('res', res)
                })
        }
    }

    render() {
        const {t} = this.props;

        return (
            <Dropdown alignRight>
                <Dropdown.Toggle className="nav-link count-indicator">
                    <i className="mdi mdi-bell"></i>
                    <span className="count-symbol bg-danger"></span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="preview-list navbar-dropdown">
                    <h6 className="p-3 mb-0"><Trans>Notification</Trans></h6>
                    <div className="dropdown-divider"></div>
                    {
                        this.state.notifications.map((item) => {
                            const {id, created_at, status, ticket_id} = item;
                            return (
                                <Dropdown.Item className="dropdown-item preview-item"
                                               href={`/brightwatch-demo/ticket-detail/${item.ticket_id}`}>
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-success">
                                            <i className="mdi mdi-message"></i>
                                        </div>
                                    </div>
                                    <div
                                        className="preview-item-content d-flex align-items-start flex-column justify-content-center">
                                        <h6 className="preview-subject ellipsis mb-1 font-weight-normal visible-overflow">
                                            <Trans>id: {ticket_id.toString()} | {t(status)}</Trans></h6>
                                        <p className="text-gray mb-0">
                                            {created_at}
                                        </p>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                </Dropdown.Item>
                            )
                        })}
                    {/*<Link to='/tickets-ouverts'><h6 className="p-3 mb-0 text-center cursor-pointer"><Trans>Voir toutes*/}
                    {/*    les notifications</Trans></h6></Link>*/}

                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default withTranslation()(Notifications)
