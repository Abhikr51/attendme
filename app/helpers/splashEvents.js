import LocalKeyStore from "../storage/AsyncStorage";
import { setCategories } from "../store/actions/CategoryActions";
import { setConfig } from "../store/actions/ConfigAction";
import { loadLocation } from "../store/actions/LocationActions";
import { setMerchantStores } from "../store/actions/StoreActions";
import Api from "./Api";


const splashEvents = async (dispatch, loginToken, user,type='user') => {
  Api.defaults["token"] = loginToken
  // await dispatch(loadLocation())
  if (type == 'vendor') {
    await LocalKeyStore.getKey('selectedStore', (err, value) => {
      if (value) {
        if (value.userID == user.id) {
          dispatch(setConfig('storeID', value.storeID))
        } else {
          dispatch(setConfig('storeID', null))
        }
      } else {
        dispatch(setConfig('storeID', null))
      }
    })
    await dispatch(setMerchantStores())
  }
  //Splash Events
  dispatch(setCategories());

}


export default splashEvents;