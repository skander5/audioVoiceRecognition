import {createStore,applyMiddleware} from 'redux' ;
import prismicReducer from './prismic/prismicReducers';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducer from "./rootReducer";

const store = createStore(RootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store ;
