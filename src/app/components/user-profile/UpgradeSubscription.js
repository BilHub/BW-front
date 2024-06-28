import React, {Component} from 'react';
import {Form, Modal} from 'react-bootstrap';
import {Card, CardHeader} from "shards-react";
import {Link} from "react-router-dom";
import {withTranslation} from 'react-i18next';
import http from "../../http";
import {CancelButton} from "../shared/buttons/CancelButton";
import {upgrade_subscription_url} from "../../utils/constants"

export class UpgradeSubscription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            license:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.upgradeSubscription()
    }

    upgradeSubscription() {

        const data = {
            "premium_license":this.state.license,
            "email":this.state.email
        }

        http.post(upgrade_subscription_url, data).then((response) => {
                console.log(response);
                this.props.history.push("/abonnement");

            }, (error) => {
                console.log(error);
            })
        
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> {t("changer l' abonnement")} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href=""
                                                                onClick={event => {event.preventDefault();  window.location.href="/abonnement";}}>{t('abonnement')}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t('upgrade')}</li>
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
                                               className="col-sm-3 col-form-label">{t("Email")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control" placeholder={t('Email')}
                                                          onChange={(e) => this.setState({email: e.target.value})}/>
                                        </div>
                                    </Form.Group>  

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t("License premium")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control" placeholder={t('Numéro de license')}
                                                          onChange={(e) => this.setState({license: e.target.value})}/>
                                        </div>
                                    </Form.Group>                                                         

                                    <button type="submit"
                                            className="btn btn-gradient-primary mr-2">{t('Soumettre')}</button>
                                    <CancelButton url={"/abonnement"} t={t}></CancelButton>

                                    <Card small className="my-5">
                                        <CardHeader className="border-bottom text-center">
                                            <h4 className="m-0 text-danger">{t('Veuillez nous contacter si vous voulez passer en premium afin de vous founir une licence')}</h4>
                                        </CardHeader>
                                    </Card>
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

export default withTranslation()(UpgradeSubscription)
