
const API_URL_PRO = ``;
const API_URL_DEV = `http://127.0.0.1:8002/`; // 本地ip
const env = process.env.ENV || 'dev';
let API_URL = API_URL_DEV;


if (env === 'dev') {
  API_URL = API_URL_DEV;   // 本地调试服务器地址
}

if (env === 'prod') { 
  API_URL = API_URL_PRO;  // 线上服务器地址
}

export {API_URL};
