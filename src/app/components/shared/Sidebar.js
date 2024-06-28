import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Collapse} from 'react-bootstrap';
import {Trans} from 'react-i18next';
import Profile from "./Profile";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstName: "",
            lastName: "",
        };

    }
    toggleMenuState(menuState) {
        if (this.state[menuState]) {
            this.setState({[menuState]: false});
        } else if (Object.keys(this.state).length === 0) {
            this.setState({[menuState]: true});
        } else {
            Object.keys(this.state).forEach(i => {
                this.setState({[i]: false});
            });
            this.setState({[menuState]: true});
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
            const user = JSON.parse(localStorage.getItem('user'));

            if (user) {
                this.setState({role: user.role});
            }
        }


    }

    onRouteChanged() {
        document.querySelector('#sidebar').classList.remove('active');
        Object.keys(this.state).forEach(i => {
            this.setState({[i]: false});
        });

        const dropdownPaths = [
            {path: '/apps', state: 'appsMenuOpen'},
            {path: '/basic-ui', state: 'basicUiMenuOpen'},
            {path: '/advanced-ui', state: 'advancedUiMenuOpen'},
            {path: '/form-elements', state: 'formElementsMenuOpen'},
            {path: '/tables', state: 'tablesMenuOpen'},
            {path: '/maps', state: 'mapsMenuOpen'},
            {path: '/icons', state: 'iconsMenuOpen'},
            {path: '/charts', state: 'chartsMenuOpen'},
            {path: '/user-pages', state: 'userPagesMenuOpen'},
            {path: '/error-pages', state: 'errorPagesMenuOpen'},
            {path: '/general-pages', state: 'generalPagesMenuOpen'},
            {path: '/ecommerce', state: 'ecommercePagesMenuOpen'},
            {path: '/actifs', state: 'actifsPagesMenuOpen'},
            {path: '/produits-vulnerables', state: 'actifsPagesMenuOpen'},
            {path: '/products', state: 'actifsPagesMenuOpen'},
            {path: '/tickets-ouverts', state: 'ticketsPagesMenuOpen'},
            {path: '/tickets-fermes', state: 'ticketsPagesMenuOpen'},
            {path: '/services-liste', state: 'servicesPagesMenuOpen'},
            {path: '/abonnement', state: 'userPagesMenuOpen'},
            {path: '/collab', state: 'userPagesMenuOpen'},
            {path: '/user-pages', state: 'userPagesMenuOpen'},


        ];

        dropdownPaths.forEach((obj => {
            if (this.isPathActive(obj.path)) {
                this.setState({[obj.state]: true})
            }
        }));
    }

    render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <ul className="nav">
                    <Profile></Profile>
                    <li className={this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item'}>
                        <Link className="nav-link" to="/dashboard">
                            <span className="menu-title"><Trans>Tableau de bord</Trans></span>
                            <i className="mdi mdi-home menu-icon" style={{color: '#352f2f'}}></i>
                        </Link>
                    </li>
                    <li className={this.isPathActive('/actifs') ? 'nav-item active' : 'nav-item'}>
                        <div className={this.state.actifsPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                             onClick={() => this.toggleMenuState('actifsPagesMenuOpen')} data-toggle="collapse">
                            <span className="menu-title"><Trans>Actifs</Trans></span>
                            <i className="menu-arrow" style={{color: '#352f2f'}}></i>
                            <i className="mdi mdi-crosshairs-gps menu-icon" style={{color: '#352f2f'}}></i>
                        </div>
                        <Collapse in={this.state.actifsPagesMenuOpen}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"><Link
                                    className={this.isPathActive('/actifs-liste') ? 'nav-link active' : 'nav-link'}
                                    to="/actifs-liste"><Trans>Liste des actifs</Trans></Link></li>
                                    <li className="nav-item"><Link
                                    className={this.isPathActive('/products') ? 'nav-link active' : 'nav-link'}
                                    to="/products"><Trans>Liste des produits</Trans></Link></li>

                                <li className="nav-item"><Link
                                    className={this.isPathActive('/produits-vulnerables') ? 'nav-link active' : 'nav-link'}
                                    to="/produits-vulnerables"><Trans>Produits vulnérables</Trans></Link></li>

                            </ul>
                        </Collapse>
                    </li>
                  <li className={this.isPathActive('/list-obsolescence') ? 'nav-item active' : 'nav-item'}>
                    <Link className="nav-link" to="/list-obsolescence">
                      <span className="menu-title"><Trans>Obsolescence</Trans></span>
                      <i className="mdi mdi-alarm-light menu-icon" style={{color: '#352f2f'}}></i>
                    </Link>
                  </li>
                    <li className={this.isPathActive('/tickets-ouverts') ? 'nav-item active' : 'nav-item'}>
                        <div className={this.state.ticketsPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                             onClick={() => this.toggleMenuState('ticketsPagesMenuOpen')} data-toggle="collapse">
                            <span className="menu-title"><Trans>Tickets</Trans></span>
                            <i className="menu-arrow" style={{color: '#352f2f'}}></i>
                            <i className="mdi mdi-format-list-bulleted menu-icon" style={{color: '#352f2f'}}></i>
                        </div>
                        <Collapse in={this.state.ticketsPagesMenuOpen}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"><Link
                                    className={this.isPathActive('/tickets-ouverts') ? 'nav-link active' : 'nav-link'}
                                    to="/tickets-ouverts"><Trans>Tickets ouverts</Trans></Link></li>
                                <li className="nav-item"><Link
                                    className={this.isPathActive('/tickets-fermes') ? 'nav-link active' : 'nav-link'}
                                    to="/tickets-fermes"><Trans>Tickets fermés</Trans></Link></li>

                            </ul>
                        </Collapse>
                    </li>
                    <li className={this.isPathActive('/services-liste') ? 'nav-item active' : 'nav-item'}>
                        <div className={this.state.servicesPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                             onClick={() => this.toggleMenuState('servicesPagesMenuOpen')} data-toggle="collapse">
                            <span className="menu-title"><Trans>Services</Trans></span>
                            <i className="menu-arrow" style={{color: '#352f2f'}}></i>
                            <i className="mdi mdi-table-large menu-icon" style={{color: '#352f2f'}}></i>
                        </div>
                        <Collapse in={this.state.servicesPagesMenuOpen}>
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"><Link
                                    className={this.isPathActive('/services-liste') ? 'nav-link active' : 'nav-link'}
                                    to="/services-liste"><Trans>Liste des services</Trans></Link></li>
                            </ul>
                        </Collapse>
                    </li>
                    <li className={this.isPathActive('/user-pages/details') ? 'nav-item active' : 'nav-item'}>
                        <div className={this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                             onClick={() => this.toggleMenuState('userPagesMenuOpen')} data-toggle="collapse">
                            <span className="menu-title"><Trans>Paramètres</Trans></span>
                            <i className="menu-arrow" style={{color: '#352f2f'}}></i>
                            <i className="mdi mdi-contacts menu-icon" style={{color: '#352f2f'}}></i>
                        </div>
                        <Collapse in={this.state.userPagesMenuOpen}>
                            <ul className="nav flex-column sub-menu">


                                <li className="nav-item"><Link
                                    className={this.isPathActive('/abonnement') ? 'nav-link active' : 'nav-link'}
                                    to="/abonnement"><Trans>Abonnement</Trans></Link></li>

                                <li className="nav-item"><Link
                                    className={this.isPathActive('/collab') ? 'nav-link active' : 'nav-link'}
                                    to="/collab"><Trans>Collaborateurs</Trans></Link></li>
                                    <li className="nav-item"><Link
                                    className={this.isPathActive('/user-pages/details') ? 'nav-link active' : 'nav-link'}
                                    to="/user-pages/details"><Trans>Profil</Trans></Link></li>

                                <li className="nav-item"><Link
                                    className={this.isPathActive('/user-pages/contact') ? 'nav-link active' : 'nav-link'}
                                    to="/user-pages/contact"><Trans>Support </Trans></Link></li>

                            </ul>
                        </Collapse>
                    </li>


                </ul>
            </nav>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }

    componentDidMount() {
        this.onRouteChanged();
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.setState({username: user.username});
            this.setState({firstName: user.prenom});
            this.setState({lastName: user.nom});
            this.setState({company: user.company});
            this.setState({phone: user.phone});
            this.setState({email: user.email});
            this.setState({nb_assets: user.nb_assets});
            this.setState({role: user.role});

        }

        // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
        const body = document.querySelector('body');
        document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

            el.addEventListener('mouseover', function () {
                if (body.classList.contains('sidebar-icon-only')) {
                    el.classList.add('hover-open');
                }
            });
            el.addEventListener('mouseout', function () {
                if (body.classList.contains('sidebar-icon-only')) {
                    el.classList.remove('hover-open');
                }
            });
        });
    }

}

export default withRouter(Sidebar);