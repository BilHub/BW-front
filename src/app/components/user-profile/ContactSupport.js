import React, {Component} from "react";
import {Card, CardHeader, Col, Form, FormInput, FormTextarea, ListGroup, ListGroupItem, Row} from "shards-react";

import {send_contact_url} from "../../utils/constants";
import {withTranslation} from 'react-i18next';
import http from "../../http";

class ContactSupport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputName: "",
            inputAttachment: "",
            file: "",
            inputSubject: "",
            inputMessage: '',
            messageErrors: "",
            messageSuccess: "",

        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleFileChange(e) {
        console.log(e.target.files[0])
        if (e.target.files[0]) this.setState({file: e.target.files[0]})
        this.setState({inputAttachment: e.target.value})
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
        if (this.state.file === "" || this.state.inputSubject === "" || this.state.inputMessage === "") {
            this.setState({messageErrors: "Veuillez remplir tous les champs."})
        } else {
            http.defaults.headers.post = headers
            const formData = new FormData();
            formData.append("file", this.state.file);
            formData.append("subject", this.state.inputSubject);
            formData.append("message", this.state.inputMessage);
            http.post(send_contact_url, formData,)
                .then((response) => {
                    this.setState({
                        inputName: "",
                        inputAttachment: "",
                        file: "",
                        inputSubject: "",
                        inputMessage: '',
                        messageErrors: "",
                        messageSuccess: "Votre message est envoyé avec succès",

                    })
                }, (error) => {
                    this.setState({messageErrors: "une erreur s'est produite."})

                });

        }
        console.log('name', this.state.inputSubject, this.state.inputMessage)

    }

    render() {
        const {t} = this.props;

        return (<Card small className="mb-4">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">{t('Mise en relation')}</h6>
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
                                <Form onSubmit={this.handleSubmit}>
                                    <Row form>
                                        <Col md="6" className="form-group">
                                            <label htmlFor="feFirstName">{t("Objet")}</label>
                                            <FormInput
                                                value={this.state.inputSubject}
                                                onChange={(e) => this.setState({inputSubject: e.target.value})}
                                            />
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md="6" className="form-group">
                                            <label htmlFor="Message">{t("Message")}</label>
                                            <FormTextarea
                                                className={"contact-textarea"}
                                                value={this.state.inputMessage}
                                                onChange={(e) => this.setState({inputMessage: e.target.value})}
                                                />
                                        </Col>
                                    </Row>
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


export default withTranslation()(ContactSupport);