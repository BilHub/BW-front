import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import {change_password_url} from "../../utils/constants"
import http from "../../http";
import {CancelButton} from "../shared/buttons/CancelButton";
import {withTranslation} from "react-i18next";


const etat = [
    {'label': 'Mineur', 'value': 'Mineur'},
    {'label': 'Important', 'value': 'Important'},
    {'label': 'Majeur', 'value': 'Majeur'},
    {'label': 'Critique', 'value': 'Critique'},

]

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
        const {t} = this.props;

        this.state = {

            oldPassword: "",
            newPassword: "",
            newPassword2: "",
            messageError: "",
            passwordType: "",
            password1Type: "",
            password2Type: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.togglePassword = this.togglePassword.bind(this);
        this.togglePassword1 = this.togglePassword1.bind(this);
        this.togglePassword2 = this.togglePassword2.bind(this);
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
    }

    handleSubmit(e) {
        e.preventDefault();
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};:\\|,.<>\/?~]/;

        const uppercaseRegExp = /(?=.*?[A-Z])/;

        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{8,}/;

        const passwordLength = this.state.newPassword.length;
        const uppercasePassword = uppercaseRegExp.test(this.state.newPassword);
        const lowercasePassword = lowercaseRegExp.test(this.state.newPassword);
        const digitsPassword = digitsRegExp.test(this.state.newPassword);
        const specialCharPassword = specialCharRegExp.test(this.state.newPassword);
        const minLengthPassword = minLengthRegExp.test(this.state.newPassword);

        if (!this.state.newPassword || !this.state.newPassword2) {
            this.setState({messageError: 'Veuillez saisir tous les champs'});

        } else if (this.state.newPassword != this.state.newPassword2) {
            this.setState({messageError: 'Les 2 mots de pase ne sont pas conformes'});

        } else if (passwordLength === 0) {
            this.setState({messageError: 'Mot de passe ne peut pas être vide'});

        } else if (!uppercasePassword) {
            this.setState({messageError: 'Mot de passe doit contenir au moins une lettre majuscule'});

        } else if (!lowercasePassword) {
            this.setState({messageError: 'Mot de passe doit contenir au moins une lettre minuscule'});

        } else if (!digitsPassword) {
            this.setState({messageError: 'Mot de passe doit contenir au moins un chiffre'});

        } else if (!specialCharPassword) {
            this.setState({messageError: 'Mot de passe doit contenir au moins un caractère spécial'});

        } else if (!minLengthPassword) {
            this.setState({messageError: 'Mot de passe doit contenir au moins un caractère spécial'});

        } else {
            http.post(change_password_url, {
                'old_password': this.state.oldPassword,
                'password1': this.state.newPassword,
                'password2': this.state.newPassword2
            })
                .then((response) => {
                    this.props.history.push("/user-pages/login-1");
                }, (error) => {
                    this.setState({messageError: 'Ancien mot de passe incorrect'});
                });
        }
    }

    togglePassword(e) {
        e.preventDefault()
        if (this.state.passwordType === "password") {
            this.setState({passwordType: "text"});
            return;
        }
        this.setState({passwordType: "password"});
    }

    togglePassword1(e) {
        e.preventDefault()
        if (this.state.password1Type === "password") {
            this.setState({password1Type: "text"});
            return;
        }
        this.setState({password1Type: "password"});
    }

    togglePassword2(e) {
        e.preventDefault()
        if (this.state.password2Type === "password") {
            this.setState({password2Type: "text"});
            return;
        }
        this.setState({password2Type: "password"});
    }

    render() {
        const {t} = this.props
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title">{t("Changer mot de passe")}</h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href=""
                                                               onClick={event => {event.preventDefault();  window.location.href="/user-pages/details";}}>{t('Profil')}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t("Changer mot de passe")}</li>
                        </ol>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-12 grid-margin stretch-card">
                        <div className="card">
                            <div className="card-body">
                                {this.state.messageError ?
                                    <span badge className="badge badge-danger">{this.state.messageError}</span> : null}
                                <form className="forms-sample" onSubmit={this.handleSubmit}>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">{t("Ancien mot de passe")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="password" className="form-control"
                                                          id="exampleInputUsername2" placeholder={t("Ancien mot de passe")}
                                                          onChange={(e) => this.setState({oldPassword: e.target.value})}/>

                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">{t("Nouveau mot de passe")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="password" className="form-control"
                                                          id="exampleInputUsername2" placeholder={t("Nouveau mot de passe")}
                                                          onChange={(e) => this.setState({newPassword: e.target.value})}/>

                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">{t("Confirmer mot de passe")}</label>
                                        <div className="col-sm-3">
                                            <Form.Control type="password" className="form-control"
                                                          id="exampleInputUsername2"
                                                          placeholder={t("Confirmer mot de passe")}
                                                          onChange={(e) => this.setState({newPassword2: e.target.value})}/>
                                        </div>
                                    </Form.Group>

                                    <button type="submit" className="btn btn-gradient-primary mr-2">{t("Soumettre")}</button>
                                    <CancelButton url={"/user-pages/details"} t={t}></CancelButton>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(ChangePassword)
