// import React, {Component} from 'react';
// import DatePicker from "react-datepicker";
// import bsCustomFileInput from 'bs-custom-file-input'
// import axios from "axios";
// import Background from "./assets/images/Background.jpg";
// import {Link} from 'react-router-dom';
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import AuthService from "./services/AuthService";
// import {lost_otp_reset_password} from "../../utils/constants";
// import http from "../../http";

// export class ResetOtp extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             token: null,
//             password1: "",
//             password2: "",
//             messageError: "",
//             password_changed: false
//         }
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.onChangePassword1 = this.onChangePassword1.bind(this);
//         this.onChangePassword2 = this.onChangePassword2.bind(this);
//     }

//     componentDidMount() {
//         const emptyVal = new URLSearchParams(window.location.search);
//         this.setState({token: emptyVal.get('token')});
//     }

//     handleSubmit(e) {
//         e.preventDefault();

//             http.post(lost_otp_reset_password, {
//                 'token': this.state.token,
//                 'password': this.state.password1,
//             })
//                 .then((response) => {
//                     console.log(response);
//                     this.setState({password_changed: true})

//                 }, (error) => {
//                     console.log(error);
//                     this.setState({messageError: 'token expiré.'});
//                 });
//         }

   

//     render() {
//         return (
//             <div>
//                 <div className="d-flex align-items-center auth px-0" style={{
//                     backgroundImage: `url(${Background})`,
//                     backgroundSize: 'cover',
//                     width: '100vw',
//                     height: '100vh'
//                 }}>
//                     <div className="row w-100 mx-0">
//                         <div className="col-lg-4 mx-auto">
//                             <div className="auth-form-light text-left py-5 px-4 px-sm-5">
//                                 <h4>Réinitialiser votre OTP</h4>
//                                 {/*<h6 className="font-weight-light">Se connecter pour continuer.</h6>*/}
//                                 <br/> <br/>

//                                 <Form
//                                         method="post"
//                                         onSubmit={this.handleSubmit}
//                                         ref={c => {
//                                             this.form = c;
//                                         }}
//                                     >
                                        
//                                         <div className="form-group">
//                                             <button
//                                                 className="btn btn-dark btn-block"
//                                                 disabled={this.state.loading}
//                                             >
//                                                 {this.state.loading && (
//                                                     <span className="spinner-border spinner-border-sm"></span>
//                                                 )}
//                                                 <span>Reset OTP</span>
//                                             </button>
//                                         </div>
//                                         {this.state.messageError && (
//                                             <div className="form-group">
//                                                 <div className="alert alert-danger" role="alert">
//                                                     {this.state.messageError}
//                                                 </div>
//                                             </div>
//                                         )}

//                                         <CheckButton
//                                             style={{display: "none"}}
//                                             ref={c => {
//                                                 this.checkBtn = c;
//                                             }}
//                                         />
//                                     </Form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default ResetOtp

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
import {lost_otp_reset_password} from "../../utils/constants";
import http from "../../http";

export class ResetOtp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: null,
            messageError: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
     
    }

    componentDidMount() {
        const emptyVal = new URLSearchParams(window.location.search);
        this.setState({token: emptyVal.get('token')});
    }

    handleSubmit(e) {
        e.preventDefault();
        
            http.post(lost_otp_reset_password, {
                'token': this.state.token,
            })
                .then((response) => {
                    console.log(response);
                    

                }, (error) => {
                    console.log(error);
                    this.setState({messageError: 'token expiré.'});
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
                                <h4>Réinitialiser votre OTP</h4>
                                <br/> <br/>

                                <Form
                                        method="post"
                                        onSubmit={this.handleSubmit}
                                        ref={c => {
                                            this.form = c;
                                        }}
                                    >
                                        
                                        <div className="form-group">
                                            <button
                                                className="btn btn-dark btn-block"
                                                disabled={this.state.loading}
                                            >
                                                {this.state.loading && (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                )}
                                                <span>Reset OTP</span>
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
                                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetOtp
