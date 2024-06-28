import React, {Component} from 'react';
import {Form, Modal} from 'react-bootstrap';
import {addactif_url, liste_collab_url, servicelist_url, abonnement_url, assetlist_url} from "../../utils/constants"
import axios from "axios";
import {Link} from "react-router-dom";
import {withTranslation} from 'react-i18next';
import http from "../../http";
import {CancelButton} from "../shared/buttons/CancelButton";

export class AddActif extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            collabs: [],
            valueCollab: "",
            valueService: "",
            valueImportance: "",
            assetref: "",
            messageErrors: "",
            showModal: false,
            showAssetLimitModal:false,
            assets_number:"",
            max_assets_number: "",

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

        http.get(`${abonnement_url}`)
            .then(res => {
                const max_assets_number= res.data.user_credits;
                console.log("max_assets_number: !!!!", max_assets_number)
                this.setState({max_assets_number})
            })
        
        http.get(assetlist_url)
            .then(res => {
                const assets_number = res.data.length;
                console.log("assets_number: !!!!", assets_number)
                this.setState({assets_number})
            })
    }

    handleSubmit(e){
        e.preventDefault();

        if (parseInt(this.state.max_assets_number)>parseInt(this.state.assets_number)+995){
            this.createAsset()
        } else {
            this.setState({showAssetLimitModal: true});
        }

    }



    createAsset() {
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};:\\|,.<>\/?~]/;

        if (this.state.assetref.length <= 2) {
            this.setState({messageErrors: "le nom de l'actif doit contenir au minimum 2 caractères"})
        } else if (specialChars.test(this.state.assetref)) {
            this.setState({messageErrors: "le nom de l\'actif ne peut pas contenir des caractères spéciaux"})

        } else if (this.state.valueImportance.length <= 2) {
            this.setState({messageErrors: "l\'importance ne peut pas vide"})

        } else if (this.state.valueService.length <= 2) {
            this.setState({messageErrors: "le service ne peut être vide"})
        } else {
            if (this.state.valueImportance === "Mineur") {
                http.post(addactif_url, {
                    'asset_ref': this.state.assetref,
                    'service': this.state.valueService,
                    'importance': 1
                }).then((response) => {
                    console.log(response);
                    this.props.history.push("/actifs-liste");
                }, (error) => {
                    console.log(error);
                    this.setState({showModal: true});

                });
            } else if (this.state.valueImportance === "Important") {
                http.post(addactif_url, {
                    'asset_ref': this.state.assetref,
                    'service': this.state.valueService,
                    'importance': 2
                }).then((response) => {
                        console.log(response);

                        this.props.history.push("/actifs-liste");
                    }, (error) => {
                        console.log(error);
                        this.setState({showModal: true});

                    });
            } else if (this.state.valueImportance === "Majeur") {
                http.post(addactif_url, {
                    'asset_ref': this.state.assetref,
                    'service': this.state.valueService,
                    'importance': 3
                }).then((response) => {
                        console.log(response);

                        this.props.history.push("/actifs-liste");
                    }, (error) => {
                        console.log(error);
                        this.setState({showModal: true});

                    });
            } else {
                http.post(addactif_url, {
                    'asset_ref': this.state.assetref,
                    'service': this.state.valueService,
                    'importance': 4
                }).then((response) => {
                        console.log(response);

                        this.props.history.push("/actifs-liste");
                    }, (error) => {
                        console.log(error);
                        this.setState({showModal: true});
                    });
            }


        }
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> {t('Ajouter actif')} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href=""
                                                                onClick={event => {event.preventDefault();  window.location.href="/actifs-liste";}}>{t('Actifs')}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Ajouter actif')}</li>
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
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Nom de l'actif")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control" placeholder={t('actif')}
                                                          onChange={(e) => this.setState({assetref: e.target.value})}/>
                                        </div>
                                    </Form.Group>


                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Importance')} </label>
                                        <div className="col-sm-3">
                                            <select required className="btn btn-m btn-outline-primary dropdown-toggle"
                                                    value={this.state.valueImportance}
                                                    onChange={(e) => this.setState({valueImportance: e.target.value})}>
                                                <option> {t('Mineur')} </option>
                                                <option> {t('Important')} </option>
                                                <option> {t('Majeur')} </option>
                                                <option> {t('Critique')} </option>
                                            </select>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Service')} </label>
                                        <div className="col-sm-3">
                                            <select required className="btn btn-m btn-outline-primary dropdown-toggle"
                                                    value={this.state.valueService}
                                                    onChange={(e) => this.setState({valueService: e.target.value})}>
                                                <option></option>
                                                {
                                                    this.state.services.map((s) => <option key={s.name}
                                                                                           value={s.name}>{s.name}</option>)
                                                }

                                            </select>
                                        </div>
                                    </Form.Group>


                                    <button type="submit"
                                            className="btn btn-gradient-primary mr-2">{t('Soumettre')}</button>
                                    <CancelButton url={"/actifs-liste"} t={t}></CancelButton>
                                </form>
                                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                                    <Modal.Header closeButton>
                                        <Modal.Title> {t('Ajout actif')} </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {t('Actif existe déjà')}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Link to='/actifs-liste'>
                                            <button className="btn btn-gradient-dark btn-fw"
                                                    onClick={() => this.setState({showModal: false})}>
                                                {t('Annuler')}
                                            </button>
                                        </Link>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={this.state.showAssetLimitModal} onHide={() => this.setState({showAssetLimitModal: false})}>
                                    <Modal.Header closeButton>
                                        <Modal.Title> {t('Ajout actif')} </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {t('Votre abonnement est limité à 1000 actifs')}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Link to='/actifs-liste'>
                                            <button className="btn btn-gradient-dark btn-fw"
                                                    >
                                                {t('Passer en premium')}
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
