import {Dispatch} from "redux";
import {GET_DATA, PrismicDispatchTypes} from "../../prismic/prismicTypes";
import axios, {AxiosResponse} from "axios";

export interface IGlobalConf {
    findGlobalConfData(): Promise<AxiosResponse<any>>;
}

export class GlobalConf implements IGlobalConf {

    async findGlobalConfData(): Promise<AxiosResponse<any>> {
        return  await axios.post('http://localhost:4000/api/findGlobalConf');
        }

}