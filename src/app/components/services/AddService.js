import React, {Component} from 'react';
import {Form, Modal} from 'react-bootstrap';
import {add_service_url, liste_collab_url, servicelist_url} from "../../utils/constants"
import axios from "axios";
import {Link} from "react-router-dom";
import http from "../../http";
import {withTranslation} from 'react-i18next';
import {CancelButton} from "../shared/buttons/CancelButton";

export class AddActif extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            name: "",
            localisation: "",
            description: "",
            messageErrors: "",
            valueCollab: "",
            collabs: [],

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        http.get(liste_collab_url)
            .then(res => {
                const collabs = res.data;
                this.setState({collabs});
            })
        http.get(servicelist_url)
            .then(res => {
                const services = res.data;
                this.setState({services});
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};:\\|,.<>\/?~]/;

        if (this.state.name.length <= 2) {
            this.setState({messageErrors: this.props.t("le nom du service doit contenir au minimum 2 caractères")})
        } else if (specialChars.test(this.state.name)) {
            this.setState({messageErrors: this.props.t("le nom du service ne peut pas contenir des caractères spéciaux")})

        } else if (specialChars.test(this.state.localisation)) {
            this.setState({messageErrors: this.props.t("le champ localisation ne peut pas contenir des caractères spéciaux")})

        } else if (specialChars.test(this.state.description)) {
            this.setState({messageErrors: this.props.t("le champ description ne peut pas contenir des caractères spéciaux")})

        } else if (this.state.valueCollab.length <= 2) {
            this.setState({messageErrors: this.props.t("le collaborateur ne peut pas être vide")})

        } else {
            http.post(add_service_url, {
                'name': this.state.name,
                'localisation': this.state.localisation,
                'description': this.state.description,
                'collab': this.state.valueCollab
            })
                .then((response) => {
                    console.log(response);

                    this.props.history.push("/services-liste");
                }, (error) => {
                    console.log(error);
                    this.setState({showModal: true});


                });


        }
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> {t("Ajouter service")} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href=""
                                                                onClick={event => {event.preventDefault();  window.location.href="/services-liste";}}>{t('Services')}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t("Ajouter service")}</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {this.state.messageErrors ?
                                    <span badge className="badge badge-danger">{this.state.messageErrors}</span> : null}
                                <br/>
                                <form className="forms-sample" onSubmit={this.handleSubmit}>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">{t("Nom du service")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control"
                                                          placeholder="nom de service"
                                                          onChange={(e) => this.setState({name: e.target.value})}/>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Responsable")} </label>
                                        <div className="col-sm-3">
                                            <select required className="btn btn-m btn-outline-primary dropdown-toggle"
                                                    value={this.state.valueCollab}
                                                    onChange={(e) => this.setState({valueCollab: e.target.value})}>
                                                <option> {t("Choisir le collaborateur")}</option>
                                                {
                                                    this.state.collabs.map((s) => <option key={s.username}
                                                                                          value={s.username}
                                                                                          style={{color: 'black'}}>{s.username}</option>)
                                                }

                                            </select>

                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Description")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control" placeholder={t("Description")}
                                                          onChange={(e) => this.setState({description: e.target.value})}/>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Localisation")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control"
                                                          placeholder={t("Localisation")}
                                                          onChange={(e) => this.setState({localisation: e.target.value})}/>
                                        </div>
                                    </Form.Group>


                                    <button type="submit" className="btn btn-gradient-primary mr-2">{t("Soumettre")}</button>
                                    <CancelButton url={"/services-liste"} t={t}></CancelButton>
                                </form>
                                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                                    <Modal.Header closeButton>
                                        <Modal.Title> {t("Ajout service")} </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                         {t("Service existe déjà")}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Link to='/services-liste'>
                                            <button className="btn btn-gradient-dark btn-fw"
                                                    onClick={() => this.setState({showModal: false})}>
                                                {t("Annuler")}
                                            </button>
                                        </Link>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default withTranslation()(AddActif)
