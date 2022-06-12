import {Dispatch} from "redux";
import {PrismicApi} from "../prismic/api/prismicApi";
import {GlobalConf} from "./api/globalConfApi";
import {GET_GLOBAL_CONF_DATA} from "./globalConfigTypes";


const globalConf = new GlobalConf();


export const findGlobalConfig = () => async (dispatch: Dispatch) => {
    dispatch({
        type: GET_GLOBAL_CONF_DATA,
        payload :  await globalConf.findGlobalConfData()
    });
}