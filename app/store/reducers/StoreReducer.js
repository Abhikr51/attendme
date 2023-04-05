import { CLEAR_STORE, SET_STORE,CREATE_STORE } from "../actions/StoreActions"

const init_state = []


const StoreReducer = (state = init_state, actions) => {
  switch (actions.type) {
    case SET_STORE:
      return actions.payload
    case CREATE_STORE:
      // tempStore = state.push(action.payload)
      return [actions.payload, ...state]

    default:
      return state
  }
}


export default StoreReducer;