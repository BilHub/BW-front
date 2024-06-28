import{
     ASSET_NUMBER_REQUEST,
     ASSET_NUMBER_SUCCESS,
     ASSET_NUMBER_FAIL,
     asset_number_url,
}
from "../utils/constants"

import axios from 'axios'
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


 export const TicketNumberAction = () => async (dispatch) =>{
      try {
         dispatch ({
             type: TICKET_NUMBER_REQUEST
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
         const {data} = await axios.post( ticket_number_url,
         {},
         config)
         dispatch ({
            type: TICKET_NUMBER_SUCCESS, payload: data
        })


      }
      catch(error){
        dispatch ({type: TICKET_NUMBER_FAIL, payload: error.response && error.response.data.detail ? error.response.data.message : error.message})
      }
  }
