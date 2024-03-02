"use strict";(globalThis["webpackChunkbs_fe"]=globalThis["webpackChunkbs_fe"]||[]).push([[28],{7081:(e,a,s)=>{s.r(a),s.d(a,{default:()=>Q});var o=s(9835),l=s(6970),n=s(499),d=s(9302),r=s(1569),i=(s(6056),s(4480)),t=s(8407);const c={class:"q-pa-md"},p={class:"borderd"},m={class:"q-px-lg q-py-sm row items-center bg-grey-2"},u={class:"row no-wrap items-center q-gutter-x-sm"},v=(0,o._)("span",{class:"text-h6"},"Q-SYS",-1),g=["href"],w={__name:"qsysPage",setup(e){const a=(0,d.Z)(),s=(0,n.iH)(""),w=(0,n.iH)([]),b=(0,n.iH)(!1),_=()=>{a.dialog({component:i.Z}).onOk((async e=>{console.log(e),a.loading.show();const s=await r.api.post("/devices/qsys",{...e});a.loading.hide(),s&&s.data&&f()}))},y=e=>{a.dialog({component:t.Z,componentProps:{icon:"delete",iconColor:"red",title:"Remove Q-SYS Device",message:`Are you sure to remove ${e.name}:${e.ipaddress}-${e.deviceId}?`}}).onOk((async()=>{a.loading.show(),await r.api.delete("/devices/qsys",{data:{...e}}),a.loading.hide(),f()}))},f=async()=>{b.value=!0;const e=await r.api.get("/devices/qsys");console.log(e),e&&e.data&&(w.value=e.data.devices),b.value=!1};return(0,o.bv)((()=>{f()})),(e,a)=>{const n=(0,o.up)("q-icon"),d=(0,o.up)("q-space"),r=(0,o.up)("q-input"),i=(0,o.up)("q-td"),t=(0,o.up)("q-btn"),f=(0,o.up)("q-tr"),h=(0,o.up)("q-table");return(0,o.wg)(),(0,o.iD)("div",c,[(0,o._)("div",p,[(0,o._)("div",m,[(0,o._)("div",u,[(0,o.Wm)(n,{name:"img:qsys-logo.svg",size:"20px",color:"primary"}),v,(0,o.Wm)(n,{class:"cursor-pointer",name:"add_circle",color:"primary",size:"sm",onClick:_})]),(0,o.Wm)(d),(0,o.Wm)(r,{modelValue:s.value,"onUpdate:modelValue":a[0]||(a[0]=e=>s.value=e),borderless:"",dense:"",debounce:"300",clearable:"",placeholder:"Search"},{append:(0,o.w5)((()=>[(0,o.Wm)(n,{name:"search"})])),_:1},8,["modelValue"])]),(0,o.Wm)(h,{flat:"",filter:s.value,loading:b.value,rows:w.value,columns:[{name:"name",label:"Name",align:"center",field:"name",sortable:!0},{name:"deviceId",label:"Device ID",align:"center",field:"deviceId",sortable:!0},{name:"ipaddress",label:"IP Address",align:"center",field:"ipaddress",sortable:!0},{name:"actions",label:"FN",align:"center"}]},{body:(0,o.w5)((e=>[(0,o.Wm)(f,{props:e},{default:(0,o.w5)((()=>[(0,o.Wm)(i,{key:"name",props:e},{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)(e.row.name),1)])),_:2},1032,["props"]),(0,o.Wm)(i,{key:"deviceId",props:e},{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)(e.row.deviceId),1)])),_:2},1032,["props"]),(0,o.Wm)(i,{key:"ipaddress",props:e},{default:(0,o.w5)((()=>[(0,o._)("a",{href:`http://${e.row.ipaddress}`,target:"_blank"},(0,l.zw)(e.row.ipaddress),9,g)])),_:2},1032,["props"]),(0,o.Wm)(i,{key:"actions",props:e},{default:(0,o.w5)((()=>[(0,o._)("div",null,[(0,o.Wm)(t,{round:"",flat:"",color:"red-10",size:"sm",icon:"delete",onClick:a=>y(e.row)},null,8,["onClick"])])])),_:2},1032,["props"])])),_:2},1032,["props"])])),_:1},8,["filter","loading","rows"])])])}}};var b=s(2857),_=s(136),y=s(6611),f=s(4965),h=s(3532),k=s(7220),q=s(4455),W=s(9984),Z=s.n(W);const I=w,Q=I;Z()(w,"components",{QIcon:b.Z,QSpace:_.Z,QInput:y.Z,QTable:f.Z,QTr:h.Z,QTd:k.Z,QBtn:q.Z})}}]);