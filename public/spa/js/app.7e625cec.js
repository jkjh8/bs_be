(()=>{"use strict";var e={7995:(e,t,n)=>{var o=n(1957),r=n(1947),a=n(499),i=n(9835);function s(e,t,n,o,r,a){const s=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(s)}const l=(0,i.aZ)({name:"App"});var c=n(1639);const d=(0,c.Z)(l,[["render",s]]),u=d;var p=n(3340),h=n(3746);const f=(0,p.h)((()=>{const e=(0,h.WB)();return e}));var m=n(8339);const v=[{path:"/",component:()=>Promise.all([n.e(736),n.e(64),n.e(200)]).then(n.bind(n,5969)),children:[{path:"",component:()=>Promise.all([n.e(736),n.e(694)]).then(n.bind(n,3694))}]},{path:"/auth",component:()=>Promise.all([n.e(736),n.e(64),n.e(777)]).then(n.bind(n,6308)),children:[{path:"",component:()=>Promise.all([n.e(736),n.e(64),n.e(351)]).then(n.bind(n,7351))},{path:"signup",component:()=>Promise.all([n.e(736),n.e(64),n.e(468)]).then(n.bind(n,5468))}]},{path:"/broadcast",component:()=>Promise.all([n.e(736),n.e(64),n.e(200)]).then(n.bind(n,5969)),children:[{path:"zonesetup",component:()=>Promise.all([n.e(736),n.e(507)]).then(n.bind(n,507))},{path:"files",component:()=>Promise.all([n.e(736),n.e(393)]).then(n.bind(n,1393))},{path:"eventlog",component:()=>Promise.all([n.e(736),n.e(64),n.e(20)]).then(n.bind(n,20))}]},{path:"/admin",component:()=>Promise.all([n.e(736),n.e(64),n.e(200)]).then(n.bind(n,5969)),children:[{path:"users",component:()=>Promise.all([n.e(736),n.e(64),n.e(790)]).then(n.bind(n,6790))},{path:"devices",component:()=>Promise.all([n.e(736),n.e(64),n.e(772)]).then(n.bind(n,7678))},{path:"logs",component:()=>Promise.all([n.e(736),n.e(64),n.e(508)]).then(n.bind(n,1508))}]},{path:"/devices",component:()=>Promise.all([n.e(736),n.e(64),n.e(200)]).then(n.bind(n,5969)),children:[{path:"",component:()=>Promise.all([n.e(736),n.e(64),n.e(795)]).then(n.bind(n,1315))},{path:"qsys",component:()=>Promise.all([n.e(736),n.e(64),n.e(262)]).then(n.bind(n,7081))},{path:"barix",component:()=>Promise.all([n.e(736),n.e(64),n.e(199)]).then(n.bind(n,2799))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([n.e(736),n.e(782)]).then(n.bind(n,3782))}],b=v;var g=n(1569),y=n(6144);function w(e){const{updateUser:t}=(0,y.L)();e.beforeEach((async(e,n,o)=>{switch(e.path){case"/auth":case"/auth/signup":o();break;default:try{const e=await g.api.get("/auth");e.data?t(e.data):t(null)}catch(r){console.error("Router Check User Error: ",r),t(null)}o();break}}))}const P=(0,p.BC)((function(){const e=m.r5,t=(0,m.p7)({scrollBehavior:()=>({left:0,top:0}),routes:b,history:e("")});return w(t),t}));async function k(e,t){const n=e(u);n.use(r.Z,t);const o="function"===typeof f?await f({}):f;n.use(o);const i=(0,a.Xl)("function"===typeof P?await P({store:o}):P);return o.use((({store:e})=>{e.router=i})),{app:n,store:o,router:i}}var C=n(3703),O=n(6827),S=n(2121),j=n(6950);const Z={config:{},plugins:{LocalStorage:C.Z,Notify:O.Z,Dialog:S.Z,Loading:j.Z}},x="";async function E({app:e,router:t,store:n},o){let r=!1;const a=e=>{try{return t.resolve(e).href}catch(n){}return Object(e)===e?null:e},i=e=>{if(r=!0,"string"===typeof e&&/^https?:\/\//.test(e))return void(window.location.href=e);const t=a(e);null!==t&&(window.location.href=t,window.location.reload())},s=window.location.href.replace(window.location.origin,"");for(let c=0;!1===r&&c<o.length;c++)try{await o[c]({app:e,router:t,store:n,ssrContext:null,redirect:i,urlPath:s,publicPath:x})}catch(l){return l&&l.url?void i(l.url):void console.error("[Quasar] boot error:",l)}!0!==r&&(e.use(t),e.mount("#q-app"))}k(o.ri,Z).then((e=>{const[t,o]=void 0!==Promise.allSettled?["allSettled",e=>e.map((e=>{if("rejected"!==e.status)return e.value.default;console.error("[Quasar] boot error:",e.reason)}))]:["all",e=>e.map((e=>e.default))];return Promise[t]([Promise.resolve().then(n.bind(n,1569)),Promise.resolve().then(n.bind(n,8269))]).then((t=>{const n=o(t).filter((e=>"function"===typeof e));E(e,n)}))}))},1569:(e,t,n)=>{n.r(t),n.d(t,{api:()=>a,apiUrl:()=>i,default:()=>l,mediaUrl:()=>s});var o=n(3340),r=n(7524);let a,i,s;const l=(0,o.xr)((({app:e})=>{i="/api",a=r.Z.create({baseURL:i,withCredentials:!0}),s="/media",e.config.globalProperties.$axios=r.Z,e.config.globalProperties.$api=a}))},8269:(e,t,n)=>{n.r(t),n.d(t,{default:()=>s,socket:()=>i});var o=n(3340),r=n(4209),a=n(1252);let i;const s=(0,o.xr)((({app:e})=>{const t="/";i=(0,r.io)(t,{reconnectionDelayMax:5e3,transports:["websocket"],autoConnect:!0,withCredentials:!0}),i.on("connect",(()=>{console.log(`connected socket.io id=${i.id}`)})),i.on("disconnect",(()=>{console.log(`disconnect to socket.io id=${i.id}`)})),i.on("qsys:data",(e=>{const t=JSON.parse(e);switch(console.log(t),t.key){case"connect":case"devices":(0,a.Z)().updateQsysDevices(t.value);break;case"ZoneStatus":(0,a.Z)().updateQsysDevice(t.deviceId,t.ZoneStatus);break}})),e.config.globalProperties.$socket=i}))},1252:(e,t,n)=>{n.d(t,{Z:()=>i});var o=n(3746),r=n(499),a=n(1569);const i=(0,o.Q_)("qsys",(()=>{const e=(0,r.iH)([]);async function t(){const t=await a.api.get("/devices/qsys");e.value=t.data.devices}function n(t){e.value=t}function o(t,n){const o=e.value.findIndex((e=>e.deviceId===t));e.value[o].ZoneStatus=n,console.log("updated device")}return{qsysDevices:e,getQsysDevices:t,updateQsysDevices:n,updateQsysDevice:o}}))},6144:(e,t,n)=>{n.d(t,{L:()=>a});var o=n(499),r=n(3746);const a=(0,r.Q_)("user",(()=>{const e=(0,o.iH)(null);function t(t){e.value=t}function n(){if(e.value){const t=e.value.name.charAt(0);return t.toUpperCase()}return null}return{user:e,updateUser:t,getUserNickname:n}}))}},t={};function n(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={id:o,loaded:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}n.m=e,(()=>{var e=[];n.O=(t,o,r,a)=>{if(!o){var i=1/0;for(d=0;d<e.length;d++){for(var[o,r,a]=e[d],s=!0,l=0;l<o.length;l++)(!1&a||i>=a)&&Object.keys(n.O).every((e=>n.O[e](o[l])))?o.splice(l--,1):(s=!1,a<i&&(i=a));if(s){e.splice(d--,1);var c=r();void 0!==c&&(t=c)}}return t}a=a||0;for(var d=e.length;d>0&&e[d-1][2]>a;d--)e[d]=e[d-1];e[d]=[o,r,a]}})(),(()=>{n.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return n.d(t,{a:t}),t}})(),(()=>{n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})}})(),(()=>{n.f={},n.e=e=>Promise.all(Object.keys(n.f).reduce(((t,o)=>(n.f[o](e,t),t)),[]))})(),(()=>{n.u=e=>"js/"+(64===e?"chunk-common":e)+"."+{20:"42e14069",64:"b48e012c",199:"d06c980d",200:"6db83ca8",262:"449378b5",351:"56cd3b53",393:"e38b2ac9",468:"ff86d2fa",507:"17d7eb79",508:"a7485f86",694:"3bc67e9c",772:"d5789800",777:"c9c754fd",782:"2f2ea208",790:"f84fa19d",795:"46f75d3f"}[e]+".js"})(),(()=>{n.miniCssF=e=>"css/"+e+"."+{199:"ddb2c5bf",200:"d0a60ea5",262:"ddb2c5bf",351:"c512b0b9",393:"fe37ad83",468:"7912e000",507:"630d2c99",772:"3fae18c1",777:"af972d5d",790:"7c8758c2",795:"ddb2c5bf"}[e]+".css"})(),(()=>{n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="bs-fe:";n.l=(o,r,a,i)=>{if(e[o])e[o].push(r);else{var s,l;if(void 0!==a)for(var c=document.getElementsByTagName("script"),d=0;d<c.length;d++){var u=c[d];if(u.getAttribute("src")==o||u.getAttribute("data-webpack")==t+a){s=u;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,n.nc&&s.setAttribute("nonce",n.nc),s.setAttribute("data-webpack",t+a),s.src=o),e[o]=[r];var p=(t,n)=>{s.onerror=s.onload=null,clearTimeout(h);var r=e[o];if(delete e[o],s.parentNode&&s.parentNode.removeChild(s),r&&r.forEach((e=>e(n))),t)return t(n)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=p.bind(null,s.onerror),s.onload=p.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),(()=>{n.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e)})(),(()=>{n.p=""})(),(()=>{if("undefined"!==typeof document){var e=(e,t,n,o,r)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var i=n=>{if(a.onerror=a.onload=null,"load"===n.type)o();else{var i=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=s,a.parentNode.removeChild(a),r(l)}};return a.onerror=a.onload=i,a.href=t,n?n.parentNode.insertBefore(a,n.nextSibling):document.head.appendChild(a),a},t=(e,t)=>{for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var r=n[o],a=r.getAttribute("data-href")||r.getAttribute("href");if("stylesheet"===r.rel&&(a===e||a===t))return r}var i=document.getElementsByTagName("style");for(o=0;o<i.length;o++){r=i[o],a=r.getAttribute("data-href");if(a===e||a===t)return r}},o=o=>new Promise(((r,a)=>{var i=n.miniCssF(o),s=n.p+i;if(t(i,s))return r();e(o,s,null,r,a)})),r={143:0};n.f.miniCss=(e,t)=>{var n={199:1,200:1,262:1,351:1,393:1,468:1,507:1,772:1,777:1,790:1,795:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=o(e).then((()=>{r[e]=0}),(t=>{throw delete r[e],t})))}}})(),(()=>{var e={143:0};n.f.j=(t,o)=>{var r=n.o(e,t)?e[t]:void 0;if(0!==r)if(r)o.push(r[2]);else{var a=new Promise(((n,o)=>r=e[t]=[n,o]));o.push(r[2]=a);var i=n.p+n.u(t),s=new Error,l=o=>{if(n.o(e,t)&&(r=e[t],0!==r&&(e[t]=void 0),r)){var a=o&&("load"===o.type?"missing":o.type),i=o&&o.target&&o.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,r[1](s)}};n.l(i,l,"chunk-"+t,t)}},n.O.j=t=>0===e[t];var t=(t,o)=>{var r,a,[i,s,l]=o,c=0;if(i.some((t=>0!==e[t]))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(l)var d=l(n)}for(t&&t(o);c<i.length;c++)a=i[c],n.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return n.O(d)},o=globalThis["webpackChunkbs_fe"]=globalThis["webpackChunkbs_fe"]||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var o=n.O(void 0,[736],(()=>n(7995)));o=n.O(o)})();