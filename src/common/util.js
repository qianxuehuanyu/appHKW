const navigator = weex.requireModule('navigator')
const modal = weex.requireModule('modal')
const event = weex.requireModule('event')

export function isiOS () {
  console.log(getPlatform() == 'iOS');
  return getPlatform() == 'iOS';
}

export function isWeb () {
  console.log(getPlatform() == 'Web');
  return getPlatform() == 'Web';
}

//{"env":{"platform":"android","osVersion":"4.4.4","appVersion":"1.0","weexVersion":"0.9.5","deviceModel":"HUAWEI ALE-CL00","appName":"com.kunion.weex","deviceWidth":"720","deviceHeight":"1184","scale":"2.0"}}
//{"bundleUrl":"http://localhost:8080/weex.html?page=./dist/web/entry.js","platform":"Web","weexVersion":"0.10.0","userAgent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36","appName":"Netscape","appVersion":null,"osName":"Chrome","osVersion":"56.0.2924.87","deviceModel":"unknown","deviceWidth":750,"deviceHeight":1245}

export function getPlatform() {
  if(weex.config.env) {
    return weex.config.env.platform;
  }
  return weex.config.platform;
}

export function getScreenWidth() {
  return weex.config.deviceWidth;
}

export function getScreenHeight() {
  return weex.config.deviceHeight;
}

export function getUrlParam(url, key) {
  const reg = new RegExp('[?|&]' + key + '=([^&]+)');
  const match = url.match(reg);
  return match && match[1];
}

export function getBaseUrl() {
  const bundleUrl = weex.config.bundleUrl
  let host = '';
  let path = '';
  let nativeBase;
  const isAndroidAssets = bundleUrl.indexOf('your_current_IP') >= 0 || bundleUrl.indexOf('file://assets/') >= 0;
  const isiOSAssets = bundleUrl.indexOf('file://') >= 0 && bundleUrl.indexOf('WeexDemo.app') > 0;
  if (isAndroidAssets) {
    nativeBase = 'file://assets/dist/';
  } else if (isiOSAssets) {
    // file:///var/mobile/Containers/Bundle/Application/{id}/WeexDemo.app/
    // file:///Users/{user}/Library/Developer/CoreSimulator/Devices/{id}/data/Containers/Bundle/Application/{id}/WeexDemo.app/
    nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
  } else {
    nativeBase = '/dist/'
  }
  console.log('native: '+ nativeBase)

  return nativeBase;
}

export function formUrlParam (params) {
  let arr = []
  for (let key in params) {
    if (key) arr.push(key + '=' + params[key])
  }
  let str = arr.join('&') 
  return str
}

export function jump (url, params) {
  if (url === '') return false

  const bundleUrl = weex.config.bundleUrl
  console.log(bundleUrl)
  const baseUrl = getBaseUrl()
  let base = ''
  let query = ''
  let newUrl

  if (params) {
    query = formUrlParam(params)
  }

  if (bundleUrl.indexOf('file://') >= 0) {
    base = baseUrl
    if (params) url = url + '?' + query
  } else {
    base = './index.html?page=/dist/'
    if (params) url = url + '&' + query
  }
  newUrl = base + url
  // modal.toast({'message': newUrl, 'duration': 1})
  navigator.push({
    url: newUrl
  })
  // event.openURL(newUrl)
}


/* 日期格式化 */
export function formatDate (time, fmt) {
  let date = new Date(time)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

/* 计算过去的时间 */
export function passtime (time) {
  let delta = (new Date().getTime() - new Date(time)) / 60000 << 0
  if (delta > 60*24*365) return Math.floor(delta / 525600) + '年前'
  if (delta > 60*24*30) return Math.floor(delta / 43200) + '月前'
  if (delta > 60*24) return Math.floor(delta / 1440) + '天前'
  if (delta > 60) return Math.floor(delta / 60) + '小时前'
  return delta + '分钟前'
}