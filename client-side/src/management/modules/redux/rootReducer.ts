import {combineReducers} from "redux";
import prismicReducer from "./prismic/prismicReducers";
import globalConfReducer from "./globalConfig/globalConfigReducers";

const RootReducer = combineReducers({
    prismic: prismicReducer,
    globalConfig : globalConfReducer
});

export default RootReducer