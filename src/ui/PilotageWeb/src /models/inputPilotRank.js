
import { routerRedux } from 'dva/router';
import { getDemoData } from '../services/demo.js';
import {_isNotNull} from '../utils/utils';

export default {

    namespace: 'inputPilotRank',
  
    state: {
      inputPilotData: null,
      currentPilotId: null,
      inputPilotDetail: null
    },
  
    subscriptions: {
    },
  
    effects: {
        *queryData({payload}, {call, put}){
            const { data, err } = yield call(getDemoData);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  inputPilotData: _isNotNull(data) ? data.results : null,
                  },
              }); 
              return {data}
            }  
          },
          *routePilotDetail({payload}, {call, put}){
            yield put({
              type: 'resetInfo',
              payload: {
                currentPilotId: payload.pilotId,
                },
            }) 
            yield put(routerRedux.replace(`/input/pilot/detail/${payload.pilotId}/`))
          },
    },
  
    reducers: {
        resetInfo(state, { payload }) {
            return {
              ...state,
              ...payload,
            };
        },
    },
  
  };