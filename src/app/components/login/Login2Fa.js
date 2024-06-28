import React, {useState} from "react";
import {login} from "../actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

import Background from './assets/images/Background.png'
import {withTranslation} from "react-i18next";


const Login2Fa = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const redirect = Location.search ? Location.search.split('=')[1] : '/'
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin


    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(login(username, password))


    }
    const {t} = this.props;

    return (
        <main className="main-content  mt-0">
            <div className="page-header align-items-start min-vh-100" style={{
                backgroundImage: `url(${Background})`,
                backgroundSize: 'cover',
                width: '100vw',
                height: '100vh'
            }}>
                <span className="mask bg-gradient-dark opacity-6"/>
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-dark shadow-primary border-radius-lg py-3 pe-1"
                                         style={{backgroundColor: 'black'}}>
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">{t("se connecter")}</h4>
                                        <div className="row mt-3">
                                            <div className="col-2 text-center ms-auto">
                                            </div>
                                            <div className="col-2 text-center px-1">
                                            </div>
                                            <div className="col-2 text-center me-auto">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form action method="post" noValidate onSubmit={submitHandler}>

                                        <div data-validate="Valid email is required: ex@abc.xyz">

                                            <input class="input100" type="text" value={username} name="text"
                                                   placeholder="Identifiant" required={true}
                                                   onChange={(e) => setUsername(e.target.value)}/>

                                        </div>
                                        <br/>
                                        <div data-validate="Valid email is required: ex@abc.xyz">

                                            <input class="input100" type="password" value={password} name="password"
                                                   placeholder="Mot de passe" required={true}
                                                   onChange={(e) => setPassword(e.target.value)}/>

                                        </div>

                                        &nbsp; &nbsp; &nbsp; <input type="submit" className="login100-form-btn"
                                                                    value="Se connecter"/> <br/>
                                        {error ? <h8> {t("Coordonnées érronées")} </h8> : null}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>

    );
}


export default withTranslation()(Login2Fa);