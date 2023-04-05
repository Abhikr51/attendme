import { CLEAR_CAT, SET_CAT } from "../actions/CategoryActions"

const init_state = []


const CategoryReducer =(state=init_state,actions)=>{
    switch (actions.type) {
        case SET_CAT:
          return actions.payload
        case CLEAR_CAT:
          return []
    
        default:
          return state
      }
}


export default CategoryReducer;