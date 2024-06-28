import React, {Component} from 'react';
import {detail_obso_client_api} from "../../utils/constants"
import {GrTechnology} from "react-icons/gr";
import {
    MdAccountCircle,
    MdCalendarMonth,
    MdCallToAction,
    MdDescription,
    MdHighlight,
    MdInsertComment, MdManageAccounts,
    MdOutlineLaptopMac, MdOutlineTypeSpecimen, MdOutlineViewTimeline, MdRoomPreferences, MdTypeSpecimen
} from "react-icons/md";
import {FaShieldVirus, FaUserAlt} from "react-icons/fa";
import {GiMatterStates} from "react-icons/gi";
import {AiOutlineSolution} from "react-icons/ai"
import {withTranslation} from 'react-i18next';
import http from "../../http";
import {VscReferences} from "react-icons/vsc";

export class ObsolescenceDetail extends Component {

    constructor(props) {
        super(props)
        const {t} = this.props;
        this.state = {
            obsolescence: {}, histories: [], showDetails: true, showHistory: false, id: this.props.location.pathname.substring(21, 25)

        }
        this.showHideContentDetails = this.showHideContentDetails.bind(this);
        this.showHideContentHistory = this.showHideContentHistory.bind(this);
    }

    showHideContentDetails() {

        this.setState({
            showDetails: true
        });
        this.setState({
            showHistory: false
        });

    }

    showHideContentHistory() {
        this.setState({
            showDetails: false
        });
        this.setState({
            showHistory: true
        });
    }

    componentDidMount() {
        http.get(`${detail_obso_client_api}${this.state.id}`)
            .then(res => {
                const obsolescence = res.data;
                this.setState({obsolescence});
            })

    }

    render() {
        const {t} = this.props;
        return (<div>
            <div className="page-header">
                {this.obsolescence}
                <h3 className="page-title"> Obsolescence N°: {this.state.id} </h3>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="/list-obsolescence">Obsolescence</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{t('Détails obsolescence')}</li>
                    </ol>
                </nav>
            </div>
            <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                    <div className="card">
                        <div className="card-body">
                            <div class="btn-group">
                                <button type="button" class="btn btn-default active"> {t('Détails')}</button>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <ul class="list-group fa-padding">
                                        {this.state.obsolescence.name ? <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                            <div class="media">
                                                <div class="media-body">
                                                    <h6><MdDescription size={37}/>
                                                        <h9> &nbsp; {t('Nom')}  </h9>
                                                    </h6>
                                                    <h9>
                                                        {this.state.obsolescence.name} </h9>
                                                </div>
                                            </div>
                                        </li>:''}
                                        {this.state.obsolescence.version ?<li class="list-group-item" data-toggle="modal" data-target="#issue">
                                            <div class="media">

                                                <div class="media-body">
                                                    <h6><GrTechnology size={37}/> &nbsp; {t('Version')} </h6>
                                                    <h9>
                                                        {this.state.obsolescence.version} </h9>
                                                </div>
                                            </div>
                                        </li>:''}
                                        {this.state.obsolescence.eol ?<li class="list-group-item" data-toggle="modal" data-target="#issue">
                                            <div class="media">

                                                <div class="media-body">
                                                    <h6><MdCalendarMonth size={37}/> &nbsp; {t('Date de fin de service')}
                                                    </h6>
                                                    <h9>
                                                        {this.state.obsolescence.eol} </h9>
                                                </div>
                                            </div>
                                        </li>:''}
                                        {this.state.obsolescence.asset_ref ?<li class="list-group-item" data-toggle="modal" data-target="#issue">
                                            <div class="media">

                                                <div class="media-body">
                                                    <h6><VscReferences size={37}/> &nbsp; {t('Reference du produit')}
                                                    </h6>
                                                    <h9>
                                                        {this.state.obsolescence.asset_ref} </h9>
                                                </div>
                                            </div>
                                        </li>:''}
                                        {this.state.obsolescence.producer ?<li class="list-group-item" data-toggle="modal" data-target="#issue">
                                            <div class="media">

                                                <div class="media-body">
                                                    <h6><MdManageAccounts size={37}/> &nbsp; {t('Producteur')}</h6>
                                                    <h9>
                                                        {this.state.obsolescence.producer} </h9>
                                                </div>
                                            </div>
                                        </li>:''}
                                        {this.state.obsolescence.service ?<li class="list-group-item" data-toggle="modal" data-target="#issue">
                                            <div class="media">

                                                <div class="media-body">
                                                    <h6><GiMatterStates size={37}/> &nbsp; {t('Service')} </h6>
                                                    <h9>
                                                        {this.state.obsolescence.service} </h9>
                                                </div>
                                            </div>
                                        </li>:''}
                                        {this.state.obsolescence.manager ?<li class="list-group-item" data-toggle="modal" data-target="#issue">
                                            <div class="media">

                                                <div class="media-body">
                                                    <h6><MdAccountCircle size={37}/> &nbsp; {t('manager')} </h6>
                                                    <h9>
                                                        {this.state.obsolescence.manager} </h9>
                                                </div>
                                            </div>
                                        </li>:''}
                                        {this.state.obsolescence.type ?<li class="list-group-item" data-toggle="modal" data-target="#issue">
                                            <div class="media">

                                                <div class="media-body">
                                                    <h6><MdOutlineViewTimeline size={37}/> &nbsp; {t('Type')}
                                                    </h6>
                                                    <h9>
                                                        {this.state.obsolescence.type} </h9>
                                                </div>
                                            </div>
                                        </li>:''}
                                        {this.state.obsolescence.support ?<li class="list-group-item" data-toggle="modal" data-target="#issue">
                                            <div class="media">

                                                <div class="media-body">
                                                    <h6><AiOutlineSolution
                                                        size={37}/>&nbsp; {t('Support')} </h6>
                                                    <h9>
                                                        {this.state.obsolescence.support} </h9>
                                                </div>
                                            </div>
                                        </li>:''}
                                        {this.state.obsolescence.releaseDate ?<li class="list-group-item" data-toggle="modal" data-target="#issue">
                                            <div class="media">

                                                <div class="media-body">
                                                    <h6><MdCalendarMonth size={37}/> &nbsp; {t('Date de sortie')} </h6>
                                                    <h9>
                                                        {this.state.obsolescence.releaseDate} </h9>
                                                </div>
                                            </div>
                                        </li>:''}
                                        {this.state.obsolescence.latest ?<li class="list-group-item" data-toggle="modal" data-target="#issue">
                                            <div class="media">

                                                <div class="media-body">
                                                    <h6><MdCalendarMonth size={37}/> &nbsp; {t('dernière version')} </h6>
                                                    <h9>
                                                        {this.state.obsolescence.latest} </h9>
                                                </div>
                                            </div>
                                        </li>:''}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default withTranslation()(ObsolescenceDetail)
