import React, {Component} from 'react';
import {Dropdown} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import {Trans, withTranslation} from 'react-i18next';
import AuthService from "../login/services/AuthService";
import {FR, GB} from 'country-flag-icons/react/3x2'
import Switch from 'react-switch';
import Alerts from "./Alerts";
import Notifications from "./Notifications";
import Obsolescence from "./Obsolescence";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            phone: "",
            country: "",
            email: "",
            company: "",
            count_tickets: "",
            nb_assets: "",
            language: "en",
            isEnglish: false,
            alerts: {},


        }
        this.changeLanguageFr = this.changeLanguageFr.bind(this);
        this.changeLanguageEn = this.changeLanguageEn.bind(this);
        this.toggleOffcanvas = this.toggleOffcanvas.bind(this);
        this.toggleRightSidebar = this.toggleRightSidebar.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    toggleOffcanvas() {
        document.querySelector('.sidebar-offcanvas').classList.toggle('active');
    }

    toggleRightSidebar() {
        document.querySelector('.right-sidebar').classList.toggle('open');
    }

    logOut() {
        AuthService.logout();
        this.props.history.push("/user-pages/login-1");

    }

    handleChange(checked) {
        const {i18n} = this.props;
        this.setState({isEnglish: checked});
        i18n.changeLanguage(checked ? 'en' : 'fr');
    }

    changeLanguageFr() {
        const {i18n} = this.props;
        i18n.changeLanguage('fr');
    }

    changeLanguageEn() {
        const {i18n} = this.props;
        i18n.changeLanguage('en');
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const auth = `Bearer ${user.token}`
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: auth
                }
            }
            this.setState({username: user.username});
            this.setState({firstName: user.prenom});
            this.setState({lastName: user.nom});
            this.setState({company: user.company});
            this.setState({phone: user.phone});
            this.setState({email: user.email});
            this.setState({nb_assets: user.nb_assets});


        }
    }

    render() {
        const {t} = this.props;

        return (
            <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <Link className="navbar-brand brand-logo" to="/"><img
                        style={{marginTop: '40px', marginLeft: '38px', width: '213px', height: '125px'}}
                        src={require('../../../assets/images/V4.png')} alt="logo"/></Link>
                    <Link className="navbar-brand brand-logo-mini" to="/"><img
                        src={require('../../../assets/images/logo-mini.png')} alt="logo"/></Link>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-stretch">
                    <button className="navbar-toggler navbar-toggler align-self-center" type="button"
                            onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
                        <span className="mdi mdi-menu"></span>
                    </button>

                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item">
                            <div>
                                {this.state.isEnglish ? <GB/> : <FR/>}

                                <Switch
                                    onChange={this.handleChange}
                                    checked={this.state.isEnglish}
                                    offColor="#bf062e"
                                    onColor="#EDEADE"
                                    onHandleColor="#bf062e"
                                    handleDiameter={15}
                                    uncheckedIcon={false}
                                    checkedIcon={false}
                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                    height={10}
                                    width={24}
                                    className="react-switch"
                                    id="material-switch"
                                    label="En"
                                />

                            </div>
                        </li>
                        <li className="nav-item">
                            {this.state.username ? <Alerts/> : null}
                        </li>
                        <li className="nav-item">
                            {this.state.username ? <Notifications/> : null}
                        </li>
                        <li className="nav-item">
                            {this.state.username ? <Obsolescence/> : null}
                        </li>
                        <li className="nav-item nav-profile">
                            <Dropdown alignRight>
                                <Dropdown.Toggle className="nav-link">

                                    <div className="nav-profile-text">
                                        <p className="mb-1 text-black">
                                            <Trans>{this.state.firstName} {this.state.lastName}</Trans></p>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="navbar-dropdown">
                                    <Dropdown.Item href="!#" onClick={evt => evt.preventDefault()}>
                                        <i className="mdi mdi-account mr-2 text-primary"></i>
                                        <Link to='/user-pages/details'> <Trans>{t("Profil")}</Trans> </Link>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="!#" onClick={this.logOut}>
                                        <i className="mdi mdi-logout mr-2 text-primary"></i>
                                        <Trans>{t("Se déconnecter")}</Trans>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>

                    </ul>
                    <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button"
                            onClick={this.toggleOffcanvas}>
                        <span className="mdi mdi-menu"></span>
                    </button>
                </div>
            </nav>
        );
    }
}

export default withTranslation()(withRouter(Navbar));
