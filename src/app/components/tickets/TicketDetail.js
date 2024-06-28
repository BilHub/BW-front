import React, {Component} from 'react';
import {modify_ticket_status_url, ticket_ticket_histories_url, tickets_detail_url} from "../../utils/constants"
import {GrTechnology} from "react-icons/gr";
import {MdCallToAction, MdDescription, MdHighlight, MdInsertComment, MdOutlineLaptopMac} from "react-icons/md";
import {FaShieldVirus, FaUserAlt, FaRegCalendar} from "react-icons/fa";
import {GiMatterStates} from "react-icons/gi";
import {AiOutlineSolution} from "react-icons/ai"
import {Chrono} from "react-chrono";
import {withTranslation} from 'react-i18next';
import http from "../../http";

export class TicketDetail extends Component {

    constructor(props) {
        super(props)
        const {t} = this.props;
        this.state = {
            ticket: {}, histories: [], showDetails: true, showHistory: false, id: this.props.id,
            test: JSON.stringify("recommendation test !!!")
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
        const d = http.post(modify_ticket_status_url, {'ticket_id': this.state.id})
        http.get(`${tickets_detail_url}${this.state.id}`)
            .then(res => {
                const ticket = res.data;
                this.setState({ticket});
                console.log("ticket !!!!:",ticket)
            })
        http.get(`${ticket_ticket_histories_url}${this.state.id}`)
            .then(res => {
                const histories = res.data;
                console.log('hist!!!!!!!!!!!', res.data)
                this.setState({histories});
            })
    }

    render() {
        const {t} = this.props;
        return (<div>
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
                                    <button type="button" class="btn btn-default active"
                                            onClick={this.showHideContentDetails}> {t('Détails')}</button>
                                    <button type="button" class="btn btn-default"
                                            onClick={this.showHideContentHistory}> {t('Historique')}</button>
                                </div>
                                {this.state.showDetails ?


                                    <div class="row">

                                        <div class="col-md-12">
                                            <ul class="list-group fa-padding">
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><MdDescription size={37}/>
                                                                <h9> &nbsp; {t('Description')}  </h9>
                                                            </h6>
                                                            <h9>
                                                                {this.state.ticket.description} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><GrTechnology size={37}/> &nbsp; {t('Produit')} </h6>
                                                            <h9>
                                                                {this.state.ticket.cpe} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><MdOutlineLaptopMac size={37}/> &nbsp; {t('Actif')}
                                                            </h6>
                                                            <h9>
                                                                {this.state.ticket.asset_ref} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><FaShieldVirus size={37}/> &nbsp; {t('Vulnérabilité')}
                                                            </h6>
                                                            <h9>
                                                                {this.state.ticket.cve} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><FaRegCalendar size={37}/> &nbsp; {t('Date de publication')}
                                                            </h6>
                                                            <h9>
                                                                {this.state.ticket.published_at} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><MdHighlight size={37}/> &nbsp; {t('Criticité')}</h6>
                                                            <h9>
                                                                {this.state.ticket.score} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><GiMatterStates size={37}/> &nbsp; {t('Statut')} </h6>
                                                            <h9>
                                                                {this.state.ticket.status} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><MdCallToAction size={37}/> &nbsp; {t('Action')} </h6>
                                                            <h9>
                                                                {this.state.ticket.action} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><MdInsertComment size={37}/> &nbsp; {t('Commentaire')}
                                                            </h6>
                                                            <h9>
                                                                {this.state.ticket.comment} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><AiOutlineSolution
                                                                size={37}/>&nbsp; {t('Recommandation')} </h6>
                                                            <div>
                                                                {/* {Array.isArray(this.state.ticket.recommendation) ? (this.state.ticket.recommendation.map(
                                                                    (item, index) => (
                                                                        <div key={index}>{item}</div>
                                                                    )
                                                                )):(<h9>{this.state.ticket.recommendation}</h9>)} */}

                                                                {Array.isArray(this.state.test) ? (this.state.ticket.recommendation.map(
                                                                    (item, index) => (
                                                                        <div key={index}>{item}</div>
                                                                    )
                                                                )):(<h9>{JSON.parse(this.state.test)}</h9>)}

                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li class="list-group-item" data-toggle="modal" data-target="#issue">
                                                    <div class="media">

                                                        <div class="media-body">
                                                            <h6><FaUserAlt size={37}/> &nbsp; {t('Responsable')} </h6>
                                                            <h9>
                                                                {this.state.ticket.collab_name} </h9>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>


                                        </div>

                                    </div>


                                    : <div style={{width: "1000px", height: "1000px"}}>
                                        <Chrono items={this.state.histories}/>
                                    </div>}

                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

export default withTranslation()(TicketDetail)
