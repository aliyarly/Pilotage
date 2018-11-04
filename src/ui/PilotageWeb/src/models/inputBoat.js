import { getDemoData } from '../services/demo.js';
import {_isNotNull} from '../utils/utils';

export default {

    namespace: 'inputBoat',
  
    state: {
      data: null,
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
                    data: _isNotNull(data) ? data.results : null,
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
  