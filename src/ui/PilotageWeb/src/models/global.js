
export default {

  namespace: 'global',

  state: {
    collapsed: false,
  },

  subscriptions: {
  },

  effects: {
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state, collapsed: payload,
      };
    },
  },

};
