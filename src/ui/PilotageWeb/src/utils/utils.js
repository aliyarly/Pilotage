import moment from 'moment';

export function getRoutes(path, routerData) {
  const routes = Object.keys(routerData).filter(routePath => routePath.indexOf(path) === 0 && routePath !== path);
  const renderArr = [];
  for (let i = 0; i < routes.length; i += 1) {
    renderArr.push({ ...routerData[routes[i]], path: routes[i] });
  }
  const renderRoutes = renderArr.map(item => ({
    ...item,
    exact: item.exact !== false,
  }));
  return renderRoutes;
}

export function _isNotNull(val) {
  if (val === null || val === undefined) {
    return false;
  }
  if (typeof val === 'string' && (val === '' || val.trim() === '')) {
    return false;
  }
  if (typeof val === 'object' && val.length <= 0) {
    return false;
  }
  if (typeof val === 'object') {
    return Object.keys(val).length !== 0;
  }
  return true;
}

// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}

export function _dateFormat(dataStr, format) {
  // YYYY-MM-DD HH:mm
  format = format || 'YYYY-MM-DD HH:mm:ss';
  if (dataStr) {
    return moment(new Date(dataStr)).format(format);
  }
  return moment().format(format);
}

/**
 * 链式获取对象元素
 * @param  {Object} obj          顶级对象 parentObj
 * @param  {String} objUrl       链式获取的字符串 'parentObj.prop1.prop2.prop3'
 * @param  {any} defaultValue  取不到值时的默认返回，可以是任意类型
 * @return {any}              能到的值 或者 默认值
 */
export function _dataProp(obj, objUrl, defaultValue) {
  if (!obj) {
    return defaultValue;
  }
  const objList = objUrl.toString().split('.');
  objList.shift();
  let prop;
  const unGet = objList.some((item) => {
    prop = prop ? prop[item] : obj[item];
    return prop === undefined;
  });
  return unGet ? defaultValue : prop;
}

/**
 * 下载
 * @param  {String} sUrl 下载地址
 * @return {Boolean}   是否可下载
 */
export function _download(sUrl) {
  if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1 || navigator.userAgent.toLowerCase().indexOf('safari') > -1) {
    const link = document.createElement('a');
    link.href = sUrl;

    if (link.download !== undefined) {
      const fileName = sUrl.substring(sUrl.lastIndexOf('/') + 1, sUrl.length);
      link.download = fileName;
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }

  if (sUrl.indexOf('?') === -1) {
    sUrl += '?download';
  }

  window.open(sUrl, '_self');
  return true;
}

/*
 * 将一个数组分成几个同等长度的数组
 * array[分割的原数组]
 * size[每个子数组的长度]
 */
export function sliceArray(array, size) {
    let result = [];
    for (let x = 0; x < Math.ceil(array.length / size); x++) {
        let start = x * size;
        let end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}

/**
 * [delUndefinedKey 删除JSON中values为undefined的属性]
 * @param  {JSON} obj 需要处理的JSON对象
 * @return {JSON}     处理后的JSON对象
 */
export function delUndefinedKey(obj) {
    let parsedValues = {};
    Object.keys(obj).reduce(function(total, currentKey){
      if( obj[currentKey] !== undefined ) {
        parsedValues[currentKey] = obj[currentKey];
      }
    },parsedValues)
    return parsedValues;
}


export function objectToQuery (values='', queryParam='?') {
  // used to make query param from object
  if(! values){
    return ''
  }
  for (let item in values){
    let value = values[item];
    if(item == 'pageSize'){
      item = 'page_size'
    }
    let queryOneStr = `${item}=${value}&`;
    queryParam += queryOneStr;
  }
  queryParam = queryParam.substring(0, queryParam.length-1);
  return queryParam
}