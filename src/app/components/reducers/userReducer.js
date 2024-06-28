import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAIL_REQUEST,
  USER_DETAIL_SUCCESS,
  USER_DETAIL_FAIL,
    USER_CHANGE_PASSWORD_REQUEST,
    USER_CHANGE_PASSWORD_SUCCESS,
    USER_CHANGE_PASSWORD_FAIL,
    LOGIN_2FA_REQUEST,
    LOGIN_2FA_SUCCESS,
    LOGIN_2FA_FAIL,

} from "../../utils/constants";
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true};
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {  };

    default:
      return state;
  }
};
export const userDetailReducer = (state = {}, action) =>{
switch (action.type) {
    case USER_DETAIL_REQUEST:
      return { loading: true};
    case USER_DETAIL_SUCCESS:
      return { loading: false, userProfile: action.payload };
    case USER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_CHANGE_PASSWORD_REQUEST:
      return { loading1: true};
    case USER_CHANGE_PASSWORD_SUCCESS:
      return { loading1: false, data: action.payload };
    case USER_CHANGE_PASSWORD_FAIL:
      return { loading1: false, erroring: action.payload };
    default:
      return state;
  }
};

export const user2FaReducer = (state = {}, action) => {
  switch (action.type) {
    case  LOGIN_2FA_REQUEST:
      return { loading1: true};
    case  LOGIN_2FA_SUCCESS:
      return { loading1: false, data: action.payload };
    case LOGIN_2FA_FAIL:
      return { loading1: false, erroring: action.payload };
    default:
      return state;
  }
};