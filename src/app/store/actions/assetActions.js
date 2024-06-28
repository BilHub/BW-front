import {
    ADD_ASSET_FAIL,
    ADD_ASSET_REQUEST,
    ADD_ASSET_SUCCESS,
    addactif_url,
    ASSET_DETAIL_FAIL,
    ASSET_DETAIL_REQUEST,
    ASSET_DETAIL_SUCCESS,
    asset_detail_url,
    ASSET_LIST_FAIL,
    ASSET_LIST_REQUEST,
    ASSET_LIST_SUCCESS,
    assetlist_url,
    etatactif_url,
    modifasset_url,
    search_actif_url,
    SEARCH_ASSET_FAIL,
    SEARCH_ASSET_REQUEST,
    SEARCH_ASSET_SUCCESS,
    STATUS_ASSET_FAIL,
    STATUS_ASSET_REQUEST,
    STATUS_ASSET_SUCCESS,
    UPDATE_ASSET_FAIL,
    UPDATE_ASSET_REQUEST,
    UPDATE_ASSET_SUCCESS,
} from "../utils/constants";

import axios from 'axios'
import http from "../../http";

export const addActif = (asset_ref, service, importance, valueCollab) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_ASSET_REQUEST
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
        const {data} = await axios.post(addactif_url,
            {'asset_ref': asset_ref, 'service': service, 'importance': importance, 'collab': valueCollab},
            config)
        dispatch({
            type: ADD_ASSET_SUCCESS, payload: data
        })


    } catch (error) {
        dispatch({
            type: ADD_ASSET_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.message : error.message
        })
    }
}
export const EtatActifAction = (asset_ref, status) => async (dispatch) => {
    try {
        dispatch({
            type: STATUS_ASSET_REQUEST
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
        const {data} = await axios.post(etatactif_url,
            {'asset_ref': asset_ref, 'status': status},
            config)
        dispatch({
            type: STATUS_ASSET_SUCCESS, payload: data
        })


    } catch (error) {
        dispatch({
            type: STATUS_ASSET_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.message : error.message
        })
    }
}
export const ModifAssetAction = (asset_ref, service, importance, collab) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_ASSET_REQUEST
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
        const {data} = await axios.post(modifasset_url,
            {'asset_ref': asset_ref, 'service': service, 'importance': importance, 'collab': collab},
            config)
        dispatch({
            type: UPDATE_ASSET_SUCCESS, payload: data
        })


    } catch (error) {
        dispatch({
            type: UPDATE_ASSET_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.message : error.message
        })
    }
}

export const SearchAssetAction = (asset_ref, service, status) => async (dispatch) => {
    try {
        dispatch({
            type: SEARCH_ASSET_REQUEST
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
        const {data} = await axios.post(search_actif_url,
            {'asset_ref': asset_ref, 'service': service, 'status': status},
            config)
        console.log("data sr", data)


        dispatch({
            type: SEARCH_ASSET_SUCCESS, payload: data
        })


    } catch (error) {
        dispatch({
            type: SEARCH_ASSET_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.message : error.message
        })
    }
}


export const AssetListAction = () => async (dispatch) => {
    try {
        dispatch({
            type: ASSET_LIST_REQUEST
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
        const {data} = await http.get(assetlist_url)
        dispatch({
            type: ASSET_LIST_SUCCESS, payload: data
        })
        console.log(data)
        localStorage.setItem('assets', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: ASSET_LIST_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.message : error.message
        })
    }
}

export const singleAssetDetail = (asset_ref) => async (dispatch) => {


    try {
        dispatch({type: ASSET_DETAIL_REQUEST})
        const {data} = await http.get(`${asset_detail_url}${asset_ref}`)


        dispatch({type: ASSET_DETAIL_SUCCESS, payload: data})
    } catch (error) {
        dispatch({
            type: ASSET_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}