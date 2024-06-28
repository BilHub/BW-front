import React, {Component} from 'react';
import {modify_ticket_status_collab_url, ticket_detail_team_get} from "../../utils/constants"
import axios from "axios";
import {GrTechnology} from "react-icons/gr";
import {MdCallToAction, MdDescription, MdHighlight, MdInsertComment, MdOutlineLaptopMac} from "react-icons/md";
import {FaShieldVirus, FaUserAlt} from "react-icons/fa";
import {GiMatterStates} from "react-icons/gi";
import {AiOutlineSolution} from "react-icons/ai"
import http from "../../http";
import {withTranslation} from "react-i18next";

export class TicketDetailCollab extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ticket: {},
            histories: [],
            showDetails: true,
            showHistory: false,
            id: this.props.id,

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
        const d = http.post(modify_ticket_status_collab_url, {'ticket_id': this.state.id})
        http.get(`${ticket_detail_team_get}${this.state.id}`)
            .then(res => {
                const ticket = res.data;
                this.setState({ticket});
            })
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> Ticket N°: {this.state.ticket.id} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                {this.state.ticket.status == "Fermé" ? <a href="/tickets-fermes">Tickets</a> :
                                    <a href="/tickets-ouverts">Tickets</a>}
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Détails ticket')}</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                <div class="btn-group">

                                </div>


                                <div class="row">

                                    <div class="col-md-12">
                                        <ul class="list-group fa-padding">
                                            <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                <div class="media">

                                                    <div class="media-body">
                                                        <h6><MdDescription size={37}/>
                                                            <h9> &nbsp; Description</h9>
                                                        </h6>
                                                        <h9>
                                                            {this.state.ticket.description} </h9>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                <div class="media">

                                                    <div class="media-body">
                                                        <h6><GrTechnology size={37}/> &nbsp; Produit </h6>
                                                        <h9>
                                                            {this.state.ticket.cpe} </h9>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                <div class="media">

                                                    <div class="media-body">
                                                        <h6><MdOutlineLaptopMac size={37}/> &nbsp; Actif </h6>
                                                        <h9>
                                                            {this.state.ticket.asset_ref} </h9>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                <div class="media">

                                                    <div class="media-body">
                                                        <h6><FaShieldVirus size={37}/> &nbsp; Vulnérabilité </h6>
                                                        <h9>
                                                            {this.state.ticket.cve} </h9>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                <div class="media">

                                                    <div class="media-body">
                                                        <h6><MdHighlight size={37}/> &nbsp; Criticité </h6>
                                                        <h9>
                                                            {this.state.ticket.score} </h9>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                <div class="media">

                                                    <div class="media-body">
                                                        <h6><GiMatterStates size={37}/> &nbsp; Statut </h6>
                                                        <h9>
                                                            {this.state.ticket.status} </h9>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                <div class="media">

                                                    <div class="media-body">
                                                        <h6><MdCallToAction size={37}/> &nbsp; Action </h6>
                                                        <h9>
                                                            {this.state.ticket.action} </h9>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                <div class="media">

                                                    <div class="media-body">
                                                        <h6><MdInsertComment size={37}/> &nbsp; Commentaire </h6>
                                                        <h9>
                                                            {this.state.ticket.comment} </h9>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                <div class="media">

                                                    <div class="media-body">
                                                        <h6><AiOutlineSolution size={37}/>&nbsp; Recommandation </h6>
                                                        <h9>
                                                            {this.state.ticket.recommandation} </h9>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                <div class="media">

                                                    <div class="media-body">
                                                        <h6><FaUserAlt size={37}/> &nbsp; Responsable </h6>
                                                        <h9>
                                                            {this.state.ticket.collab_name} </h9>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>


                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default withTranslation()(TicketDetailCollab)
