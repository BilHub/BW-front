import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Collapse} from 'react-bootstrap';
import {Trans, withTranslation} from 'react-i18next';
import {Notifications} from "./Notifications";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstName: "",
            lastName: "",
        };
    }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {

            this.setState({role: user.role});

        }

    }
    render() {
        return (
            <li className="nav-item nav-profile">
                <a href="!#" className="nav-link" onClick={evt => evt.preventDefault()}>
                    <div className="nav-profile-image">
                        <div className={"account-circle"}>
                            <i className={this.state.role === "ad_user" ?  "mdi mdi-account-edit": "mdi mdi-account"}></i>
                        </div>
                    </div>
                    <div className="nav-profile-text">

                        <span className="text-secondary text-small">
                            <Trans>{this.state.role === "ad_user" ?  "Manager": "utilisateur"}</Trans>
                        </span>
                    </div>

                </a>
            </li>
        )
    }
}
export default Profile
