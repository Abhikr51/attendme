import { baseURL, hostURL, socketURL } from "../../configs/AppData";
import Api from "../../helpers/Api";

export const SET_CONFIG = "SET_CONFIG"
export const LOAD_CONFIG = "LOAD_CONFIG"
const getConfigURL = "https://astergo.in/configapi.php";

export const setConfig = (key, data) => {
    return (dispatch) => {
        var temp = {
            [key]: data
        }
        dispatch({
            type: SET_CONFIG,
            payload: temp
        })
    }
}
export const loadConfig = () => {
    return async(dispatch) => {
        // dispatch({
        //     type: SET_CONFIG,
        //     payload: {
        //         socketURL: socketURL,
        //         // socketURL: `${data.data.host}:8080`,
        //         // baseURL: `${data.data.host}:8000/api/v1`,
        //         baseURL: baseURL,
        //     }
        // })
        // await Api.get(getConfigURL).then(({ data }) => {
        //     if (data.status) {
        //         console.log("DATA" , data);

        //     }
        // })

    }
}