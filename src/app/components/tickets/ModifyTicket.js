import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import {modify_ticket_status_url, modify_ticket_url, tickets_detail_url} from "../../utils/constants"
import axios from "axios";
import {Link, withRouter} from 'react-router-dom';
import {withTranslation} from 'react-i18next';
import http from "../../http";
import {CancelButton} from "../shared/buttons/CancelButton";

export class ModifyTicket extends Component {
    constructor(props) {
        super(props);
        const {t} = this.props;

        this.state = {
            ticket: {},
            statut: "",
            action: "",
            commentaire: "",
            company: "",
            messageError: "",
            id: this.props.id,
            etat: [
                {'label': t('En attente'), 'value': 'En attente'},
                {'label': t('En cours de traitement'), 'value': 'En cours de traitement'},
                {'label': t('Traité'), 'value': 'Traité'},
                {'label': t('Fermé'), 'value': 'Fermé'},
            ]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const d = http.post(modify_ticket_status_url, {'ticket_id': this.state.id})
        const url_detail = `${tickets_detail_url}${this.state.id}`
        http.get(url_detail)
            .then(res => {
                const ticket = res.data;
                this.setState({ticket});
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};:\\|,.<>\/?~]/;


        if (specialChars.test(this.state.commentaire)) {
            this.setState({messageErrors: this.props.t("le champ commentaire ne peut pas contenir des caractères spéciaux")})
        } else if (specialChars.test(this.state.action)) {
            this.setState({messageErrors: this.props.t("le champ commentaire ne peut pas contenir des caractères spéciaux")})
        } else {
            console.log('s', this.state.id, this.state.statut)
            http.post(modify_ticket_url, {
                    'ticket_id': this.state.id,
                    'status': this.state.statut,
                    'comment': this.state.commentaire,
                    'action': this.state.action
                })
                .then((response) => {
                    console.log(response);

                    this.props.history.push("/tickets-ouverts");
                }, (error) => {
                    console.log(error);
                });
        }


    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> {t('Modifier ticket')} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href=""
                                                               onClick={event => {event.preventDefault();  window.location.href="/tickets-ouverts";}}>{t('Tickets')}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Modifier ticket')}</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {this.state.messageErrors ?
                                    <span badge className="badge badge-danger mb-4">{this.state.messageErrors}</span> : null}
                                <br/>
                                <form className="forms-sample" onSubmit={this.handleSubmit}>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Statut')}</label>
                                        <div className="col-sm-3">
                                            <select className="btn btn-m btn-outline-primary dropdown-toggle"
                                                    value={this.state.statut}
                                                    onChange={(e) => this.setState({statut: e.target.value})}>
                                                <option> {this.state.ticket.status}  </option>
                                                {
                                                    this.state.etat.flatMap((s) => s.value != this.state.ticket.status ?
                                                        <option key={s.value} value={s.value}>{s.value}</option> : [])
                                                }

                                            </select>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Action')} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control"
                                                          id="exampleInputUsername2" placeholder={t("Action")}
                                                          onChange={(e) => this.setState({action: e.target.value})}/>

                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Commentaire')} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control"
                                                          id="exampleInputUsername2" placeholder={t("Commentaire")}
                                                          onChange={(e) => this.setState({commentaire: e.target.value})}/>
                                        </div>
                                    </Form.Group>

                                   <button type="submit"
                                            className="btn btn-gradient-primary mr-2">{t('Soumettre')}</button>
                                    <CancelButton url={"/tickets-ouverts"} t={t}></CancelButton>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default withTranslation()(withRouter(ModifyTicket))
