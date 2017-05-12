/*
 *   fetch(options, callback[,progressCallback])
 *   
 *   options {Object}：请求的一些选项
 *     method {string}：HTTP 方法 GET 或是 POST
 *     url {string}：请求的 URL
 *     headers {Object}：HTTP 请求头
 *     type {string}：响应类型, json,text 或是 jsonp {在原生实现中其实与 json 相同)
 *     body {string}：HTTP 请求体。
 *   注意：                                                                                             
 *     body 参数仅支持 string 类型的参数，请勿直接传递 JSON，必须先将其转为字符串。
 *     GET 请求不支持 body 方式传递参数，请使用 url 传参。
 *       
 *   callback {Function}：响应结果回调，回调函数将收到如下的 response 对象：
 *     status {number}：返回的状态码
 *     ok {boolean}：如果状态码在 200~299 之间就为真。
 *     statusText {string}：状态描述文本
 *     data {Object | string}: 返回的数据，如果请求类型是 json 和 jsonp，则它就是一个 object ，如果不是，则它就是一个 string。
 *     headers {Object}：响应头
 *       
 *   progressCallback {Function}：关于请求状态的回调。 这个回调函数将在请求完成后就被调用:
 *     readyState {number}：当前状态
 *     state:’1’: 请求连接中
 *     opened:’2’: 返回响应头中
 *     received:’3’: 正在加载返回数据
 *     status {number}：响应状态码.
 *     length {number}：已经接受到的数据长度. 你可以从响应头中获取总长度
 *     statusText {string}：状态文本
 *     headers {Object}：响应头         
 *   注意:
 *     默认 Content-Type 是 ‘application/x-www-form-urlencoded’。
 *     如果你需要通过 POST json ， 你需要将 Content-Type 设为 ‘application/json’。 
 */

const stream = weex.requireModule('stream')
const modal = weex.requireModule('modal')

const baseUrl = 'http://rapapi.org/mockjsdata/18555/api/'

function formUrlParam (option) {
  let arr = []
  for (let key in option) {
    if (key) arr.push(key + '=' + option[key])
  }
  let str = arr.join('&') 
  return str
}

export function getData (url, option) {
  url = option ? baseUrl + url + '?' + formUrlParam(option) : baseUrl + url
  return new Promise((resolve, reject) => {
    stream.fetch(
      {
        method: 'GET',
        url: url
      },
      function (res) {
        if (!res.ok) {
          modal.toast({'message': '网络错误', 'duration': 1})
        } else {
          let data = JSON.parse(res.data)
          if (data.code === 200) {
            resolve(data)
          } else {
            modal.toast({'message': data.msg, 'duration': 1})
            reject(data)
          }
        }
      }
    )
  })
}

export function postData (url, option) {
  url = baseurl + url
  return new Promise((resolve, reject) => {
    stream.fetch(
      {
        method: 'POST',
        url: url,
        headers: {
          'Content-Type':'application/json'
        },
        type: 'json',
        body: option ? formUrlParam(option) : ''
      },
      function (res) {
        if (!res.ok) {
          modal.toast({'message': '网络错误', 'duration': 1})
        } else {
          let data = JSON.parse(res.data)
          if (data.code === 200) {
            resolve(data)
          } else {
            modal.toast({'message': data.msg, 'duration': 1})
            reject(data)
          }
        }
      }
    )
  })
}
