import {
    ADD_TICKET_REQUEST,
    ADD_TICKET_SUCCESS,
    ADD_TICKET_FAIL,

    ASSIGN_TICKET_REQUEST,
    ASSIGN_TICKET_SUCCESS,
    ASSIGN_TICKET_FAIL,


    ADD_MULTI_TICKETS_REQUEST,
     ADD_MULTI_TICKETS_SUCCESS,
      ADD_MULTI_TICKETS_FAIL,
   add_ticket_url,
   add_all_tickets_url,
   assign_ticket_url



  } from "../utils/constants";

import {
    UPDATE_TICKET_REQUEST,
    UPDATE_TICKET_SUCCESS,
    UPDATE_TICKET_FAIL,
    modify_ticket_url,



  } from "../utils/constants";

 import axios from 'axios'

  export const addTicket = (cpe, asset, cve, score, action, comment, info, due_date, title, description, cvss) => async (dispatch) =>{
      try {
         dispatch ({
             type: ADD_TICKET_REQUEST
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
         console.log("cvss from action", cvss)
         const {data} = await axios.post(add_ticket_url,
         {'cpe':cpe, 'asset':asset, 'cve': cve, 'score': score, 'action':action, 'comment': comment , 'info': info, 'due_date': due_date, 'title': title, 'description': description, 'cvss': cvss},
         config)
         dispatch ({
            type: ADD_TICKET_SUCCESS, payload: data
        })


      }
      catch(error){
        dispatch ({type: ADD_TICKET_FAIL, payload: error.response && error.response.data.detail ? error.response.data.message : error.message})
      }
  }

export const addMultiTicket = (cpe, cve,  action, comment, info, due_date, title, description, cvss) => async (dispatch) =>{
      try {
         dispatch ({
             type: ADD_MULTI_TICKETS_REQUEST
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
         console.log("cvss from action", cvss)
         const {data} = await axios.post(add_all_tickets_url,
         {'cpe':cpe, 'cve': cve,  'action':action, 'comment': comment , 'info': info, 'due_date': due_date, 'title': title, 'description': description, 'cvss': cvss},
         config)
         dispatch ({
            type: ADD_MULTI_TICKETS_SUCCESS, payload: data
        })


      }
      catch(error){
        dispatch ({type: ADD_MULTI_TICKETS_FAIL, payload: error.response && error.response.data.detail ? error.response.data.message : error.message})
      }
  }

export const ModifTicketAction = (ticket_id, statut, action, commentaire) => async (dispatch) =>{
      try {
         dispatch ({
             type: UPDATE_TICKET_REQUEST
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
         const s="1";
         console.log(statut)
         if (statut ==="En attente"){
            s = "0"

         }
         else if (statut === "En cours de traitement"){
          s = "1"
         }
         else if (statut === "Traité"){
          s = "2"
         }
         else {
         s = "0"
         }
         console.log("s", s)
         const {data} = await axios.post(modify_ticket_url,
         {'ticket_id':ticket_id, 'status':s, 'comment':commentaire, 'action':action},
         config)
         dispatch ({
            type: UPDATE_TICKET_SUCCESS, payload: data
        })


      }
      catch(error){
        dispatch ({type: UPDATE_TICKET_FAIL, payload: error.response && error.response.data.detail ? error.response.data.message : error.message})
      }
  }


export const assignTicket = (ticket_id, responsable, dueDate, notifier) => async (dispatch) =>{
      try {
         dispatch ({
             type: ASSIGN_TICKET_REQUEST
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

         const {data} = await axios.post(assign_ticket_url,
         {'ticket_id':ticket_id, 'responsable':responsable, 'dueDate': dueDate, 'notifier': notifier  },
         config)
         dispatch ({
            type: ASSIGN_TICKET_SUCCESS, payload: data
        })


      }
      catch(error){
        dispatch ({type: ASSIGN_TICKET_FAIL, payload: error.response && error.response.data.detail ? error.response.data.message : error.message})
      }
  }