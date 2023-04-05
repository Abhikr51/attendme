import { baseURL, categoriesURL } from "../../configs/AppData"
import Api from "../../helpers/Api"
import { showToast } from "../../helpers/__globals_funcs"

export const SET_CAT = "SET_CAT"
export const CLEAR_CAT = "CLEAR_CAT"

export const setCategories = () => {
  return async(despatch) => {
    await Api.get(baseURL + categoriesURL).then((res) => {
      if (res.data.status) {
        despatch({
          type: SET_CAT,
          payload: res.data.data
        })
      }else{
        console.error("category err", res.data.message)
      }
    }).catch(err => {
      console.error("category Err", err);
    })

  }
}
export const clearCategories = () => {
  return (despatch) => {
    despatch({
      type: CLEAR_CAT
    })
  }
}



