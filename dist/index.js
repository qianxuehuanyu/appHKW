// { "framework": "Vue"} 

!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=18)}({0:function(e,t,n){"use strict";function r(){return console.log("iOS"==i()),"iOS"==i()}function o(){return console.log("Web"==i()),"Web"==i()}function i(){return weex.config.env?weex.config.env.platform:weex.config.platform}function s(){return weex.config.deviceWidth}function a(){return weex.config.deviceHeight}function u(e,t){var n=new RegExp("[?|&]"+t+"=([^&]+)"),r=e.match(n);return r&&r[1]}function c(e,t){var n=e,r="",o="",i=void 0,s=n.indexOf("your_current_IP")>=0||n.indexOf("file://assets/")>=0,a=n.indexOf("file:///")>=0&&n.indexOf("WeexDemo.app")>0;if(s)i="file://assets/dist";else if(a)i=n.substring(0,n.lastIndexOf("/")+1);else{var u=/\/\/([^\/]+?)\//.exec(n),c=/\/\/.+\/([^\/]+?)\//.exec(n);u&&u.length>=2&&(r=u[1]),c&&c.length>=2&&(o=c[1]),i="http://"+r+"/"}return("undefined"==typeof navigator||"Mozilla"!==navigator.appCodeName&&"Gecko"!==navigator.product?i+o+"/":"web"===o||"dist"===o?"./index.html?page=/dist/":"./index.html?page=")+t}Object.defineProperty(t,"__esModule",{value:!0}),t.isiOS=r,t.isWeb=o,t.getPlatform=i,t.getScreenWidth=s,t.getScreenHeight=a,t.getUrlParam=u,t.setBundleUrl=c},12:function(e,t,n){var r,o,i=[];i.push(n(31)),r=n(24);var s=n(38);o=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(Object.keys(r).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o=r=r.default),"function"==typeof o&&(o=o.options),o.__file="D:\\workplace\\appHKW\\src\\index.vue",o.render=s.render,o.staticRenderFns=s.staticRenderFns,o._scopeId="data-v-59e852bf",o.style=o.style||{},i.forEach(function(e){for(var t in e)o.style[t]=e[t]}),"function"==typeof __register_static_styles__&&__register_static_styles__(o._scopeId,i),e.exports=r},18:function(e,t,n){"use strict";var r=n(12);r.el="#root",new Vue(r)},24:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=weex.requireModule("navigator");t.default={data:{username:"",password:""},methods:{login:function(){var e=this.$getConfig().bundleUrl;o.push({url:(0,r.setBundleUrl)(e,"home.js")})}}}},31:function(e,t){e.exports={login:{justifyContent:"center",alignItems:"center"},username:{width:80,borderWidth:1,marginBottom:20},password:{width:80,borderWidth:1,marginBottom:20},btn:{width:200,height:50,textAlign:"center",background:"#abcdef",color:"#ffffff",fontSize:30,marginTop:50}}},38:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:["login"]},[n("input",{staticClass:["username"],attrs:{placeholder:"请输入用户名",type:"text",value:e.username},on:{input:function(t){e.username=t.target.attr.value}}}),n("input",{staticClass:["password"],attrs:{placeholder:"请输入密码",type:"password",value:e.password},on:{input:function(t){e.password=t.target.attr.value}}}),n("button",{staticClass:["btn"],on:{click:e.login}},[e._v("登陆")])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});