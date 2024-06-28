import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import {assign_ticket_url, liste_collab_url, tickets_detail_url} from "../../utils/constants"
import axios from "axios";
import moment from "moment";
import {withTranslation} from 'react-i18next';
import http from "../../http";
import {CancelButton} from "../shared/buttons/CancelButton";

const etat = [
    {'label': 'Mineur', 'value': 'Mineur'},
    {'label': 'Important', 'value': 'Important'},
    {'label': 'Majeur', 'value': 'Majeur'},
    {'label': 'Critique', 'value': 'Critique'},

]

export class AssignTicket extends Component {
    constructor(props) {
        super(props)
        const {t} = this.props;
        this.state = {
            ticket: {},
            collabs: [],
            valueCollab: "",
            dueDate: new Date("01-02-2021"),
            company: "",
            messageError: "",
            isChecked: false,
            collabDefault: "",


        }
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOnChange() {

        this.setState({
            isChecked: !this.isChecked
        });

    }

    componentDidMount() {
        const id = this.props.match.params.id;

        http.get(liste_collab_url)
            .then(res => {
                const collabs = res.data;
                this.setState({collabs});
            })
        const url_detail = `${tickets_detail_url}${id}`
        http.get(url_detail)
            .then(res => {
                const ticket = res.data;
                this.setState({ticket});
            })
        this.setState({valueCollab: this.state.ticket.collab_name});
        this.setState({collabDefault: this.state.ticket.collab_name})
    }


    handleSubmit(e) {
        e.preventDefault();
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};:\\|,.<>\/?~]/;
        const today = moment(new Date()).format("YYYY-MM-DD")

        if (this.state.valueCollab === "Choisir le collaborateur") {

            this.setState({messageError: "Veuillez renseigner le colloborateur"})
        }
        if (this.state.dueDate < today) {
            this.setState({messageError: "La date d'échéance doit être supérieure ou égale à la date du jour"})
        } else {
            http.post(assign_ticket_url, {
                    'ticket_id': this.state.ticket.id,
                    'responsable': this.state.valueCollab,
                    'dueDate': this.state.dueDate,
                    'notifier': this.state.isChecked
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
                    <h3 className="page-title"> {t('Assigner ticket')} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/tickets-ouverts"
                                                                onClick={event => {event.preventDefault();  window.location.href="/tickets-ouverts";}}>{t('Tickets')}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Assigner ticket')}</li>
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
                                               className="col-sm-3 col-form-label">{t('Collaborateur')} </label>
                                        <div className="">
                                            <select required className="custom-select" value={this.state.valueCollab}
                                                    onChange={(e) => this.setState({valueCollab: e.target.value})}>
                                                {this.state.collabDefault ?
                                                    <option> this.state.collabDefault </option> :
                                                    <option> {t('Choisir le collaborateur')} </option>}
                                                {
                                                    this.state.collabs.map((s) => <option key={s.username}
                                                                                          value={s.username}>{s.username}</option>)
                                                }

                                            </select>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Date d'échéance")} </label>

                                        <input
                                            type="date"
                                            value={this.state.dueDate}
                                            onChange={(e) => this.setState({dueDate: moment(new Date(e.target.value)).format("YYYY-MM-DD")})}

                                        />

                                    </Form.Group>
                                    <Form.Group className="row">
                                        <div className="col-sm-3">
                                            <input
                                                type="checkbox"
                                                id="topping"
                                                name="topping"
                                                value="notifier"
                                                checked={this.state.isChecked}
                                                onChange={this.handleOnChange}
                                            />
                                            <h9 style={{color: 'black'}}> {t('Le notifier par mail')} </h9>

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

export default withTranslation()(AssignTicket)
