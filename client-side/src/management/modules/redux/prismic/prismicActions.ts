import {GET_DATA, PrismicDispatchTypes} from "./prismicTypes"
import {findPrismicDatas, PrismicApi} from "./api/prismicApi";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import axios from "axios";

const prismicApi = new PrismicApi();

export const findPrismic = () => async (dispatch: Dispatch) => {
    const pp =  prismicApi.findPrismicData().then((data)=> data.data) ;
    console.log('pp ',pp);
     dispatch ({
        type: GET_DATA,
        payload : pp
    })
}

export const findPrismicDataInfo = () => async (dispatch: Dispatch) => {
    dispatch({
        type: GET_DATA,
        payload :  await prismicApi.findPrismicData()
    });
}


export const findPrismicInfo = () => {

}