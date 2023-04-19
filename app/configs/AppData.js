// const base = "http://13.231.246.144:8001"
const base = "http://192.168.29.237"
// const base = "http://192.168.29.39"
// const base = "http://localhost:8000"
export const hostURL  =  `${base}:8000`;
export const socketURL  = `${base}:8080`;
export const baseURL = hostURL + "/api/v1"



//Endpoints 

var auth = ""

//user
export const loginURL = '/login'
export const registerURL = "/student/create"
export const user_updateURL = '/student/update'
export const logoutURL = auth +'/logout'
export const getUserURL = auth +'/get-user'
export const semester_listURL = '/semester/list'
export const stream_listURL = '/stream/list'

