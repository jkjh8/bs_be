"use strict";(globalThis["webpackChunkbs_fe"]=globalThis["webpackChunkbs_fe"]||[]).push([[347],{2022:(e,a,o)=>{o.r(a),o.d(a,{default:()=>Z});var i=o(9835),n=o(499),r=o(9302),l=o(1569),s=o(1238),c=o(5385),t=o(947),d=o(8407);const p=()=>{const e=(0,r.Z)(),a=()=>{console.log("add"),e.dialog({component:t.Z,componentProps:{title:"IP오디오 전송장치 추가",type:"barix"}}).onOk((async a=>{e.loading.show();try{await l.api.post("/devices/barix",{...a}),await(0,c.u)(),e.loading.hide()}catch(o){e.loading.hide(),console.error(o)}}))},o=a=>{e.dialog({component:d.Z,componentProps:{icon:"delete",iconColor:"red",title:"IP오디오 전송장치 삭제",message:`${a.name} - ${a.ipaddress}`}}).onOk((async()=>{e.loading.show();try{await l.api.delete("/devices/barix",{data:{...a}}),await(0,c.u)(),e.loading.hide()}catch(o){e.loading.hide(),console.error(o)}}))};return{fnAddBarixDevice:a,fnDeleteBarixDevice:o}},m={class:"q-pa-md"},u={class:"borderd"},g={class:"q-px-lg q-py-sm row items-center bg-grey-2"},v={class:"row no-wrap items-center q-gutter-x-sm"},b=(0,i._)("span",{class:"text-h6"},"Barix",-1),h={__name:"barixPage",setup(e){(0,r.Z)();const{fnAddBarixDevice:a,fnDeleteBarixDevice:o}=p(),l=(0,n.iH)(""),t=(0,n.iH)(!1);return(0,i.bv)((async()=>{await(0,c.u)()})),(e,r)=>{const d=(0,i.up)("q-icon"),p=(0,i.up)("q-space"),h=(0,i.up)("q-input");return(0,i.wg)(),(0,i.iD)("div",m,[(0,i._)("div",u,[(0,i._)("div",g,[(0,i._)("div",v,[(0,i.Wm)(d,{name:"img:barix-logo.svg",size:"14px",color:"primary"}),b,(0,i.Wm)(d,{class:"cursor-pointer",name:"add_circle",color:"primary",size:"sm",onClick:(0,n.SU)(a)},null,8,["onClick"])]),(0,i.Wm)(p),(0,i.Wm)(h,{modelValue:l.value,"onUpdate:modelValue":r[0]||(r[0]=e=>l.value=e),borderless:"",dense:"",debounce:"300",clearable:"",placeholder:"Search"},{append:(0,i.w5)((()=>[(0,i.Wm)(d,{name:"search"})])),_:1},8,["modelValue"])]),(0,i.Wm)(s.Z,{rows:(0,n.SU)(c.b),filter:l.value,loading:t.value,onRemove:(0,n.SU)(o),deviceType:"barix"},null,8,["rows","filter","loading","onRemove"])])])}}};var w=o(2857),x=o(136),y=o(6611),_=o(9984),f=o.n(_);const k=h,Z=k;f()(h,"components",{QIcon:w.Z,QSpace:x.Z,QInput:y.Z})}}]);