import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Background from './assets/images/Background.jpg'
import AuthService from "./services/AuthService";
import {withTranslation} from 'react-i18next';

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export class Login extends Component {

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    this.props.history.push("/user-pages/login-2fa");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.msg) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }


    render() {
        const {t} = this.props;
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
                                <h4>{t("Bonjour! Commençons")} </h4>
                                <h6 className="font-weight-light">{t("Se connecter pour continuer.")}</h6>
                                <br/> <br/>
                                <Form
                                    onSubmit={this.handleLogin}
                                    ref={c => {
                                        this.form = c;
                                    }}
                                >
                                    <div className="form-group">
                                        <label htmlFor="username">{t("Nom d'utilisateur")}</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChangeUsername}
                                            validations={[required]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">{t("Mot de passe")}</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
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
                                            <span>{t("se connecter")}</span>
                                        </button>
                                    </div>
                                    {this.state.message && (
                                        <div className="form-group">
                                            <div className="alert alert-danger" role="alert">
                                                {this.state.message}
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
                                <Link to="forgot-password" relative="path">{t("Mot de passe oublié")}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(Login)
