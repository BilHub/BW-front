import{
    TICKET_NUMBER_REQUEST,
    TICKET_NUMBER_SUCCESS,
    TICKET_NUMBER_FAIL,
    ASSET_NUMBER_REQUEST,
    ASSET_NUMBER_SUCCESS,
    ASSET_NUMBER_FAIL,
}
from "../utils/constants"

export const TicketNumberReducer = (state = {}, action) =>{
switch (action.type) {
    case ASSET_NUMBER_REQUEST:
      return { loading: true};

    case ASSET_NUMBER_SUCCESS:
      return { loading: false, userProfile: action.payload };

    case ASSET_NUMBER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};