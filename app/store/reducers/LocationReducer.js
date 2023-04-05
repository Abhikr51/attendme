import { SET_LOCATION } from "../actions/LocationActions";


const initialState = {
  lat: '',
  lng:'',
  address:''
};

export const LocationReducer =  (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
       lat:action.lat,
       lng:action.lng,
       address:action.address
      };

    default:
      return state;
  }
};
export default LocationReducer;