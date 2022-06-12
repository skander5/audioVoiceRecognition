import {GET_GLOBAL_CONF_DATA} from "../globalConfig/globalConfigTypes";
import avatar from "../../../../ressources/avatar.png";


export const prismicSelector = (prismicInfo:any,dataConf:any) => {
    // do something with a, b, and c, and return a result
    console.log(prismicInfo);
    const productGroupCode = dataConf?.product_group_code ;
    const productGroupLabel = dataConf?.product_group_label ;
    const logoa = "logo_" + productGroupCode ;
    let url = "" ;
    let color = "" ;
    if(prismicInfo?.data?.results[0]){
    const json = JSON.stringify(prismicInfo?.data?.results[0]);
    const jsonProduct = json.substring(json.search('logo_'+productGroupCode), json.length);
    color = json.substring(json.search('color_'+productGroupCode) + 12, json.search('color_'+productGroupCode) + 19);
    url = jsonProduct.substring(jsonProduct.search('url') + 6, jsonProduct.search('format') + 6) ;
    }
    return {
        logo : url ,
        color : color
    } ;
};

export const fff = () => {
    return "logo_639";
}