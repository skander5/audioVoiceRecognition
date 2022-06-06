import {GET_DATA} from "./prismicTypes"
import {initialState, prismicState} from "./state";


const prismicReducer = (state : prismicState= initialState, action:any) : prismicState => {
    switch (action.type) {
        case GET_DATA : return {
            ...state,
            prismicData: action.payload
        }
        default : return state ;
    }
}

export default prismicReducer ;