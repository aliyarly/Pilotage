
import { routerRedux } from 'dva/router';
import { getPlanList, getPlanDetail, 
  getPilotRight,getPilotStatus,
  getPilotUpDeatil, getPilotDownDeatil } from '../services/inputPilotRank.js';
import {_isNotNull} from '../utils/utils';

export default {

    namespace: 'inputPilotRank',
  
    state: {
      //左边列表数据
      inputPlanLeftData:null,
      //右边选中引水的id
      currentPlanId: null,
      //右边选中详情的id
      currentPilotId: null,
      //右边列表数据
      inputPilotList: null,
      pilotStatus: null,
      //右边详情数据
      inputPilotUpDetail: null,
      inputPilotDownDetail: null,
      //获取的自动派人的数据
      autoData: null
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
                currentPlanId: payload.planId,
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
                  inputPilotList: _isNotNull(data) ? data.results : null,
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
          *queryPilotUpDeatil({payload}, {call, put}){
            const { data, err } = yield call(getPilotUpDeatil, payload.id);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  inputPilotUpDetail: _isNotNull(data) ? data.results : null,
                  },
              }); 
              return {data}
            }  
          },
          *queryPilotDownDeatil({payload}, {call, put}){
            const { data, err } = yield call(getPilotDownDeatil, payload.id);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  inputPilotDownDetail: _isNotNull(data) ? data.results : null,
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