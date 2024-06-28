import React, {Component} from "react";
import {Card, CardHeader, Col, Form, FormInput, FormTextarea, ListGroup, ListGroupItem, Row} from "shards-react";

import {import_assets_url} from "../../utils/constants";
import {withTranslation} from 'react-i18next';
import http from "../../http";

class ImportAssets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputAttachment: "",
            file: "",
            messageErrors: "",
            messageSuccess: "",
            templateURL: process.env.PUBLIC_URL + '/assets_list_template.csv'

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }

    handleFileChange(e) {
        console.log(e.target.files[0])
        if (e.target.files[0]) this.setState({file: e.target.files[0]})
        this.setState({inputAttachment: e.target.value})
    }
    handleDownload(e) {
    const link = document.createElement('a');
    link.href = this.state.templateURL;
    link.download = 'template.csv';
    link.click();
    }

    handleSubmit(e) {
        const user = JSON.parse(localStorage.getItem('user'));
        let headers = {'Content-Type': 'multipart/form-data'}
        if (user) {
            const auth = `Bearer ${user.token}`
            headers = {...headers, "Authorization": auth}
        }

        e.preventDefault();
        this.setState({messageErrors: ""})
        this.setState({messageSuccess: ""})

        const specialChars = /[`!@#$%^&*()+\-=\[\]{};:\\|,.<>\/?~]/;
        const emailPattern = /.*@.*\..{2,4}/;
        if (this.state.file === "") {
            this.setState({messageErrors: "Veuillez remplir tous les champs."})
        } else {
            http.defaults.headers.post = headers
            const formData = new FormData();
            formData.append("file", this.state.file);
            http.post(import_assets_url, formData,)
                .then((response) => {
                    this.setState({
                        inputAttachment: "",
                        file: "",
                        messageErrors: "",
                        messageSuccess: "Votre fichier est bien enregistré",

                    })
                }, (error) => {
                    this.setState({messageErrors: "une erreur s'est produite."})

                });

        }

    }

    render() {
        const {t} = this.props;

        return (<Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">{t('Importer actifs')}</h6>
                </CardHeader>
                <ListGroup flush>
                    <ListGroupItem className="p-3">
                        <Row>
                            <Col>
                                {(() => {
                                    if (this.state.messageErrors) {
                                        return <span
                                            className="badge badge-warning mb-4">{this.state.messageErrors}</span>
                                    } else if (this.state.messageSuccess) {
                                        return <span
                                            className="badge badge-success mb-4">{this.state.messageSuccess}</span>
                                    }
                                })()}
                                <br/>
                          <div className="mb-2" >
                                <span>{t('Télécharger le fichier template')}</span>
                                    <button className="btn btn-gradient-dark btn-rounded btn-icon ml-2" onClick={this.handleDownload}  title={t('Download template')}><i className="mdi mdi-download"></i>
                                    </button>

                            </div>
                                <Form onSubmit={this.handleSubmit}>

                                    <Row form>
                                        <Col md="6" className="form-group">
                                            <label htmlFor="file-attachment" for={"file-attachment"}
                                                   className={"file-attachment-label"}>
                                                <span>{t("Ajouter un document")}{this.state.file.name ? ": " : ""} </span>
                                                {this.state.file.name ?
                                                    <span className={"filename"}>{this.state.file.name}</span> : ""}
                                            </label>

                                            <input
                                                id={"file-attachment"}
                                                type={"file"}
                                                value={this.state.inputAttachment}
                                                onChange={this.handleFileChange}
                                            />
                                        </Col>
                                    </Row>
                                    <button type="submit"
                                            className="btn btn-gradient-primary mr-2">{t('Soumettre')}</button>
                                </Form>
                            </Col>
                        </Row>
                    </ListGroupItem>
                </ListGroup>
            </Card>);
    }
}


export default withTranslation()(ImportAssets);