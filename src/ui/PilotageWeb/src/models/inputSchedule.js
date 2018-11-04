export default {

    namespace: 'inputSchedule',
  
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