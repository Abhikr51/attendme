// const base = "http://13.231.246.144:8001"
const base = "http://localhost:8001"
export const hostURL  = base;
export const baseURL = base + "/api/v1"



//Endpoints 

var auth = ""

//user
export const loginURL = '/login'
export const registerURL = '/register'
export const user_updateURL = '/user/update'
export const otpURL = '/2fa'
export const logoutURL = auth +'/logout'
export const getUserURL = auth +'/authuser'
export const categoriesURL = "/guest/category/all"
export const treandingCategoriesURL = '/guest/category/trending'
export const couponTypes = '/coupontype'




//vendor apis
export const merchant_storesURL = "/vendor/store"
export const merchant_store_create = "/vendor/store/create"
export const merchant_storeTypesURL = '/vendor/store/storetype'
export const merchant_create = "/vendor/create"