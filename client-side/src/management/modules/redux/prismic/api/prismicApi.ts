import axios, { AxiosResponse } from 'axios';
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";

export interface IPrismic {
    findPrismicData(): Promise<AxiosResponse<any>>;
}

export class PrismicApi implements IPrismic {

    async findPrismicData(): Promise<AxiosResponse<any>> {
        const eee =  await axios.post('http://localhost:4000/api/findPrismicData').then((res) => res.data);
        console.log(eee);
        return eee ;
    }

     findPrismicDatax() {
        return async (dispatch:any) => {
            dispatch(await axios.post('http://localhost:4000/api/findPrismicData'));

        }
    }

}

export const apiDeleteExpense = (dispatch:Dispatch) => {
    return axios.delete(`/api/v1/expense/`);
};

