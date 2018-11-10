import request from '../utils/request';
import { API_URL } from '../utils/constSet';



export function getPlanList(){
    return request(`${API_URL}input/rank/`, {
        method: 'get',
    })
}

export function getPlanDetail(id){
    return request(`${API_URL}input/rank/${id}/`, {
        method: 'get',
    });
}

export function getPilotRight(id){
    return request(`${API_URL}input/rank/pilot/`, {
        method: 'get',
    });
}

export function getPilotStatus(id){
    return request(`${API_URL}input/rank/pilot/status/`, {
        method: 'get',
    });
}