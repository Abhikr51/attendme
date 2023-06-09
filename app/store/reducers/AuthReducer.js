import { SET_LOGIN, SET_LOGOUT, SET_PANEL, UPDATE_USER } from "../actions/AuthActions";

const initState = {
  loggedIn: false,
  user: {},
  token : "",
}

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        token : action.token,
      }
    case SET_PANEL:
      return {
        ...state,
      }
    case UPDATE_USER:
      return {
        ...state,
        user : {...state.user,...action.payload}
      }
    case SET_LOGOUT:
      return initState

    default:
      return state
  }
}

export default AuthReducer;