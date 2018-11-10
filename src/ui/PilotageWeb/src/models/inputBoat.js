import { getPreChoiceBoat, getDateBoat ,
  getDateGroupValid, getDateGroupUnValid,
  getInputPlan} from '../services/inputBoat.js';
import {_isNotNull} from '../utils/utils';

export default {

    namespace: 'inputBoat',
  
    state: {
      dataBoatPreChoice: null,
      dataBoatDate: null,
      dataBoatGroupValid: null,
      dataBoatGroupUnValid: null,
      dataBoatPlan: null
    },
  
    subscriptions: {

    },
  
    effects: {
        *queryLeftListData({payload}, {call, put}){
          if(payload.queryParam === 'prechoice') {
            //services->inputBoat发起后端请求
            const { data, err } = yield call(getPreChoiceBoat);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  dataBoatPreChoice: _isNotNull(data) ? data.results : null,
                  },
              }); 
              return {data}
            }  
          } else if(payload.queryParam === 'boatDate'){
            const { data, err } = yield call(getDateBoat);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  dataBoatDate: _isNotNull(data) ? data.results : null,
                  },
              }); 
              return {data}
          }} else if (payload.queryParam === 'groupValid'){
            const { data, err } = yield call(getDateGroupValid);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  dataBoatGroupValid: _isNotNull(data) ? data.results : null,
                  },
              }); 
              return {data}
          }} else if(payload.queryParam === 'groupUnvalid'){
            const { data, err } = yield call(getDateGroupUnValid);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  dataBoatGroupUnValid: _isNotNull(data) ? data.results : null,
                  },
              }); 
              return {data}
          }} else{
            console.log('unvalid query param for boat data')
          }
    },
    *queryRightListData({payload}, {call, put}){
      const { data, err } = yield call(getInputPlan);
            if (!err) {
              yield put({
                type: 'resetInfo',
                payload: {
                  dataBoatPlan: _isNotNull(data) ? data.results : null,
                  },
              }); 
              return {data}
            }  
    }
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
  