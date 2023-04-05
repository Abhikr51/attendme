import Api from "../../helpers/Api";
import LocalKeyStore from "../../storage/AsyncStorage";


export const SET_LOCATION = 'SET_LOCATION';

// export const setLatLng = (lat,lng,address) => {
//     return async (dispatch, getState) => {

//        dispatch({
//               type: SET_LOCATION,
//               lat,
//               lng,
//               address
//             });

//         }
// }
export const loadLocation = () => {
  return async (dispatch, getState) => {
    await LocalKeyStore.getKey('location', (err, value) => {
      if (value) {
        Api.defaults['geo_lat'] = value.lat;
        Api.defaults['geo_long'] = value.lng;
        dispatch({
          type: SET_LOCATION,
          lat: value.lat,
          lng: value.lng,
          address: value.address
        });

      }

    })
  }
}
export const setLatLng = (lat, lng, address) => {
  return async (dispatch, getState) => {

    dispatch({
      type: SET_LOCATION,
      lat,
      lng,
      address
    });

  }
}