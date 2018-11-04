import request from '../utils/request';
import { API_URL } from '../utils/constSet';
import {objectToQuery} from '../utils/utils';


export function getPreChoiceBoat(queryParam=''){
    return request(`${API_URL}input/boat/prechoice/${queryParam}`, {
        method: 'get',
    });
}

export function getDateBoat(queryParam=''){
    return request(`${API_URL}input/boat/date/${queryParam}`, {
        method: 'get',
    });
}