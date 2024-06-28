import React, {Component} from 'react';
import {Form, Modal} from 'react-bootstrap';
import {register_user_url} from "../../utils/constants"
import axios from "axios";
import {Link} from "react-router-dom";
import {withTranslation} from 'react-i18next';
import http from "../../http";
import {CancelButton} from "../shared/buttons/CancelButton";

export class AddCollab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: [],
            surname: [],
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            isPasswordMatch: true,
            passwordErrorMessage: "",
            country_code : "",
            phone_number: "",
            valueClient: "",
            role: "",
            roles: [
                {'label': 'Admin', 'value': 'Admin'},
                {'label': 'Collaborateur', 'value': 'Collaborateur'},
            ],
            isEmailValid: true,
            emailErrorMessage: "",
            isPasswordValid: true,

            isCountryCodeValid: true,
            countryCodeErrorMessage: "",
            isPhoneNumberValid: true,
            phoneNumberErrorMessage: "",

            messageErrors: "",
            showModal: false,

        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handlePasswordChange(e) {
        const password = e.target.value;
        const hasLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
        let passwordErrorMessage = "";
        if (!hasLength) {
            passwordErrorMessage += "Password must be at least 8 characters long. ";
        }
        if (!hasUpper) {
            passwordErrorMessage += "Password must include at least one uppercase letter. ";
        }
        if (!hasLower) {
            passwordErrorMessage += "Password must include at least one lowercase letter. ";
        }
        if (!hasNumber) {
            passwordErrorMessage += "Password must include at least one number. ";
        }
        if (!hasSpecial) {
            passwordErrorMessage += "Password must include at least one special character (e.g., !, @, #, $). ";
        }
    
        this.setState({
            password: password,
            isPasswordValid: hasLength && hasUpper && hasLower && hasNumber && hasSpecial,
            passwordErrorMessage: passwordErrorMessage
        });
    }

    handleEmailChange(e) {
        const emailValue = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(emailValue);
        this.setState({
            email: emailValue,
            isEmailValid: isValid,
            emailErrorMessage: isValid ? "" : "Invalid email format"
        });
    }

    validateCountryCode(code) {
        const countryCodeRegex = /^\+?\d{1,4}$/; 
        return countryCodeRegex.test(code);
    }
    
    validatePhoneNumber(number) {
        const phoneNumberRegex = /^\d{10,14}$/; 
        return phoneNumberRegex.test(number);
    }

    handleCountryCodeChange(e) {
        const code = e.target.value;
        this.setState({
            country_code: code,
            isCountryCodeValid: this.validateCountryCode(code),
            countryCodeErrorMessage: this.validateCountryCode(code) ? "" : "Code de pays invalide."
        });
    }
    
    handlePhoneNumberChange(e) {
        const number = e.target.value;
        this.setState({
            phone_number: number,
            isPhoneNumberValid: this.validatePhoneNumber(number),
            phoneNumberErrorMessage: this.validatePhoneNumber(number) ? "" : "Numéro de téléphone invalide."
        });
    }


    handleSubmit(e) {
        e.preventDefault();
        const specialChars = /[`!@#$%^&*()+\-=\[\]{};:\\|,.<>\/?~]/;
        if (specialChars.test(this.state.username)) {
            this.setState({ messageErrors: "Identifiant ne doit pas contenir de caractères spéciaux." });
            return; 
        }
        if (!this.state.isPasswordValid) {
            console.log("Form submission stopped due to invalid password");
            return; 
        }

        if (!this.state.isEmailValid) {
            console.log("Form submission stopped due to invalid email");
            return; 
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                isPasswordMatch: false,
                passwordErrorMessage: "Les mots de passe ne correspondent pas."
            });
            return; 
        }

        if (!this.state.isCountryCodeValid || !this.state.isPhoneNumberValid) {
            console.log("Form submission stopped due to invalid inputs.");
            return; 
        }

         http.post(register_user_url, {'username':this.state.username, 'surname':this.state.surname, 'name':this.state.name,
        'email':this.state.email, 'password':this.state.password,  'country_code':this.state.country_code,
        'phone':this.state.phone_number, 'role': this.state.role
        }).then((response) => {
                    console.log(response);
                    this.props.history.push("/collab");
                }, (error) => {
                    console.log(error);
                    this.setState({ messageErrors: "Une erreur s'est produite lors de la soumission." });

                });

    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <div className="page-header">
                    <h3 className="page-title"> {t('Ajouter collaborateur')} </h3>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href=""
                                                                onClick={event => {event.preventDefault();  window.location.href="/collab";}}>{t('Collaborateurs')}</a>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">{t('Ajouter collaborateur')}</li>
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
                                               className="col-sm-3 col-form-label">{t("Identifiant")} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control" placeholder={t('Identifiant')}
                                                          onChange={(e) => this.setState({username: e.target.value, messageErrors: ''})}/>
                                        </div>
                                    </Form.Group>


                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Prénom')} </label>
                                        <div className="col-sm-3">
                                            <Form.Control type="text" className="form-control" placeholder={t('Prénom')}
                                                          onChange={(e) => this.setState({surname: e.target.value})}/>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Nom')} </label>
                                        <div className="col-sm-3">
                                           <Form.Control type="text" className="form-control" placeholder={t('Name')}
                                                          onChange={(e) => this.setState({name: e.target.value})}/>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Email')} </label>
                                        <div className="col-sm-3">
                                           <Form.Control type="email" className="form-control" placeholder={t('Email')} value={this.state.email}
                                                          onChange={this.handleEmailChange.bind(this)}/>
                                        { !this.state.isEmailValid && 
                                        <div className="text-danger">{this.state.emailErrorMessage}</div>
                                        }
                                        </div>
                                    </Form.Group>
                                    {/* <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Mot de passe')} </label>
                                        <div className="col-sm-3">
                                           <Form.Control type="password" className="form-control" placeholder={t('Mot de passe')}
                                                          onChange={(e) => this.setState({password: e.target.value})}/>
                                        </div>
                                    </Form.Group> */}
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Mot de passe')} </label>
                                        <div className="col-sm-3">
                                           <Form.Control type="password" className="form-control" placeholder={t('Mot de passe')}
                                                          value={this.state.password}
                                                          onChange={this.handlePasswordChange.bind(this)}/>
                                            {this.state.password && !this.state.isPasswordValid && 
                                                <div className="text-danger">{this.state.passwordErrorMessage}</div>
                                            }
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="confirmPassword"
                                            className="col-sm-3 col-form-label">{t('Confirmer le mot de passe')}</label>
                                        <div className="col-sm-3">
                                            <Form.Control type="password" id="confirmPassword" className="form-control" placeholder={t('Confirmer le mot de passe')}
                                                        onChange={(e) => this.setState({confirmPassword: e.target.value, isPasswordMatch: true})}/>
                                            {!this.state.isPasswordMatch && 
                                            <div className="text-danger">{this.state.passwordErrorMessage}</div>
                                            }
                                        </div>
                                    </Form.Group>
                                     <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Code du pays')} </label>
                                        <div className="col-sm-3">
                                           <Form.Control type="text" className="form-control" placeholder={t('Code du pays')}
                                                          onChange={this.handleCountryCodeChange.bind(this)}/>
                                                          {!this.state.isCountryCodeValid && 
                                                            <div className="text-danger">{this.state.countryCodeErrorMessage}</div>
                                                            }
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Numéro de téléphone')} </label>
                                        <div className="col-sm-3">
                                           <Form.Control type="text" className="form-control" placeholder={t('Phone')}
                                                          onChange={this.handlePhoneNumberChange.bind(this)}/>
                                                          {!this.state.isPhoneNumberValid && 
                                                            <div className="text-danger">{this.state.phoneNumberErrorMessage}</div>
                                                            }
                                        </div>
                                    </Form.Group>

                                     <Form.Group className="row">
                                        <label htmlFor="exampleInputUsername2"
                                               className="col-sm-3 col-form-label">{t('Rôle')} </label>
                                        <div className="col-sm-3">
                                           <select required className="btn btn-m btn-outline-primary dropdown-toggle" value={this.state.role} onChange={(e)=>this.setState({role: e.target.value })}>
                     <option >Choisir le rôle</option>
                    {
                         this.state.roles.map((s) =>
                                <option key={s.value} value={s.value}>{s.value}</option> )
                                                }

                      </select>
                                        </div>
                                    </Form.Group>


                                    <button type="submit"
                                            className="btn btn-gradient-primary mr-2">{t('Soumettre')}</button>
                                    <CancelButton url={"/actifs-liste"} t={t}></CancelButton>
                                </form>

                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default withTranslation()(AddCollab)
