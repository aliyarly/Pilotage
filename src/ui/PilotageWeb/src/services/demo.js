import request from '../utils/request';
import { API_URL } from '../utils/constSet';
import {objectToQuery} from '../utils/utils';


export function getDemoData(queryParam=''){
    return request(`${API_URL}input/${queryParam}`, {
        method: 'get',
    });
}

export function updateServiceImage(service_uuid=null, image_tag=null, auto_flag='1'){
    return request(`${API_URL}alauda/region_service/${service_uuid}/`,{
        method: 'put',
        body: {
            image_tag: image_tag,
            auto_flag: auto_flag
        },
        needSerialize: true
    })
}


export function createGroup(payload){
    return request(`${API_URL}app/group/`, {
        method: 'post',
        body: payload,
        needSerialize: true
    }).then(({data, err}) => {
        if (!err) {
          return data;
        }
        return Promise.reject(err);
      });
}
  
export function deleteService(id) {
    return request(`${API_URL}app/service/${id}/`, {
        method: 'delete',
    });
}
  