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

export function getPilotUpDeatil(id){
    return request(`${API_URL}input/rank/pilot/detail/up/${id}/`, {
        method: 'get',
    });
}

export function getPilotDownDeatil(id){
    return request(`${API_URL}input/rank/pilot/detail/down/${id}/`, {
        method: 'get',
    });
}

export function getAutoPilotInfo(autoIds){
    // 请求获取自动派人，并存储结果数据
    return request(`${API_URL}input/rank/pilot/auto/`, {
        method: 'post',
        body: autoIds,
        needSerialize: true
    }).then(({data, err}) => {
        if (!err) {
          return {data};
        }
        return Promise.reject(err);
      });
}