import{
    ADD_PRODUIT_REQUEST,
    ADD_PRODUIT_SUCCESS,
    ADD_PRODUIT_FAIL,

} from "../utils/constants";

export const AddProductReducer = (state = {}, action) =>{
switch (action.type) {
    case ADD_PRODUIT_REQUEST:
      return { loading: true};
    case ADD_PRODUIT_SUCCESS:
      return { loading: false, userProfile: action.payload };
    case ADD_PRODUIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};