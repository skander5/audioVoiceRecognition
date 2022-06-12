import {GET_GLOBAL_CONF_DATA} from "./globalConfigTypes";
import {globalConfDataState, initialState} from "./state";


const globalConfReducer = (state : globalConfDataState= initialState, action:any) : globalConfDataState => {
    switch (action.type) {
        case GET_GLOBAL_CONF_DATA : return {
            ...state,
            globalConfData: action.payload.data
        }
        default : return state ;
    }
}

export default globalConfReducer ;