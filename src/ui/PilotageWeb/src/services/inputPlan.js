
import request from '../utils/request';
import { API_URL } from '../utils/constSet';



export function getPlanList(){
    return request(`${API_URL}input/plan/`, {
        method: 'get',
    })
}

export function getPlanDetail(id){
    return request(`${API_URL}input/plan/detail/${id}/`, {
        method: 'get',
    });
}

export function getYinShuiData(){
    return request(`${API_URL}input/plan/require/`, {
        method: 'get',
    });
}

export function getWaterDeepData(){
    return request(`${API_URL}input/plan/deep/`, {
        method: 'get',
    });
}