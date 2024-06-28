import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Background from './assets/images/Background.jpg'
import AuthService from "./services/AuthService";
import axios from "axios";
import {forgot_password_send_email} from "../../utils/constants";
import http from "../../http";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.handleForgotPassword = this.handleForgotPassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);

        this.state = {
            email: "",
            loading: false,
            message: "",
            email_sent: false
        };
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }


    handleForgotPassword(e) {
        e.preventDefault();
        this.form.validateAll();

        http.post(forgot_password_send_email, {
            'email': this.state.email,
        })
            .then((response) => {
                console.log(response);
                this.setState({email_sent:true})
            }, (error) => {
                this.setState({message:"This Email doesn't exist."})
                console.log(error);
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
                                <h4>Mot de passe oublié</h4>
                                {/*<h6 className="font-weight-light">Se connecter pour continuer.</h6>*/}
                                <br/> <br/>
                                {!this.state.email_sent ?
                                    <Form
                                        onSubmit={this.handleForgotPassword}
                                        ref={c => {
                                            this.form = c;
                                        }}
                                    >
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <Input
                                                type="text"
                                                className="form-control"
                                                name="email"
                                                value={this.state.email}
                                                onChange={this.onChangeEmail}
                                                validations={[required]}
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
                                                <span>Envoyer</span>
                                            </button>
                                        </div>
                                        {this.state.message && (
                                            <div className="form-group">
                                                <div className="alert alert-danger" role="alert">
                                                    {this.state.message}
                                                </div>
                                            </div>
                                        )}

                                        {/*<a href={"/brightwatch-demo/forgot-password"}><p></p></a>*/}
                                        <Link to="login-1" relative="path">Se connecter</Link>
                                        <CheckButton
                                            style={{display: "none"}}
                                            ref={c => {
                                                this.checkBtn = c;
                                            }}
                                        />
                                    </Form>
                                    :
                                    <p>Un e-mail a été envoyé afin de poursuivre le processus.</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword
