import { SET_CONFIG } from "../actions/ConfigAction";


const initConfig = {
    token : '',
    storeID : null,
    isRegistered : false
}
const ConfigReducer = (state =initConfig, action) => {
    var tempConfig = {}
    switch (action.type) {
        case SET_CONFIG:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default ConfigReducer;