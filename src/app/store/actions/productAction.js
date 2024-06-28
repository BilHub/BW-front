import{
    ADD_PRODUIT_REQUEST,
    ADD_PRODUIT_SUCCESS,
    ADD_PRODUIT_FAIL,
    add_produit_url,

} from "../utils/constants";
import axios from 'axios'

 export const AddProduitAction = (asset_ref, name , type , version, producer) => async (dispatch) =>{
      try {
         dispatch ({
             type: ADD_PRODUIT_REQUEST
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
         const {data} = await axios.post( add_produit_url,
         {'asset_ref':asset_ref, 'name':name, 'version': version, 'type':type, 'producer':producer},
         config)
         dispatch ({
            type: ADD_PRODUIT_SUCCESS, payload: data
        })


      }
      catch(error){
        dispatch ({type: ADD_PRODUIT_FAIL, payload: error.response && error.response.data.detail ? error.response.data.message : error.message})
      }
  }

