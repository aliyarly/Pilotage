
import { routerRedux } from 'dva/router';
import { getPlanList, getPlanDetail, 
  getPilotRight,getPilotStatus } from '../services/inputPilotRank.js';
import {_isNotNull} from '../utils/utils';

export default {

    namespace: 'inputPilotRank',
  
    state: {
      inputPlanLeftData:null,
      currentPilotId: null,
      inputPilotDetail: null,
      pilotStatus: null
    },
  
    subscriptions: {
    },
  
    effects: {
        *queryLeftData({payload}, {call, put}){
            const { data, err } = yield call(getPlanList);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  inputPlanLeftData: _isNotNull(data) ? data.results : null,
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
          *queryRightData({payload}, {call, put}){
            const { data, err } = yield call(getPilotRight);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  inputPilotDetail: _isNotNull(data) ? data.results : null,
                  },
              }); 
              return {data}
            }  
          },
          *queryPilotStatus({payload}, {call, put}){
            const { data, err } = yield call( getPilotStatus);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  pilotStatus: _isNotNull(data) ? data.results : null,
                  },
              }); 
              return {data}
            }  
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