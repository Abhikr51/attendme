
import Api from "./Api";


const splashEvents = async (dispatch, loginToken, user,type='user') => {
  Api.defaults["token"] = loginToken
  // await dispatch(loadLocation())
  //Splash Events

}


export default splashEvents;