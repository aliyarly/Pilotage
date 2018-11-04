
export default {

    namespace: 'inputPilotRank',
  
    state: {
      data: null,
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