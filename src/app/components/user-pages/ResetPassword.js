import React, {Component} from 'react';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import axios from "axios";
import Background from "./assets/images/Background.jpg";
import {Link} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "./services/AuthService";
import {forgot_password_reset_password} from "../../utils/constants";
import http from "../../http";

export class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            password1: "",
            password2: "",
            messageError: "",
            password_changed: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangePassword1 = this.onChangePassword1.bind(this);
        this.onChangePassword2 = this.onChangePassword2.bind(this);
    }

    componentDidMount() {
        const emptyVal = new URLSearchParams(window.location.search);
        this.setState({token: emptyVal.get('token')});
    }

    handleSubmit(e) {
        e.preventDefault();
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};:\\|,.<>\/?~]/;
        const uppercaseRegExp = /(?=.*?[A-Z])/;

        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{8,}/;

        const passwordLength = this.state.password1.length;
        const uppercasePassword = uppercaseRegExp.test(this.state.password1);
        const lowercasePassword = lowercaseRegExp.test(this.state.password1);
        const digitsPassword = digitsRegExp.test(this.state.password1);
        const specialCharPassword = specialCharRegExp.test(this.state.password1);
        const minLengthPassword = minLengthRegExp.test(this.state.password1);

        if (!this.state.password1 || !this.state.password2) {
            this.setState({messageError: 'Veuillez saisir tous les champs'});

        } else if (this.state.password1 != this.state.password2) {
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
            http.post(forgot_password_reset_password, {
                'token': this.state.token,
                'password': this.state.password1,
            })
                .then((response) => {
                    console.log(response);
                    this.setState({password_changed: true})

                }, (error) => {
                    console.log(error);
                    this.setState({messageError: 'token expiré.'});
                });
        }
    }

    onChangePassword1(e) {
        this.setState({
            password1: e.target.value
        });
    }
    onChangePassword2(e) {
        this.setState({
            password2: e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className="d-flex align-items-center auth px-0" style={{
                    backgroundImage: `url(${Background})`,
                    backgroundSize: 'cover',
                    width: '100vw',
                    height: '100vh'
                }}>
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                                <h4>Réinitialiser votre mot de passe</h4>
                                {/*<h6 className="font-weight-light">Se connecter pour continuer.</h6>*/}
                                <br/> <br/>

                                {!this.state.password_changed ? <Form
                                        method="post"
                                        onSubmit={this.handleSubmit}
                                        ref={c => {
                                            this.form = c;
                                        }}
                                    >
                                        <div className="form-group">
                                            <label htmlFor="password1">Nouveau mot de passe</label>
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={this.state.password1}
                                                onChange={this.onChangePassword1}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password2">Verifier le nouveau mot de passe</label>
                                            <Input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                value={this.state.password2}
                                                onChange={this.onChangePassword2}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button
                                                className="btn btn-dark btn-block"
                                                disabled={this.state.loading}
                                            >
                                                {this.state.loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                )}
                                                <span>Valider</span>
                                            </button>
                                        </div>
                                        {this.state.messageError && (
                                            <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                    {this.state.messageError}
                                                </div>
                                            </div>
                                        )}

                                        <CheckButton
                                            style={{display: "none"}}
                                            ref={c => {
                                                this.checkBtn = c;
                                            }}
                                        />
                                    </Form>
                                    :
                                    <div>
                                        <p>Mot de passe Réinitialiser avec succès.</p>
                                        <p><Link to="/brightwatch-demo/user-pages/login-1">Se connecter</Link></p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPassword
//a123456A@1a7a