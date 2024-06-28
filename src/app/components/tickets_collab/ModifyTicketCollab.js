import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import {modify_ticket_status_collab_url, modify_ticket_url_collab, ticket_detail_team_get} from "../../utils/constants"
import axios from "axios";
import {withRouter} from 'react-router-dom';
import http from "../../http";
import {withTranslation} from 'react-i18next';


const etat = [
    {'label': 'Mineur', 'value': 'Mineur'},
    {'label': 'Important', 'value': 'Important'},
    {'label': 'Majeur', 'value': 'Majeur'},
    {'label': 'Critique', 'value': 'Critique'},

]

export class ModifyTicketCollab extends Component {
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


            ]


        }
        console.log('this.pops', this.props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user'));
        const auth = `Bearer ${user.token}`

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: auth
            }
        }
        const d = http.post(modify_ticket_status_collab_url, {'ticket_id': this.state.id})
        const url_detail = `${ticket_detail_team_get}${this.state.id}`
        http.get(url_detail)
            .then(res => {
                const ticket = res.data;
                this.setState({ticket});
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};:\\|,.<>\/?~]/;
        const user = JSON.parse(localStorage.getItem('user'));
        const auth = `Bearer ${user.token}`
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: auth
            }
        }
        if (specialChars.test(this.state.commentaire)) {

            this.setState({messageErrors: this.props.t("le nom de l'actif ne peut pas contenir des caractères spéciaux")})
        } else if (specialChars.test(this.state.action)) {

            this.setState({messageErrors: this.props.t("le champ action ne peut pas contenir des caractères spéciaux")})
        } else {
            console.log('s', this.state.id, this.state.statut)
            http.post(modify_ticket_url_collab, {
                    'ticket_id': this.state.id,
                    'status': this.state.statut,
                    'comment': this.state.commentaire,
                    'action': this.state.action
                }).then((response) => {
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
                    <h3 className="page-title"> {t("Modifier ticket")} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="!#"
                                                               onClick={event => event.preventDefault()}>{t("Tickets")}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t("Modifier ticket")}</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">

                                <form className="forms-sample" onSubmit={this.handleSubmit}>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Statut")} </label>
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
                                               className="col-sm-3 col-form-label">Action </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control"
                                                          id="exampleInputUsername2" placeholder="action"
                                                          onChange={(e) => this.setState({action: e.target.value})}/>

                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Commentaire")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control"
                                                          id="exampleInputUsername2" placeholder={t("Commentaire")}
                                                          onChange={(e) => this.setState({commentaire: e.target.value})}/>
                                        </div>
                                    </Form.Group>

                                    <button type="submit" className="btn btn-gradient-primary mr-2">{t("Soumettre")}</button>
                                    <button className="btn btn-light">{t("Annuler")}</button>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default withTranslation()(ModifyTicketCollab)
