import {GET_DATA} from "./prismicTypes"
import {PrismicApi} from "./api/prismicApi";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";

const prismicApi = new PrismicApi();

export const findPrismic = () =>  {
     return {
        type: GET_DATA,
        payload : prismicApi.findPrismicData()
    }
}
