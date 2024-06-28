import {
    SERVICE_LIST_REQUEST,
    SERVICE_LIST_SUCCESS,
    SERVICE_LIST_FAIL,


} from "../utils/constants";
import {
    ADD_SERVICE_REQUEST,
    ADD_SERVICE_SUCCESS,
    ADD_SERVICE_FAIL,
    add_service_url,
} from "../utils/constants"

export const serviceReducer = (state = { services: []}, action) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
      return { loading: true, services: []};
    case SERVICE_LIST_SUCCESS:
      return { loading: false, services :action.payload };
    case SERVICE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const AddServiceReducer = (state = { services: []}, action) => {
  switch (action.type) {
    case ADD_SERVICE_REQUEST:
      return { loading: true, services: []};
    case ADD_SERVICE_SUCCESS:
      return { loading: false, services :action.payload };
    case ADD_SERVICE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};