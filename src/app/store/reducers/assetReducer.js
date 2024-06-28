import {
    ADD_ASSET_REQUEST,
    ADD_ASSET_SUCCESS,
    ADD_ASSET_FAIL,

     SEARCH_ASSET_REQUEST,
    SEARCH_ASSET_SUCCESS,
    SEARCH_ASSET_FAIL,
    ASSET_DETAIL_REQUEST,
    ASSET_DETAIL_SUCCESS,
    ASSET_DETAIL_FAIL,

} from "../utils/constants";

import{
    STATUS_ASSET_REQUEST,
    STATUS_ASSET_SUCCESS,
    STATUS_ASSET_FAIL,
    ASSET_LIST_REQUEST,
    ASSET_LIST_SUCCESS,
    ASSET_LIST_FAIL,

} from "../utils/constants";

import{
    UPDATE_ASSET_REQUEST,
    UPDATE_ASSET_SUCCESS,
    UPDATE_ASSET_FAIL,

} from "../utils/constants";

export const etatAssetReducer = (state = {}, action) => {
  switch (action.type) {
    case STATUS_ASSET_REQUEST:
      return { loading: true};
    case STATUS_ASSET_SUCCESS:
      return { loading: false, etatAsset: action.payload};
    case STATUS_ASSET_FAIL:
      return { loading: false, error: action.payload };
       default:
      return state;
  }
}

export const addAssetReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ASSET_REQUEST:
      return { loading2: true};
    case ADD_ASSET_SUCCESS:
      return { loading2: false, addAsset: action.payload};
    case ADD_ASSET_FAIL:
      return { loading: false, error2: action.payload };
     default:
      return state;
  }
}
export const ModifAssetReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ASSET_REQUEST:
      return { loading: true};
    case UPDATE_ASSET_SUCCESS:
      return { loading: false, addAsset: action.payload};
    case UPDATE_ASSET_FAIL:
      return { loading: false, error: action.payload };
       default:
      return state;
  }
}
export const SearchAssetReducer = (state = { assets: [] } , action) => {
  switch (action.type) {
    case SEARCH_ASSET_REQUEST:
      return { loading: true};
    case SEARCH_ASSET_SUCCESS:
      return { loading: false, searchAsset: action.payload};
    case SEARCH_ASSET_FAIL:
      return { loading: false, error: action.payload };
     default:
      return state
  }
}
export const assetListReducer = (state = { assets: []}, action) => {
  switch (action.type) {
    case ASSET_LIST_REQUEST:
      return { loading: true, assets: []};
    case ASSET_LIST_SUCCESS:
      return { loading: false, assets :action.payload };
    case ASSET_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const assetSingleReducer = (state = { asset: {} }, action) => {
  switch (action.type) {
    case  ASSET_DETAIL_REQUEST:
      return { loading: true, ...state };
    case  ASSET_DETAIL_SUCCESS:
      return { loading: false, asset: action.payload };
    case  ASSET_DETAIL_FAIL:
        return { loading: false, error: action.payload };
    default:
         return state
  }
};