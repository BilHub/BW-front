import React, {Component, Suspense, lazy} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import RouteGuard from "./RouteGuard"
import Spinner from '../components/shared/Spinner';

const Dashboard = lazy(() => import('../components/dashboard/Dashboard'));
const DashboardBrightwatch = lazy(() => import('../components/dashboard/DashboardBrightwatch'));


const Buttons = lazy(() => import('../components/basic-ui/Buttons'));
const Dropdowns = lazy(() => import('../components/basic-ui/Dropdowns'));
const Typography = lazy(() => import('../components/basic-ui/Typography'));


const BasicElements = lazy(() => import('../components/form-elements/BasicElements'));
const LostOTP = lazy(() => import('../components/user-pages/LostOtp'));

const BasicTable = lazy(() => import('../components/tables/BasicTable'));

const AssetAdminPage = lazy(() => import('../components/actifs/AssetAdminPage'));
const ProductsVulnerables = lazy(() => import('../components/actifs/ProductsVulnerables'));

const AddActif = lazy(() => import('../components/actifs/AddActif'));
const AddProduct = lazy(() => import('../components/actifs/AddProduct'));
const AssetDetail = lazy(() => import('../components/actifs/DetailsActifs'));
const AssetModify = lazy(() => import('../components/actifs/ModifyActif'));
const Products = lazy(() => import('../components/actifs/ListeProduits'));
const ImportAssets = lazy(() => import('../components/actifs/ImportAssets'));

const TicketsOuverts = lazy(() => import('../components/tickets/TicketsOuverts'));
const TicketsFermes = lazy(() => import('../components/tickets/TicketsFermes'));
const TicketDetail = lazy(() => import('../components/tickets/TicketDetail'));
const TicketModif = lazy(() => import('../components/tickets/ModifyTicket'));
const TicketAssign = lazy(() => import('../components/tickets/AssignTicket'));
const AddTicket = lazy(() => import('../components/tickets/AddTicket'));

const ListServices = lazy(() => import('../components/services/ListServices'));
const AddService = lazy(() => import('../components/services/AddService'));

const Mdi = lazy(() => import('../components/icons/Mdi'));

const CommonCollab = lazy(() => import('../components/shared_urls/CommonCollab'));
const ChartJs = lazy(() => import('../components/charts/ChartJs'));

const Error404 = lazy(() => import('../components/error-pages/Error404'));
const Error500 = lazy(() => import('../components/error-pages/Error500'));

const Login = lazy(() => import('../components/user-pages/Login'));
const ForgotPassword = lazy(() => import('../components/user-pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../components/user-pages/ResetPassword'));
const ResetOtp = lazy(() => import('../components/user-pages/ResetOtp'));
const Login2Fa = lazy(() => import('../components/user-pages/Login2Fa'));
const Register1 = lazy(() => import('../components/user-pages/Register'));
const ChangePassword = lazy(() => import('../components/user-pages/ChangePassword'));
const Lockscreen = lazy(() => import('../components/user-pages/Lockscreen'));
const UserPageDetails = lazy(() => import('../components/user-profile/userPage'));
const ContactPage = lazy(() => import('../components/user-profile/ContactPage'));
const BlankPage = lazy(() => import('../components/general-pages/BlankPage'));


const AssetPageCollab = lazy(() => import('../components/actifs_collab/AssetPage'));


const Asset = lazy(() => import('../components/shared_urls/Asset'));
const Ticket = lazy(() => import('../components/shared_urls/Tickets'));
const Service = lazy(() => import('../components/shared_urls/Services'));
const DashboardCommon = lazy(() => import('../components/shared_urls/DashboardCommon'));
const ModifyTicket = lazy(() => import('../components/shared_urls/ModifyTicket'));
const DetailTicketCommon = lazy(() => import('../components/shared_urls/TicketDetail'));
const abonnement = lazy(() => import('../components/shared_urls/CommonAbonnement'));
const Collablist= lazy(() => import('../components/user-profile/collab'));
const AddCollab= lazy(() => import('../components/user-profile/AddCollab'));


