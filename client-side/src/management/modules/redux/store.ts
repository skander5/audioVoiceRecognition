import {createStore} from 'redux' ;
import prismicReducer from './prismic/prismicReducers';

const store = createStore(prismicReducer);

export default store;