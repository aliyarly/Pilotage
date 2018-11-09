import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { getRouterData } from 'common/router';
import PropTypes from 'prop-types';
import BasicLayout from './layouts/BasicLayout';
// import BlankLayout from './layouts/BlankLayout';


function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  console.log(routerData, 'router', history)
  window.routerHistory = history;
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/base" render={props => <BlankLayout {...props} routerData={routerData} />} /> */}
        <Route path="/" render={props => <BasicLayout {...props} routerData={routerData} />} />
      </Switch>
    </Router>
  );
}
RouterConfig.propTypes = {
  history: PropTypes.object.isRequired,
};
export default RouterConfig;
