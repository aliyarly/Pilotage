import fetch from 'dva/fetch';


function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    console.log("server response respnse error")
  }
  return Promise.reject(response);
}

export default function request(url, options) {
    // 默认 cors = true，即需要进行跨域处理,进行请求数据的序列化
    options = { cors: true, needSerialize: true, ...options };
    options.headers = { 
      'Content-Type': 'application/json',
      'Accept-Language': 'zh-cn', 
      'Accept': 'application/json', 
      ...options.headers 
    };
    if (options.cors) {
      options.credentials = 'include'
    }

    // 上传文件接口，需要去掉 header 的 content-type 属性
    if (options.upFiles) {
      delete options.headers['Content-Type'];
    } 
    if (['POST','PUT','DELETE'].includes(options.method.toUpperCase())) {
      if(options.needSerialize){
        options.body = JSON.stringify(options.body);
      } 
    }
    // get请求,将params拼接到url中
    if (options.params) { 
      const paramsArray = [];
      Object.keys(options.params).forEach(key => paramsArray.push(`${key}=${options.params[key]}`));
      if (url.search(/\?/) === -1) {
        url += `?${paramsArray.join('&')}`;
      } else {
        url += `&${paramsArray.join('&')}`;
      }
    }
    console.log(options, "request options")
    return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then(data => ({ data }))
      .catch(err => {
        if (err.toString() === 'TypeError: Failed to fetch') {
          window.routerHistory && window.routerHistory.replace('/networkError');
        }
        return { err }
      });
}
