import {
    change_password_url,
    LOGIN_2FA_FAIL,
    LOGIN_2FA_REQUEST,
    LOGIN_2FA_SUCCESS,
    login_2fa_url,
    login_url,
    USER_CHANGE_PASSWORD_FAIL,
    USER_CHANGE_PASSWORD_REQUEST,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_DETAIL_FAIL,
    USER_DETAIL_REQUEST,
    USER_DETAIL_SUCCESS,
    user_detail_url,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from "../../utils/constants";
import axios from 'axios'
import http from "../../http";


export const login = (username, password) => async (dispatch) => {

    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await http.post(login_url,
            {'username': username, 'password': password},
            )
        dispatch({
            type: USER_LOGIN_SUCCESS, payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data.token))
        localStorage.setItem('username', JSON.stringify(data.username))
        localStorage.setItem('nom', JSON.stringify(data.nom))
        localStorage.setItem('prenom', JSON.stringify(data.prenom))
        localStorage.setItem('role', JSON.stringify(data.role))
        localStorage.setItem('nb_assets', JSON.stringify(data.ass))
        localStorage.setItem('unread_tickets_number', JSON.stringify(data.count))
        localStorage.setItem('unread_tickets_number', JSON.stringify(data.count))
        localStorage.setItem('count_tickets_dash', JSON.stringify(data.count_tickets_dash))
        localStorage.setItem('count_criticity', JSON.stringify(data.high_criticity))
        localStorage.setItem('nb_service', JSON.stringify(data.service))
        localStorage.setItem('nombre_actif', JSON.stringify(data.ass))
        console.log("srsv count", data.service)
        localStorage.setItem('nb_vul', JSON.stringify(data.nb_vul))
        localStorage.setItem('email', JSON.stringify(data.email))
        localStorage.setItem('nb_vul', JSON.stringify(data.nb_vul))
        localStorage.setItem('country_code', JSON.stringify(data.country_code))
        localStorage.setItem('phone', JSON.stringify(data.phone))
        localStorage.setItem('company', JSON.stringify(data.company))
        localStorage.setItem('company_desc', JSON.stringify(data.company_desc))
        localStorage.setItem('assets_products', JSON.stringify(data.assets_products))
        localStorage.setItem('tickets_traites', JSON.stringify(data.tickets_traites))
        localStorage.setItem('tickets_non_traites', JSON.stringify(data.tickets_non_traites))
        console.log("nb_vuls", data.nb_vul)


    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.message : error.message
        })
    }
}
export const logout = () => (dispatch) => {
    localStorage.clear()
    dispatch({type: USER_LOGOUT})
}
export const UserDetailAction = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAIL_REQUEST
        })
        const userInfo = localStorage.getItem('userInfo')
        console.log("userInfo", userInfo)
        const rev = userInfo.replaceAll('"', '')
        const ch = `Bearer ${rev}`
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: ch
            }
        }
        console.log("config", config)
        const {data} = await axios.get(user_detail_url,
            config)
        dispatch({
            type: USER_DETAIL_SUCCESS, payload: data
        })
        console.log("data", data)
        localStorage.setItem('username', JSON.stringify(data.username))
        localStorage.setItem('nom', JSON.stringify(data.nom))
        localStorage.setItem('prenom', JSON.stringify(data.prenom))
        localStorage.setItem('role', JSON.stringify(data.role))
        localStorage.setItem('nb_assets', JSON.stringify(data.ass))
        localStorage.setItem('unread_tickets_number', JSON.stringify(data.count))
        localStorage.setItem('unread_tickets_number', JSON.stringify(data.count))
        localStorage.setItem('count_tickets_dash', JSON.stringify(data.count_tickets_dash))
        localStorage.setItem('count_criticity', JSON.stringify(data.high_criticity))
        localStorage.setItem('nb_service', JSON.stringify(data.service))
        localStorage.setItem('nombre_actif', JSON.stringify(data.ass))
        localStorage.setItem('nb_vul', JSON.stringify(data.nb_vul))
        console.log("nb_vuls", data.nb_vul)


    } catch (error) {
        dispatch({
            type: USER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.message : error.message
        })
    }
}

export const changeMDP = (oldPassword, newPassword1, newPassword2) => async (dispatch) => {

    try {
        dispatch({
            type: USER_CHANGE_PASSWORD_REQUEST
        })

        const {data} = await http.post(change_password_url,
            {'old_password': oldPassword, 'password1': newPassword1, 'password2': newPassword2},
            )
        dispatch({
            type: USER_CHANGE_PASSWORD_SUCCESS, payload: data
        })
        localStorage.setItem('password_changed', JSON.stringify(data.msg))


    } catch (error) {

        dispatch({
            type: USER_CHANGE_PASSWORD_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.message : error.message
        })
        localStorage.setItem('password_changed', 'erreur')
    }
}


export const Login_2fa = (field1, field2, field3, field4, field5, field6) => async (dispatch) => {

    try {
        dispatch({
            type: LOGIN_2FA_REQUEST
        })
        const userInfo = localStorage.getItem('userInfo')

        const rev = userInfo.replaceAll('"', '')
        const ch = `Bearer ${rev}`
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: ch
            }
        }
        const otp = field1 + field2 + field3 + field4 + field5 + field6
        console.log('otp', otp)
        const {data} = await axios.post(login_2fa_url,
            {'otp': otp},
            config)
        dispatch({
            type: LOGIN_2FA_SUCCESS, payload: data
        })
        localStorage.setItem('2fa', "success")


    } catch (error) {

        dispatch({
            type: LOGIN_2FA_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.message : error.message
        })
        localStorage.setItem('2fa', 'failed')
    }
}