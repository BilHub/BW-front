import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import jwt_decode from "jwt-decode";

const RouteGuard = ({component: Component, ...rest}) => {


    function hasJWT() {
        let flag = false;
        const userInfo = localStorage.getItem('user')
        const user = JSON.parse(localStorage.getItem('user'));
        const fa = localStorage.getItem('2fa')


        if (user) {
            const {exp} = jwt_decode(user.token)
            const expirationTime = (exp * 1000) - 60000

            if (Date.now() >= expirationTime) {
                flag = false
            } else {
                flag = true
            }

        }


        return flag
    }

    return (
        <Route {...rest}
               render={props => (
                   hasJWT() ?
                       <Component {...props} />
                       :
                       <Redirect to={{pathname: 'user-pages/login-1'}}/>
               )}
        />
    );
};

export default RouteGuard;