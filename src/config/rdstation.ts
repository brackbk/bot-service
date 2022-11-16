import Exception from '@modules/rdstation/exception/Exception';
import axios from 'axios'
const BASE_URL = 'https://api.rd.services'


const showException = async (response: any) => {
    const data: any = response.data;
    // let exception = new Exception(data.errors || {});
    // if (response.status >= 400) {
    //     switch (response.status) {
    //         case Exception.BAD_REQUEST:
    //             exception.setErrors(Exception.BAD_REQUEST);
    //         break;
    //         case Exception.NOT_FOUND:
    //             exception.setErrors(Exception.NOT_FOUND);
    //         break;
    //         case Exception.UNAUTHORIZED:
    //             exception.setErrors(Exception.UNAUTHORIZED);
    //         break;
    //         case Exception.UNPROCESSABLE_ENTITY:
    //             exception.setErrors(Exception.UNPROCESSABLE_ENTITY);
    //         break;
    //         case Exception.UNSUPPORTED_MEDIA_TYPE:
    //             exception.setErrors(Exception.UNSUPPORTED_MEDIA_TYPE);
    //         break;
    //     }
    //     throw exception;
    // }

    return response
}


const post = async (endpoint: any, body: any, config: any) => {
    const response = await axios.post(`${BASE_URL}${endpoint}`, body, config)
    return await showException(response);
}
const put = async (endpoint: any, body: any, config: any) => { 
    const response = axios.put(`${BASE_URL}${endpoint}`, body, config)
    return await showException(response);
}
const patch = async (endpoint: any, body: any, config: any) => {
    
    const response = await axios.patch(`${BASE_URL}${endpoint}`, body, config)
    return await showException(response);
}
const get = async (endpoint: any, config: any) => {
   //config = { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5yZC5zZXJ2aWNlcyIsInN1YiI6InZPREdhdTRsMmR0c2xTeUFFcTZGUDFacjZJbmUtenRhVlRid2RBRkRwN01AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBwLnJkc3RhdGlvbi5jb20uYnIvYXBpL3YyLyIsImFwcF9uYW1lIjoidGFibGV0YWxrcyIsImV4cCI6MTY0NTkwODUwMywiaWF0IjoxNjQ1ODIyMTAzLCJzY29wZSI6IiJ9.AWDLhcI-1TnfbeqHICSRMJijHHTYtw_V5MbzPC5gs3i-YQUi7KhZHpCKhYTHH4-g1bKm50aMY9NDl211deg_7Xliib8RaLjDhCtLMd9CGV-ZcqGWo6zkEcIZW-snZoHFDEEFEPQ1mxr6hj6rMoVqb7aCUkCbIcx5-eOpa-e7isVqAdW_vAgA7ysFmikU2GhzejcOJaSRbbl3Gskg-fSVvmJHN6_v96eDivhK-O9OviNqpDfuQquiq1ovWBjuECxJ-CtsvkuDZtnI8sM-WVPCLtaR4sn-ZOklCshiQMhHucCm2DBR1WrijV4Al7FdR5RkVRVsGDLSgX9TpDaaLlAkzA` } }

    const response = await axios.get(`${BASE_URL}${endpoint}`, config)
    return await showException(response);
}

export default {
    post,
    get,
    put,
    patch,
    
}