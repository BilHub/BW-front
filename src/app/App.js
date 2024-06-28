import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './App.scss';
import AppRoutes from './route/AppRoutes';
import Navbar from './components/shared/Navbar';
import Sidebar from './components/shared/Sidebar';
import SettingsPanel from './components/shared/SettingsPanel';
import Footer from './components/shared/Footer';
import {withTranslation} from "react-i18next";



class App extends Component {
    constructor(props) {
        super(props)
        const {t} = this.props;
         this.state = {
          role2: ""
         }

    }


    componentDidMount() {
        this.onRouteChanged();
        const user = JSON.parse(localStorage.getItem('user'));

if(user){
   this.setState({ role2: user.role2 });

}
    }

    render() {
        let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
        let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
        let SettingsPanelComponent = !this.state.isFullPageLayout ? <SettingsPanel/> : '';
        let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';
        return (
            <div className="container-scroller">
                {navbarComponent}
                <div className="container-fluid page-body-wrapper">
                    {sidebarComponent}
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <AppRoutes/>
                            {SettingsPanelComponent}
                        </div>
                        {footerComponent}
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        console.log("ROUTE CHANGED");
        const {i18n} = this.props;
        const body = document.querySelector('body');
        window.scrollTo(0, 0);
        const fullPageLayoutRoutes = [
            '/user-pages/login-1',
            '/user-pages/login-2fa',
            '/user-pages/register-1',
            '/user-pages/lockscreen',
            '/error-pages/error-404',
            '/error-pages/error-500',
            '/general-pages/landing-page',
            '/user-pages/forgot-password',
            '/user-pages/reset-password',
        ];
        for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
            let pathname = fullPageLayoutRoutes[i]
            if (this.props.location.pathname.substring(0, pathname.length) === pathname) {
                this.setState({
                    isFullPageLayout: true
                })
                document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
                break;
            } else {
                this.setState({
                    isFullPageLayout: false
                })
                document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
            }
        }
    }

}

export default withTranslation()(withRouter(App));
