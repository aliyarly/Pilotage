
import request from '../utils/request';
import { API_URL } from '../utils/constSet';



export function getPlanList(){
    return request(`${API_URL}input/plan/`, {
        method: 'get',
    })
}

export function getPlanDetail(id){
    return request(`${API_URL}input/plan/${id}/`, {
        method: 'get',
    });
}