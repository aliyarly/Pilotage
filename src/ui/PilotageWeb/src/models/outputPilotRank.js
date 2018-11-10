import { routerRedux } from 'dva/router';
import { getDemoData } from '../services/demo.js';
import {_isNotNull} from '../utils/utils';

export default {

    namespace: 'outputPilotRank',
  
    state: {
      outputPilotRankData: null,
      currentPilotRankId: null
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