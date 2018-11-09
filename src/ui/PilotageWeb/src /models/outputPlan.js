import { routerRedux } from 'dva/router';
import { getDemoData } from '../services/demo.js';
import {_isNotNull} from '../utils/utils';

export default {

    namespace: 'outputPlan',
  
    state: {
      outputPlanData: null,
      currentPlanId: null
    },
  
    subscriptions: {
    },
  
    effects: {
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