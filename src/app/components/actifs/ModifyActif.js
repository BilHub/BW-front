import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import {actifs_detail_v2_get, liste_collab_url, modifasset_url, servicelist_url} from "../../utils/constants"
import axios from "axios";
import {Link} from "react-router-dom";
import http from "../../http";
import {withTranslation} from 'react-i18next';




export class ModifyActif extends Component {
    constructor(props) {
        super(props);
        const {t} = this.props;

        this.state = {
            assetref: "",
            service: "",
            importance: "",
            importanceDefault: "",
            serviceDefault: "",
            collabDefault: "",
            collabs: [],
            services: [],
            valueCollab: "",
            loading: false,
            message: "",
            etat: [
                {'label': this.props.t('Mineur'), 'value': 'Mineur'},
                {'label': t('Important'), 'value': 'Important'},
                {'label': t('Majeur'), 'value': 'Majeur'},
                {'label': t('Critique'), 'value': 'Critique'},
            ]

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({assetref: id});

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

        const url = actifs_detail_v2_get;
        http.get(`${url}${id}`)
            .then(res => {
                const data = res.data;
                this.setState({importanceDefault: data.importance});
                this.setState({serviceDefault: data.service});
                this.setState({collabDefault: data.collaborateur});
            })
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('collab', this.state.valueCollab, this.state.service, this.state.importance)
        var collabSend = ""
        var serviceSend = ""
        var importanceSend = ""
        if (this.state.valueCollab) {
            collabSend = this.state.valueCollab
        } else {
            collabSend = this.state.collabDefault
        }
        if (this.state.service) {
            serviceSend = this.state.service
        } else {
            serviceSend = this.state.serviceDefault
        }
        if (this.state.importance) {
            importanceSend = this.state.importance
        } else {
            importanceSend = this.state.importanceDefault
        }
        console.log('collab', collabSend, serviceSend, importanceSend)
        const user = JSON.parse(localStorage.getItem('user'));
        const auth = `Bearer ${user.token}`
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: auth
            }
        }
        http.post(modifasset_url, {
            'asset_ref': this.state.assetref,
            'service': serviceSend,
            'importance': importanceSend,
            'collab': collabSend
        }).then((response) => {
                this.props.history.push("/actifs-liste");
            }, (error) => {
                console.log(error);
            });
    }

    render() {
        const {t} = this.props;

        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> {t("Modifier actif")} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/"
                                                               onClick={event => {event.preventDefault();  window.location.href="/actifs-liste";}}>{t('Actifs')}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{t("Modifier actif")}</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">

                                <form className="forms-sample" onSubmit={this.handleSubmit}>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">
                                            {t("Nom de l'actif")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control"
                                                          id="exampleInputUsername2" value={this.state.assetref}
                                                          disabled="disabled"/>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Responsable")} </label>
                                        <div className="col-sm-3">
                                            <select className="btn btn-m btn-outline-primary dropdown-toggle"
                                                    value={this.state.valueCollab}
                                                    onChange={(e) => this.setState({valueCollab: e.target.value})}>
                                                <option> {this.state.collabDefault}  </option>
                                                {
                                                    this.state.collabs.map((s) => <option key={s.username}
                                                                                          value={s.username}>{s.username}</option>)
                                                }

                                            </select>

                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Importance")} </label>
                                        <div className="col-sm-3">
                                            <select className="btn btn-m btn-outline-primary dropdown-toggle"
                                                    value={this.state.importance}
                                                    onChange={(e) => this.setState({importance: e.target.value})}>
                                                <option> {this.state.importanceDefault} </option>
                                                {
                                                    this.state.etat.flatMap((s) => s.value != this.state.importanceDefault ?
                                                        <option key={s.value} value={s.value}>{s.value}</option> : [])
                                                }


                                            </select>

                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Service")} </label>
                                        <div className="col-sm-3">
                                            <select className="btn btn-m btn-outline-primary dropdown-toggle"
                                                    value={this.state.service}
                                                    onChange={(e) => this.setState({service: e.target.value})}>
                                                <option> {this.state.serviceDefault} </option>
                                                {
                                                    this.state.services.flatMap((s) => s.name != this.state.serviceDefault ?
                                                        <option key={s.name} value={s.name}>{s.name}</option> : [])
                                                }
                                            </select>
                                        </div>
                                    </Form.Group>


                                    <button type="submit" className="btn btn-gradient-primary mr-2">{t("Soumettre")}</button>
                                    <Link to='/actifs-liste'>
                                        <button className="btn btn-light">{t("Annuler")}</button>
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default withTranslation()(ModifyActif)
