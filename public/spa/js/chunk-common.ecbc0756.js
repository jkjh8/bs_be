(globalThis["webpackChunkbs_fe"]=globalThis["webpackChunkbs_fe"]||[]).push([[64],{1108:(s,e,t)=>{"use strict";t.d(e,{Z:()=>a});var n=t(499),o=t(3703);function a(){const s=(0,n.qj)({userEmail:"",userPass:""}),e=(0,n.iH)(""),t=()=>{const t=o.Z.getItem("rememberEmail");t?(s.userEmail=t,e.value=!0):e.value=!1},a=()=>{e.value?o.Z.set("rememberEmail",s.userEmail):o.Z.remove("rememberEmail")};return{auth:s,rememberCheck:e,getEmailFromStorage:t,setEmailToStorage:a}}},8957:(s,e,t)=>{"use strict";t.d(e,{Z:()=>o});var n=t(9302);function o(){const s=(0,n.Z)(),e=(e,t,n)=>{s.notify({type:"positive",message:e,caption:t,position:n||"top",actions:[{icon:"close",color:"white",round:!0,dense:!0}]})},t=(e,t,n)=>{s.notify({type:"negative",message:e,caption:t||"",position:n||"top",actions:[{icon:"close",color:"white",round:!0,dense:!0}]})},o=e=>{let t,n;switch(e.status){case 401:t="Unauthorized",n="please login to use this service and try again";break;case 403:t="Forbidden",n="do not have permission to use this service";break;default:t="Internal server error",n="A server error has occurred. Please try again in a few minutes";break}s.notify({type:"negative",message:t,caption:n,position:"top",actions:[{icon:"close",color:"white",round:!0,dense:!0}]})};return{notifyInfo:e,notifyError:t,notifyErrorFeedback:o}}},8382:(s,e,t)=>{"use strict";function n(){const s=s=>!!s||"필수 입력 항목 입니다.",e=s=>s.length>=8||"최소 8자 이상 입력하세요.",t=s=>s>0||"0보다 큰 숫자를 입력하세요.",n=s=>s<=65535||"65535보다 작은 숫자를 입력하세요.",o=s=>/.+@.+\..+/.test(s)||"이메일 형식이 아닙니다.",a=s=>/^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm.test(s)||"IPv4 형식이 아닙니다";return{required:s,minLength:e,minNumber:t,maxNumber:n,ckEmail:o,ckIPv4:a}}t.d(e,{Z:()=>n})},2645:(s,e,t)=>{"use strict";t.d(e,{Z:()=>m});t(9665);var n=t(9835),o=t(6970),a=t(499),r=t(8339);const i={class:"row no-wrap"},l={class:"text-grey-9"},c={__name:"authLink",props:{message:String,linkName:String,link:String},setup(s){const e=s,t=(0,r.tv)();return(s,r)=>((0,n.wg)(),(0,n.iD)("div",i,[(0,n._)("span",l,(0,o.zw)(e.message),1),(0,n._)("div",{class:"alink no-decoration text-purple text-bold cursor-pointer q-ml-sm",onClick:r[0]||(r[0]=s=>(0,a.SU)(t).push(e.link))},(0,o.zw)(e.linkName),1)]))}},u=c,m=u},8407:(s,e,t)=>{"use strict";t.d(e,{Z:()=>w});var n=t(9835),o=t(499),a=t(6970),r=t(906);const i={class:"text-subtitle1"},l={class:"row justify-center"},c={__name:"confirmDialog",props:{icon:String,iconColor:String,btnColor:String,title:String,caption:String,message:String},emits:[...r.Z.emits],setup(s,{emit:e}){const{dialogRef:t,onDialogHide:c,onDialogOK:u,onDialogCancel:m}=(0,r.Z)();return(e,r)=>{const d=(0,n.up)("q-icon"),j=(0,n.up)("q-card-section"),p=(0,n.up)("q-btn"),g=(0,n.up)("q-card-actions"),v=(0,n.up)("q-card"),f=(0,n.up)("q-dialog");return(0,n.wg)(),(0,n.j4)(f,{ref_key:"dialogRef",ref:t,onHide:(0,o.SU)(c)},{default:(0,n.w5)((()=>[(0,n.Wm)(v,{class:"q-dialog-plugin border-radius sans-font"},{default:(0,n.w5)((()=>[(0,n.Wm)(j,{class:"row no-wrap q-gutter-sm"},{default:(0,n.w5)((()=>[s.icon?((0,n.wg)(),(0,n.j4)(d,{key:0,style:{"margin-top":"10px"},name:s.icon,color:s.iconColor?s.iconColor:"primary",size:"1.5rem"},null,8,["name","color"])):(0,n.kq)("",!0),(0,n._)("div",i,(0,a.zw)(s.title),1)])),_:1}),s.message?((0,n.wg)(),(0,n.j4)(j,{key:0},{default:(0,n.w5)((()=>[(0,n._)("div",l,(0,a.zw)(s.message),1)])),_:1})):(0,n.kq)("",!0),(0,n.Wm)(g,{align:"right"},{default:(0,n.w5)((()=>[(0,n.Wm)(p,{round:"",flat:"",color:"red-10",icon:"cancel",onClick:(0,o.SU)(m)},null,8,["onClick"]),(0,n.Wm)(p,{round:"",flat:"","no-caps":"",color:s.btnColor??"primary",icon:"check_circle",onClick:(0,o.SU)(u)},null,8,["color","onClick"])])),_:1})])),_:1})])),_:1},8,["onHide"])}}};var u=t(3706),m=t(4458),d=t(3190),j=t(2857),p=t(1821),g=t(4455),v=t(9984),f=t.n(v);const k=c,w=k;f()(c,"components",{QDialog:u.Z,QCard:m.Z,QCardSection:d.Z,QIcon:j.Z,QCardActions:p.Z,QBtn:g.Z})},6060:(s,e,t)=>{"use strict";t.d(e,{Z:()=>d});t(9665);var n=t(9835),o=t(499),a=t(8339);const r=(0,n._)("span",{class:"ubuntumono-font text-bold q-ml-sm",style:{"font-size":"19px"}},"Broadcast server",-1),i={__name:"homeLogo",setup(s){const e=(0,a.tv)();return(s,t)=>{const a=(0,n.up)("q-icon");return(0,n.wg)(),(0,n.iD)("div",{class:"row no-wrap cursor-pointer",onClick:t[0]||(t[0]=s=>(0,o.SU)(e).push("/"))},[(0,n.Wm)(a,{class:"self-center",name:"home",size:"1.2rem",color:"primary"}),r])}}};var l=t(2857),c=t(9984),u=t.n(c);const m=i,d=m;u()(i,"components",{QIcon:l.Z})},1144:(s,e,t)=>{"use strict";t.d(e,{Z:()=>$});t(9665);var n=t(9835),o=t(499),a=t(8339),r=t(6970),i=t(9302),l=t(1569),c=t(8407),u=t(8957),m=t(6144);const d={class:"q-pt-md q-gutter-y-sm"},j={class:"row justify-center q-gutter-x-sm"},p={class:"row justify-center"},g={__name:"userAvatar",setup(s){const e=(0,m.L)(),{getUserNickname:t,updateUser:g}=e,v=(0,n.Fl)((()=>e.user)),{notifyError:f}=(0,u.Z)(),k=(0,a.tv)(),w=(0,i.Z)(),b=()=>!(!v.value||!v.value.email),h=()=>{w.dialog({component:c.Z,componentProps:{icon:"warning",iconColor:"red",title:"Are you sure you want to sign out"}}).onOk((()=>{_()}))},_=async()=>{try{await l.api.get("/auth/signout"),e.updateUser(null),k.push("/")}catch(s){f("로그아웃 오류","잠시후 다시 시도해 주세요. 문제가 계속되면 관리자에게 문의해 주세요","top")}};return(s,e)=>{const a=(0,n.up)("q-avatar"),i=(0,n.up)("q-separator"),l=(0,n.up)("q-btn"),c=(0,n.up)("q-menu");return b()?((0,n.wg)(),(0,n.j4)(l,{key:0,style:{border:"1px solid #ddd"},unelevated:"",round:"",size:"sm",color:"primary",label:(0,o.SU)(t)()},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{style:{"border-radius":"8px",padding:"10px 20px"},offset:[10,20]},{default:(0,n.w5)((()=>[(0,n._)("div",d,[(0,n._)("div",j,[(0,n.Wm)(a,{color:"primary",textColor:"white",size:"sm"},{default:(0,n.w5)((()=>[(0,n.Uk)((0,r.zw)((0,o.SU)(t)()),1)])),_:1}),(0,n._)("div",null,(0,r.zw)(v.value.email),1)]),(0,n.Wm)(i),(0,n._)("div",p,[(0,n.Wm)(l,{rounded:"",unelevated:"","no-caps":"",label:"Sign out",onClick:h})])])])),_:1})])),_:1},8,["label"])):((0,n.wg)(),(0,n.iD)("div",{key:1,class:"btn-login cursor-pointer",onClick:e[0]||(e[0]=s=>(0,o.SU)(k).push("/auth"))}," Login "))}}};var v=t(1639),f=t(4455),k=t(9346),w=t(1357),b=t(926),h=t(9984),_=t.n(h);const y=(0,v.Z)(g,[["__scopeId","data-v-118b447b"]]),Z=y;_()(g,"components",{QBtn:f.Z,QMenu:k.Z,QAvatar:w.Z,QSeparator:b.Z});const z=s=>((0,n.dD)("data-v-6767f490"),s=s(),(0,n.Cn)(),s),q={class:"btn cursor-pointer"},S=z((()=>(0,n._)("span",{class:"down-icon"},"▼",-1))),C={__name:"broadcastMenu",setup(s){const e=(0,a.tv)();return(s,t)=>{const a=(0,n.up)("q-icon"),r=(0,n.up)("q-item-section"),i=(0,n.up)("q-item"),l=(0,n.up)("q-list"),c=(0,n.up)("q-menu"),u=(0,n.Q2)("close-popup");return(0,n.wg)(),(0,n.iD)("div",q,[(0,n.Uk)(" Broadcast "),S,(0,n.Wm)(c,{offset:[55,10]},{default:(0,n.w5)((()=>[(0,n.Wm)(l,{style:{"min-width":"220px"}},{default:(0,n.w5)((()=>[(0,n.wy)(((0,n.wg)(),(0,n.j4)(i,{clickable:"",onClick:t[0]||(t[0]=s=>(0,o.SU)(e).push("/broadcast/eventlog"))},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{avatar:""},{default:(0,n.w5)((()=>[(0,n.Wm)(a,{name:"list_alt",color:"primary"})])),_:1}),(0,n.Wm)(r,null,{default:(0,n.w5)((()=>[(0,n.Uk)(" Event Log ")])),_:1})])),_:1})),[[u]])])),_:1})])),_:1})])}}};var U=t(3246),W=t(490),Q=t(1233),x=t(2857),D=t(2146);const I=(0,v.Z)(C,[["__scopeId","data-v-6767f490"]]),E=I;_()(C,"components",{QMenu:k.Z,QList:U.Z,QItem:W.Z,QItemSection:Q.Z,QIcon:x.Z}),_()(C,"directives",{ClosePopup:D.Z});const L=s=>((0,n.dD)("data-v-f82d1334"),s=s(),(0,n.Cn)(),s),N={class:"btn cursor-pointer"},P=L((()=>(0,n._)("span",{class:"down-icon"},"▼",-1))),F={__name:"setupMenu",setup(s){const e=(0,a.tv)();return(s,t)=>{const a=(0,n.up)("q-icon"),r=(0,n.up)("q-item-section"),i=(0,n.up)("q-item"),l=(0,n.up)("q-list"),c=(0,n.up)("q-menu"),u=(0,n.Q2)("close-popup");return(0,n.wg)(),(0,n.iD)("div",N,[(0,n.Uk)(" Setup "),P,(0,n.Wm)(c,{offset:[0,10]},{default:(0,n.w5)((()=>[(0,n.Wm)(l,{style:{"min-width":"220px"}},{default:(0,n.w5)((()=>[(0,n.wy)(((0,n.wg)(),(0,n.j4)(i,{clickable:"",onClick:t[0]||(t[0]=s=>(0,o.SU)(e).push("/admin/users"))},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{avatar:""},{default:(0,n.w5)((()=>[(0,n.Wm)(a,{name:"group",color:"primary"})])),_:1}),(0,n.Wm)(r,null,{default:(0,n.w5)((()=>[(0,n.Uk)(" User management ")])),_:1})])),_:1})),[[u]]),(0,n.wy)(((0,n.wg)(),(0,n.j4)(i,{clickable:"",onClick:t[1]||(t[1]=s=>(0,o.SU)(e).push("/admin/devices"))},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{avatar:""},{default:(0,n.w5)((()=>[(0,n.Wm)(a,{name:"dns",color:"primary"})])),_:1}),(0,n.Wm)(r,null,{default:(0,n.w5)((()=>[(0,n.Uk)(" Device management ")])),_:1})])),_:1})),[[u]]),(0,n.wy)(((0,n.wg)(),(0,n.j4)(i,{clickable:"",onClick:t[2]||(t[2]=s=>(0,o.SU)(e).push("/admin/logs"))},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{avatar:""},{default:(0,n.w5)((()=>[(0,n.Wm)(a,{name:"list_alt",color:"primary"})])),_:1}),(0,n.Wm)(r,null,{default:(0,n.w5)((()=>[(0,n.Uk)("System Log")])),_:1})])),_:1})),[[u]])])),_:1})])),_:1})])}}},M=(0,v.Z)(F,[["__scopeId","data-v-f82d1334"]]),O=M;_()(F,"components",{QMenu:k.Z,QList:U.Z,QItem:W.Z,QItemSection:Q.Z,QIcon:x.Z}),_()(F,"directives",{ClosePopup:D.Z});const A=s=>((0,n.dD)("data-v-733d11ef"),s=s(),(0,n.Cn)(),s),B={class:"row no-wrap items-center"},H=A((()=>(0,n._)("div",{class:"btn cursor-pointer"},"Summary",-1))),T={class:"q-ml-sm"},R={__name:"toolbarLinks",setup(s){(0,n.Fl)((()=>router.currentRoute.value));const e=(0,a.tv)(),{user:t}=(0,m.L)();return(s,t)=>((0,n.wg)(),(0,n.iD)("div",B,[H,(0,n.Wm)((0,o.SU)(E)),(0,n._)("div",{class:"btn cursor-pointer",onClick:t[0]||(t[0]=s=>(0,o.SU)(e).push("/devices"))},"Device"),(0,n.Wm)((0,o.SU)(O)),(0,n._)("div",T,[(0,n.Wm)((0,o.SU)(Z))])]))}},K=(0,v.Z)(R,[["__scopeId","data-v-733d11ef"]]),$=K},6700:(s,e,t)=>{var n={"./af":3902,"./af.js":3902,"./ar":6314,"./ar-dz":5666,"./ar-dz.js":5666,"./ar-kw":6591,"./ar-kw.js":6591,"./ar-ly":7900,"./ar-ly.js":7900,"./ar-ma":5667,"./ar-ma.js":5667,"./ar-sa":4092,"./ar-sa.js":4092,"./ar-tn":1379,"./ar-tn.js":1379,"./ar.js":6314,"./az":1699,"./az.js":1699,"./be":8988,"./be.js":8988,"./bg":7437,"./bg.js":7437,"./bm":7947,"./bm.js":7947,"./bn":2851,"./bn-bd":4905,"./bn-bd.js":4905,"./bn.js":2851,"./bo":7346,"./bo.js":7346,"./br":1711,"./br.js":1711,"./bs":4974,"./bs.js":4974,"./ca":112,"./ca.js":112,"./cs":6406,"./cs.js":6406,"./cv":1853,"./cv.js":1853,"./cy":9766,"./cy.js":9766,"./da":6836,"./da.js":6836,"./de":9320,"./de-at":4904,"./de-at.js":4904,"./de-ch":6710,"./de-ch.js":6710,"./de.js":9320,"./dv":3274,"./dv.js":3274,"./el":286,"./el.js":286,"./en-au":143,"./en-au.js":143,"./en-ca":237,"./en-ca.js":237,"./en-gb":2428,"./en-gb.js":2428,"./en-ie":3349,"./en-ie.js":3349,"./en-il":3764,"./en-il.js":3764,"./en-in":7809,"./en-in.js":7809,"./en-nz":9851,"./en-nz.js":9851,"./en-sg":5594,"./en-sg.js":5594,"./eo":4483,"./eo.js":4483,"./es":2184,"./es-do":5777,"./es-do.js":5777,"./es-mx":9356,"./es-mx.js":9356,"./es-us":8496,"./es-us.js":8496,"./es.js":2184,"./et":7578,"./et.js":7578,"./eu":2092,"./eu.js":2092,"./fa":5927,"./fa.js":5927,"./fi":171,"./fi.js":171,"./fil":2416,"./fil.js":2416,"./fo":9937,"./fo.js":9937,"./fr":5172,"./fr-ca":8249,"./fr-ca.js":8249,"./fr-ch":7541,"./fr-ch.js":7541,"./fr.js":5172,"./fy":7907,"./fy.js":7907,"./ga":6361,"./ga.js":6361,"./gd":2282,"./gd.js":2282,"./gl":2630,"./gl.js":2630,"./gom-deva":680,"./gom-deva.js":680,"./gom-latn":6220,"./gom-latn.js":6220,"./gu":6272,"./gu.js":6272,"./he":5540,"./he.js":5540,"./hi":6067,"./hi.js":6067,"./hr":9669,"./hr.js":9669,"./hu":3396,"./hu.js":3396,"./hy-am":6678,"./hy-am.js":6678,"./id":4812,"./id.js":4812,"./is":4193,"./is.js":4193,"./it":7863,"./it-ch":959,"./it-ch.js":959,"./it.js":7863,"./ja":1809,"./ja.js":1809,"./jv":8657,"./jv.js":8657,"./ka":3290,"./ka.js":3290,"./kk":8418,"./kk.js":8418,"./km":7687,"./km.js":7687,"./kn":1375,"./kn.js":1375,"./ko":2641,"./ko.js":2641,"./ku":3518,"./ku.js":3518,"./ky":5459,"./ky.js":5459,"./lb":1978,"./lb.js":1978,"./lo":6915,"./lo.js":6915,"./lt":8948,"./lt.js":8948,"./lv":2548,"./lv.js":2548,"./me":8608,"./me.js":8608,"./mi":333,"./mi.js":333,"./mk":1876,"./mk.js":1876,"./ml":999,"./ml.js":999,"./mn":4098,"./mn.js":4098,"./mr":6111,"./mr.js":6111,"./ms":3717,"./ms-my":265,"./ms-my.js":265,"./ms.js":3717,"./mt":8980,"./mt.js":8980,"./my":6895,"./my.js":6895,"./nb":5348,"./nb.js":5348,"./ne":1493,"./ne.js":1493,"./nl":4419,"./nl-be":5576,"./nl-be.js":5576,"./nl.js":4419,"./nn":6907,"./nn.js":6907,"./oc-lnc":2321,"./oc-lnc.js":2321,"./pa-in":9239,"./pa-in.js":9239,"./pl":7627,"./pl.js":7627,"./pt":5703,"./pt-br":1623,"./pt-br.js":1623,"./pt.js":5703,"./ro":2747,"./ro.js":2747,"./ru":4420,"./ru.js":4420,"./sd":2148,"./sd.js":2148,"./se":2461,"./se.js":2461,"./si":2783,"./si.js":2783,"./sk":3306,"./sk.js":3306,"./sl":341,"./sl.js":341,"./sq":2768,"./sq.js":2768,"./sr":2451,"./sr-cyrl":3371,"./sr-cyrl.js":3371,"./sr.js":2451,"./ss":8812,"./ss.js":8812,"./sv":3820,"./sv.js":3820,"./sw":3615,"./sw.js":3615,"./ta":2869,"./ta.js":2869,"./te":2044,"./te.js":2044,"./tet":5861,"./tet.js":5861,"./tg":6999,"./tg.js":6999,"./th":1772,"./th.js":1772,"./tk":7443,"./tk.js":7443,"./tl-ph":9786,"./tl-ph.js":9786,"./tlh":2812,"./tlh.js":2812,"./tr":6952,"./tr.js":6952,"./tzl":9573,"./tzl.js":9573,"./tzm":5990,"./tzm-latn":6961,"./tzm-latn.js":6961,"./tzm.js":5990,"./ug-cn":2610,"./ug-cn.js":2610,"./uk":9498,"./uk.js":9498,"./ur":3970,"./ur.js":3970,"./uz":9006,"./uz-latn":26,"./uz-latn.js":26,"./uz.js":9006,"./vi":9962,"./vi.js":9962,"./x-pseudo":5577,"./x-pseudo.js":5577,"./yo":1962,"./yo.js":1962,"./zh-cn":8909,"./zh-cn.js":8909,"./zh-hk":4014,"./zh-hk.js":4014,"./zh-mo":996,"./zh-mo.js":996,"./zh-tw":6327,"./zh-tw.js":6327};function o(s){var e=a(s);return t(e)}function a(s){if(!t.o(n,s)){var e=new Error("Cannot find module '"+s+"'");throw e.code="MODULE_NOT_FOUND",e}return n[s]}o.keys=function(){return Object.keys(n)},o.resolve=a,s.exports=o,o.id=6700}}]);