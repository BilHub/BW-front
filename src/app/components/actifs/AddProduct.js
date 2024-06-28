import React, {Component} from 'react';
import {Form, Modal} from 'react-bootstrap';
import {add_produit_url, list_assets_products_add_url,} from "../../utils/constants"
import Select from "react-select";
import {Link} from "react-router-dom";
import http from "../../http";
import {withTranslation} from 'react-i18next';


export class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            assets_modified: [],
            selectedOptions: [],
            producer: '',
            name: '',
            version: '',
            type: '',
            showModal: false


        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSelect = data => {
        console.log('assets', this.state.assets, 'assets_modified', this.state.assets_modified, 'selected options', this.state.selectedOptions)
        this.setState({
            selectedOptions: data
        });
    };

    componentDidMount() {
        http.get(list_assets_products_add_url)
            .then(res => {
                const assets = res.data;
                this.setState({assets});
            })

    }

    

    handleSubmit(e) {
        e.preventDefault();
        const {t} = this.props;

        // const specialChars = /[`!@#$%^&*()+\-=\[\]{};:\\|,.<>\/?~]/;

            http.post(add_produit_url, {
                'asset_ref': this.state.selectedOptions.label,
                'name': this.state.name,
                'version': this.state.version,
                'type': this.state.type,
                'producer': this.state.producer
            }).then((response) => {
                    console.log(response);

                    this.props.history.push("/actifs-liste");
                }, (error) => {
                    console.log("error:!!!!",error);
                    this.setState({showModal: true});

                });
        
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">{t("Ajouter produit")}</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="/"
                                                              onClick={event => {event.preventDefault();  window.location.href="/actifs-liste";}}>{t('Actifs')}</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{t("Ajouter produit")}</li>
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
                                               className="col-sm-3 col-form-label">{t("Fournisseur")}</label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control"
                                                          id="exampleInputUsername2" placeholder={t("Fournisseur")}
                                                          value={this.state.producer}
                                                          onChange={(e) => this.setState({producer: e.target.value})}/>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Nom")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control"
                                                          id="exampleInputUsername2" placeholder={t("Choisir actif")}
                                                          value={this.state.name}
                                                          onChange={(e) => this.setState({name: e.target.value})}/>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Version")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control"
                                                          id="exampleInputUsername2" placeholder="version"
                                                          value={this.state.version}
                                                          onChange={(e) => this.setState({version: e.target.value})}/>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">Type </label>
                                        <div className="col-sm-3">
                                            <select required className="btn btn-m btn-outline-primary dropdown-toggle"
                                                    value={this.state.type}
                                                    onChange={(e) => this.setState({type: e.target.value})}>

                                                <option> os</option>
                                                <option>{t("logiciel")} </option>
                                                <option>{t("composant")} </option>
                                                <option>{t("bibliothèque")} </option>

                                            </select>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("Actifs")}</label>
                                        <div className="col-sm-3">
                                            {this.state.assets ? <Select

                                                options={this.state.assets}
                                                placeholder={t("Choisir actif")}
                                                value={this.state.selectedOptions}
                                                onChange={this.handleSelect}
                                                isSearchable={true}

                                            /> : null}

                                        </div>
                                    </Form.Group>

                                    <button type="submit" className="btn btn-gradient-primary mr-2">{t("Soumettre")}</button>
                                    <Link to='/actifs-liste'>
                                        <button className="btn btn-light">{t("Annuler")}</button>
                                    </Link>
                                </form>
                                <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Ajout produit</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {t("Produit existe déjà")}
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Link to='/actifs-liste'>
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

export default withTranslation()(AddProduct)