const ObsolescenceList = lazy(() => import('../components/obsolescence/List'));
const ObsolescenceDetail = lazy(() => import('../components/obsolescence/ObsolescenceDetail'));
const UpgradeSubscription = lazy(() => import('../components/user-profile/UpgradeSubscription'));
class AppRoutes extends Component {

    render() {
        const user = JSON.parse(localStorage.getItem('user'));
        return (
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    <RouteGuard exact path="/dashboard" component={DashboardCommon} forceRefresh={true}/>
                    <Route exact path="/dashboard-brightwatch" component={Dashboard}/>

                    <Route path="/basic-ui/buttons" component={Buttons}/>
                    <Route path="/basic-ui/dropdowns" component={Dropdowns}/>
                    <Route path="/basic-ui/typography" component={Typography}/>
                    <Route path="/basic-ui/typography" component={Typography}/>
                    <RouteGuard path="/actifs-liste" component={Asset}/>
                    <RouteGuard path="/produits-vulnerables" component={ProductsVulnerables}/>
                    <RouteGuard path="/add-actif" component={AddActif}/>
                    <RouteGuard path="/add-produit" component={AddProduct}/>
                    <RouteGuard path="/actif-detail/:id" component={AssetDetail}/>
                    <RouteGuard path="/actif-modif/:id" component={AssetModify}/>
                    <RouteGuard path="/products" component={Products}/>
                    <RouteGuard path="/import-assets" component={ImportAssets}/>
                    <RouteGuard path="/tickets-ouverts" component={Ticket}/>
                    <RouteGuard path="/tickets-fermes" component={TicketsFermes}/>
                    <RouteGuard path="/ticket-detail/:id" component={DetailTicketCommon}/>
                    <RouteGuard path="/modify-ticket/:id" component={ModifyTicket}/>
                    <RouteGuard path="/assign-ticket/:id" component={TicketAssign}/>
                    <RouteGuard path="/add-ticket" component={AddTicket}/>
                    <RouteGuard path="/services-liste" component={Service}/>
                    <RouteGuard path="/abonnement" component={abonnement}/>
                    <RouteGuard path="/add-service" component={AddService}/>
                    <RouteGuard path="/list-obsolescence" component={ObsolescenceList}/>
                    <RouteGuard path="/notification-obsolescence" component={ObsolescenceList}/>
                    <RouteGuard path="/collab" component={CommonCollab}/>
                    <RouteGuard path="/add-collab" component={AddCollab}/>
                    <RouteGuard path="/upgrade-subscription" component={UpgradeSubscription}/>

                    <RouteGuard path="/import-assets" component={ImportAssets}/>
                    <RouteGuard path="/obsolescence-detail" component={ObsolescenceDetail}/>
                    <Route path="/form-Elements/basic-elements" component={BasicElements}/>

                    <Route path="/tables/basic-table" component={BasicTable}/>


                    <Route path="/icons/mdi" component={Mdi}/>


                    <Route path="/charts/chart-js" component={ChartJs}/>


                    <Route path="/user-pages/login-1" component={Login}/>
                    <Route path="/user-pages/login-2fa" component={Login2Fa}/>
                    <Route path="/user-pages/register-1" component={Register1}/>
                    <Route path="/user-pages/change-password" component={ChangePassword}/>
                    <Route path="/user-pages/lockscreen" component={Lockscreen}/>
                    <Route path="/user-pages/details" component={UserPageDetails}/>
                    <Route path="/user-pages/contact" component={ContactPage}/>
                    <Route path="/user-pages/forgot-password" component={ForgotPassword}/>
                    <Route path="/user-pages/lost-otp" component={LostOTP}/>
                    <Route path="/user-pages/reset-password" component={ResetPassword}/>
                    <Route path="/user-pages/reset-otp" component={ResetOtp}/>

                    <Route path="/error-pages/error-404" component={Error404}/>
                    <Route path="/error-pages/error-500" component={Error500}/>

                    <Route path="/general-pages/blank-page" component={BlankPage}/>


                    <Redirect to="/dashboard"/>
                </Switch>
            </Suspense>
        );
    }
}

export default AppRoutes;