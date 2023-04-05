export const SET_CONFIG = "SET_CONFIG"
// import { devURL, getConfigURL } from './../Utils/AppData';
export const LOAD_CONFIG = "LOAD_CONFIG"


export const setConfig = (key , data)=>{
    return (dispatch)=>{
        var temp = {
            [key] : data
        }
        dispatch({
            type : SET_CONFIG,
            payload : temp
        })
    }
}
export const loadConfig = ()=>{
    return (dispatch)=>{
        // axios.get(devURL+getConfigURL).then(({data})=>{
            
        //     dispatch({
        //     type : SET_CONFIG,
        //     payload : data.data
        // })
        // })
        
    }
}