import {
    UPDATE_TICKET_REQUEST,
    UPDATE_TICKET_SUCCESS,
    UPDATE_TICKET_FAIL,
    modify_ticket_url,
    ADD_TICKET_REQUEST,
    ADD_TICKET_SUCCESS,
    ADD_TICKET_FAIL,


    ASSIGN_TICKET_REQUEST,
    ASSIGN_TICKET_SUCCESS,
    ASSIGN_TICKET_FAIL,


    ADD_MULTI_TICKETS_REQUEST,
     ADD_MULTI_TICKETS_SUCCESS,
      ADD_MULTI_TICKETS_FAIL,



  } from "../utils/constants";
 import axios from 'axios'

export const ModifTicketReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TICKET_REQUEST:
      return { loading: true};
    case UPDATE_TICKET_SUCCESS:
      return { loading: false, modifTicket: action.payload};
    case UPDATE_TICKET_FAIL:
      return { loading: false, error: action.payload };
  }
}


export const addTicketReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TICKET_REQUEST:
      return { loading: true};
    case ADD_TICKET_SUCCESS:
      return { loading: false, addTicket: action.payload};
    case ADD_TICKET_FAIL:
      return { loading: false, error: action.payload };
       default:
      return state;
  }
}

export const addMultiTicketReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_MULTI_TICKETS_REQUEST:
      return { loading: true};
    case ADD_MULTI_TICKETS_SUCCESS:
      return { loading: false, addTicket: action.payload};
    case ADD_MULTI_TICKETS_FAIL:
      return { loading: false, error: action.payload };
       default:
      return state;
  }
}


export const assignTicketReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSIGN_TICKET_REQUEST:
      return { loading: true};
    case ASSIGN_TICKET_SUCCESS:
      return { loading: false, assignTicket: action.payload};
    case ASSIGN_TICKET_FAIL:
      return { loading: false, error: action.payload };
       default:
      return state;
  }
}