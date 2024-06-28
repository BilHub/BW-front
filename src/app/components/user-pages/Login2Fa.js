import React, {useEffect, useReducer, useRef, useState} from "react";
import "./style.css";
import Background from './assets/images/Background.jpg'
import axios from 'axios'
import {Link, useHistory} from "react-router-dom";
import QRCode from "react-qr-code";
import {login2fa, qr_2fa} from "../../utils/constants";
import http from "../../http";

function doSubmit(submittedValues) {
    console.log(`Submitted: ${submittedValues.join("")}`);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1500);
    });
}

function clampIndex(index) {
    if (index > 6) {
        return 6;
    } else if (index < 0) {
        return 0;
    } else {
        return index;
    }
}

function reducer(state, action) {
    switch (action.type) {
        case "INPUT":
            return {
                ...state,
                inputValues: [
                    ...state.inputValues.slice(0, action.payload.index),
                    action.payload.value,
                    ...state.inputValues.slice(action.payload.index + 1)
                ],
                focusedIndex: clampIndex(state.focusedIndex + 1)
            };

        case "BACK":
            return {
                ...state,
                focusedIndex: clampIndex(state.focusedIndex - 1)
            };

        case "PASTE":
            return {
                ...state,
                inputValues: state.inputValues.map(
                    (_, index) => action.payload.pastedValue[index] || ""
                )
            };

        case "FOCUS":
            return {
                ...state,
                focusedIndex: action.payload.focusedIndex
            };

        case "VERIFY":
            return {
                ...state,
                status: "pending"
            };

        case "VERIFY_SUCCESS":
            return {
                ...state,
                status: "idle"
            };
        case "VERIFY_ERROR":
            return {
                ...state,
                msgErreur: "Code incorrect"
            };

        default:
            throw new Error("unknown action");
    }
}

const initialState = {
    inputValues: Array(6).fill(""),
    focusedIndex: 0,
    status: "idle",
    msgErreur: "",
};

export default function Login2Fa() {
    const [email, setEmail] = useState(null);
    const [secret, setSecret] = useState(null);
    const [qrScanned, setQrScanned] = useState(false);
    useEffect(function () {
        http.get(qr_2fa)
            .then((response) => {
                setEmail(response.data.email)
                setSecret(response.data.secret)
            }, (error) => {

            });
    });

    const history = useHistory()
    const [{inputValues, focusedIndex, status, msgErreur}, dispatch] = useReducer(
        reducer,
        initialState
    );

    // console.log(focusedIndex);

    function handleInput(index, value) {
        dispatch({type: "INPUT", payload: {index, value}});
    }

    function handleBack() {
        dispatch({type: "BACK"});
    }

    function handleError() {
        dispatch({type: "VERIFY_ERROR"});
    }

    function handlePaste(pastedValue) {
        dispatch({type: "PASTE", payload: {pastedValue}});

        if (pastedValue.length === 6) {
            dispatch({type: "VERIFY"});
            doSubmit(pastedValue.split("")).then(() =>
                dispatch({type: "VERIFY_SUCCESS"})
            );
        }
    }

    function handleFocus(focusedIndex) {
        dispatch({type: "FOCUS", payload: {focusedIndex}});
    }

    function handleSubmit(e) {
        e.preventDefault();
        const otp = inputValues[0] + inputValues[1] + inputValues[2] + inputValues[3] + inputValues[4] + inputValues[5]
        http.post(login2fa, {
            otp
        }).then((response) => {
                console.log(response);
                localStorage.setItem("2fa", "2fa");
                history.push('/')
            }, (error) => {
                console.log(error);
                handleError()
            });

    }

    return (
        <main className="main-content  mt-0 login2fa">
            <div className="page-header align-items-start min-vh-100" style={{
                backgroundSize: 'cover',
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${Background})`

            }}>
                <span className="mask bg-gradient-dark opacity-6"/>
                <div className="container my-auto">
                    <div className="row">
                        <div className="mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-dark shadow-primary border-radius-lg py-3 pe-1"
                                         style={{backgroundColor: 'black'}}>
                                        <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Double
                                            authentification</h4>

                                    </div>
                                </div>
                                {!email || qrScanned ? <div className="card-body">
                                    {msgErreur ? <h9 style={{color: 'red'}}> {msgErreur} </h9> : null}
                                    <form onSubmit={handleSubmit}>
                                        <div className="inputs">
                                            {inputValues.map((value, index) => {
                                                return (
                                                    <Input
                                                        key={index}
                                                        index={index}
                                                        value={value}
                                                        onChange={handleInput}
                                                        onBackspace={handleBack}
                                                        onPaste={handlePaste}
                                                        isFocused={index === focusedIndex}
                                                        onFocus={handleFocus}
                                                        isDisabled={status === "pending"}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <button disabled={status === "pending"}>
                                            {status === "en attente" ? "Vérifier..." : "Vérifier"}
                                        </button>
                                    </form>
                                    <Link to="lost-otp" relative="path">OTP perdu</Link>
                                </div>
                                :
                                <div className="card-body qr-container">
                                    <QRCode value={`otpauth://totp/${email}?secret=${secret}&issuer=brightwatch`} />
                                    <button className='btn btn-primary' onClick={() => setQrScanned(true)}>Saisir votre code</button>
                                </div>

                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}

function Input({
                   index,
                   value,
                   onChange,
                   onPaste,
                   onBackspace,
                   isFocused,
                   onFocus,
                   isDisabled
               }) {
    const ref = useRef();
    useEffect(() => {
        requestAnimationFrame(() => {
            // console.log(
            //   ref.current,
            //   document.activeElement,
            //   ref.current !== document.activeElement
            // );
            if (ref.current !== document.activeElement && isFocused) {
                ref.current.focus();
            }
        });
    }, [isFocused]);

    function handleChange(e) {
        onChange(index, e.target.value);
    }

    function handlePaste(e) {
        onPaste(e.clipboardData.getData("text"));
    }

    function handleKeyDown(e) {
        if (e.key === "Backspace") {
            onBackspace();
        }
    }

    function handleFocus(e) {
        e.target.setSelectionRange(0, 1);
        onFocus(index);
    }

    return (
        <input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            onPaste={handlePaste}
            onKeyDown={handleKeyDown}
            maxLength="1"
            onFocus={handleFocus}
            disabled={isDisabled}
        />
    );
}

// 123456
// 654321
