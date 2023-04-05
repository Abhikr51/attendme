import { Platform } from "react-native"
import { baseURL, merchant_storesURL, merchant_store_create } from "../../configs/AppData"
import Api from "../../helpers/Api"
import { showToast } from "../../helpers/__globals_funcs"
import LocalKeyStore from "../../storage/AsyncStorage"

export const SET_STORE = "SET_STORE"
export const CREATE_STORE = "CREATE_STORE"
export const CLEAR_STORE = "CLEAR_STORE"

export const setMerchantStores = () => {
  return async(dispatch) => {
    await Api.get(baseURL + merchant_storesURL).then((res) => {
      if (res.data.status) {
        dispatch({
          type: SET_STORE,
          payload: res.data.data
        })
      }else{
        console.log("store err", res.data.message)
      }
    }).catch(err => {
      console.log("store Err", err);
    })

  }
}
export const createStore = (values) => {
  return async (dispatch) => {
      var token = Api.defaults.token;
      var FData = new FormData();
      // await LocalKeyStore.getKey('authData', (err, value) => {
      //     if (value) {
      //         token = value.token
      //     }
      // })
      FData.append('name', values.name);
      if(values.image){
        FData.append('image', {
            uri: Platform.OS === 'android' ? values.image.uri : values.image.uri.replace('file://', ''),
            // uri: values.image.uri, 
            name: values.image.name,
            type: 'image/png',
        });
      }
      FData.append('email', values.email);
      FData.append('phone', values.phone);
      FData.append('pincode', values.pincode);
      FData.append('description', values.description);
      FData.append('store_type', values.storeType);
      FData.append('latitude', values.location.lat);
      FData.append('longitude', values.location.lng);
      FData.append('address', values.address);
      FData.append('geo_location', values.geo_location);
      await fetch(baseURL + merchant_store_create, {
          method: 'post',
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': "Bearer " + token
          },
          body: FData
      })
      .then(response => response.json())
      .then(resData => {
          console.log("upload", resData.data);
          if(resData.status){
              dispatch({
                  type : CREATE_STORE,
                  payload : resData.data
              })
              // dispatch(setMerchantStores())
              console.log(resData.message)
              showToast(resData.message)
          }
      }).catch(err => {
          console.log(err)
          throw new Error(err.message);
      })
  }
}
export const clearStores = () => {
  return (despatch) => {
    despatch({
      type: CLEAR_STORE
    })
  }
}



