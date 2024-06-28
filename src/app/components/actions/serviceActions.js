import {
    SERVICE_LIST_REQUEST,
    SERVICE_LIST_SUCCESS,
    SERVICE_LIST_FAIL,
    servicelist_url,


  } from "../../utils/constants";
import {
    ADD_SERVICE_REQUEST,
    ADD_SERVICE_SUCCESS,
    ADD_SERVICE_FAIL,
    add_service_url,
} from "../../utils/constants"
 import axios from 'axios'
import http from "../../http";
  export const ServiceListAction = () => async (dispatch) =>{
      try {
         dispatch ({
             type: SERVICE_LIST_REQUEST
         })
        const userInfo = localStorage.getItem('userInfo')
        console.log("userInfo", userInfo)
        const rev = userInfo.replaceAll('"', '')
        const ch=`Bearer ${rev}`
        const config = {
         headers: {
            'Content-Type': 'application/json',
             Authorization: ch }
           }
         console.log("config", config)
         const {data} = await axios.get(servicelist_url,
         config)
         dispatch ({
            type: SERVICE_LIST_SUCCESS, payload: data
        })
        console.log(data)
        localStorage.setItem('service', JSON.stringify(data))


      }
      catch(error){
        dispatch ({type: SERVICE_LIST_FAIL, payload: error.response && error.response.data.detail ? error.response.data.message : error.message})
      }
  }

export const AddServiceAction = (name, localisation, description) => async (dispatch) =>{
      try {
         dispatch ({
             type: ADD_SERVICE_REQUEST
         })
        const userInfo = localStorage.getItem('userInfo')
        console.log("userInfo", userInfo)
        const rev = userInfo.replaceAll('"', '')
        const ch=`Bearer ${rev}`
        const config = {
         headers: {
            'Content-Type': 'application/json',
             Authorization: ch }
           }
         console.log("config", config)
         const {data} = await http.post(add_service_url,
           {'name':name, 'localisation': localisation, 'description': description},
         )
         dispatch ({
            type: ADD_SERVICE_SUCCESS, payload: data
        })
        console.log(data)



      }
      catch(error){
        dispatch ({type: ADD_SERVICE_FAIL, payload: error.response && error.response.data.detail ? error.response.data.message : error.message})
      }
  }


