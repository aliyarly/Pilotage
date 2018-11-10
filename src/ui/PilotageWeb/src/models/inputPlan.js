import { routerRedux } from 'dva/router';
import { getPlanList, getPlanDetail ,
  getYinShuiData, getWaterDeepData} from '../services/inputPlan.js';
import {_isNotNull} from '../utils/utils';

export default {

    namespace: 'inputPlan',
  
    state: {
      inputPlanData: null,
      currentPlanId: null,
      detailsPlan: null,
      yinShuiData: null,
      shuishenData: null,

    },
  
    subscriptions: {
    },
  
    effects: {
      *queryListData({payload}, {call, put}){
        const { data, err } = yield call(getPlanList);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  inputPlanData: _isNotNull(data) ? data.results : null,
                  },
              }); 
              return {data}
            }  
      },
      *routePlanDetail({ payload }, { call, put }){
        yield put({
          type: 'resetInfo',
          payload: {
            currentPlanId: payload.planId,
            },
        });    
        yield put(routerRedux.replace(payload.href));

    },
    *getSinglePlan({ payload }, { call, put }) {
      const { data, err } = yield call(getPlanDetail, payload.plan_id);
      if (!err) {
        yield put({
          type: 'resetInfo',
          payload: {
            detailsPlan: _isNotNull(data) ? data.results : null,      
          },
        });
      }
    },
    *getYinShuiData({ payload }, { call, put }) {
      const { data, err } = yield call(getYinShuiData);
      if (!err) {
        yield put({
          type: 'resetInfo',
          payload: {
            yinShuiData: _isNotNull(data) ? data.results : null,   
          },
        });
      }
    },  
    *getWaterDeepData({ payload }, { call, put }) {
      const { data, err } = yield call(getWaterDeepData);
      if (!err) {
        yield put({
          type: 'resetInfo',
          payload: {
            shuishenData: _isNotNull(data) ? data.results : null,   
          },
        });
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