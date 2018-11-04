import 'babel-polyfill';
import 'ant-design-pro/dist/ant-design-pro.css';
import dva from 'dva';
import createLoading from 'dva-loading';
import './index.less';
import './common/local';


// 1. Initialize
const app = dva();
// 2. Plugins
app.use(createLoading());
// 3. Model
app.model(require('./models/global').default);
app.model(require('./models/inputBoat').default);
app.model(require('./models/inputPlan').default);
app.model(require('./models/inputPilotRank').default);
app.model(require('./models/inputSchedule').default);
// add models here

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
