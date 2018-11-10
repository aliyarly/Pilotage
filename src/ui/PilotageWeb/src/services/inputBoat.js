import request from '../utils/request';
import { API_URL } from '../utils/constSet';
import {objectToQuery} from '../utils/utils';

// 预选船
export function getPreChoiceBoat(queryParam=''){
    return request(`${API_URL}input/boat/prechoice/${queryParam}`, {
        method: 'get',
    });
}

//期船
export function getDateBoat(queryParam=''){
    return request(`${API_URL}input/boat/date/${queryParam}`, {
        method: 'get',
    });
}

//集团识别
export function getDateGroupValid(queryParam=''){
    return request(`${API_URL}input/boat/group_valid/${queryParam}`, {
        method: 'get',
    });
}

//集团未识别
export function getDateGroupUnValid(queryParam=''){
    return request(`${API_URL}input/boat/group_unvalid/${queryParam}`, {
        method: 'get',
    });
}

//进口计划
export function getInputPlan(queryParam=''){
    return request(`${API_URL}input/boat/plan/${queryParam}`, {
        method: 'get',
    });
}
