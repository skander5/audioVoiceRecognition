import axios, { AxiosResponse } from 'axios';
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {findPrismic} from "../prismicActions";
import {GET_DATA, PrismicDispatchTypes} from "../prismicTypes";

export interface IPrismic {
    findPrismicData(): Promise<AxiosResponse<any>>;
}

export class PrismicApi implements IPrismic {

    async findPrismicData(): Promise<AxiosResponse<any>> {
        const eee =  await axios.post('http://localhost:4000/api/findPrismicData');
        console.log(eee);
        return eee ;
    }

     findPrismicDatax() {
        return async (dispatch:any) => {
            dispatch(await axios.post('http://localhost:4000/api/findPrismicData'));
        }
    }

}


export const findPrismicDatas = () => async (dispatch: Dispatch<PrismicDispatchTypes>) => {
    console.log('aaaaaaa');
    const response =  await axios.post('http://localhost:4000/api/findPrismicData');
    dispatch({
        type: GET_DATA,
    })
    /*return function(dispatch:Dispatch) {
        return axios.post('http://localhost:4000/api/findPrismicData')
            .then(({ data }) => {
                dispatch(findPrismic());
            });
    };*/
}

