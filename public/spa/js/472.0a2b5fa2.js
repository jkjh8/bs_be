"use strict";(globalThis["webpackChunkbs_fe"]=globalThis["webpackChunkbs_fe"]||[]).push([[472],{1472:(e,a,l)=>{l.r(a),l.d(a,{default:()=>B});var s=l(9835),i=l(6970),r=l(499),t=l(1569),d=l(8957);const c=e=>((0,s.dD)("data-v-74985070"),e=e(),(0,s.Cn)(),e),o={class:"q-pa-md"},n={class:"borderd"},u={class:"q-px-lg q-py-sm row no-wrap items-center bg-grey-2"},v=c((()=>(0,s._)("div",{class:"text-h6"},"Device ID",-1))),p={class:"q-pa-lg q-gutter-y-sm"},m={class:"row no-wrap"},b=c((()=>(0,s._)("div",{class:"self-center"},"Q-SYS Bridge",-1))),_={class:"row no-wrap"},w=c((()=>(0,s._)("div",{class:"self-center"},"BARIX Bridge",-1))),y={class:"row no-wrap"},h=c((()=>(0,s._)("div",{class:"self-center"},"TTS",-1))),g={__name:"DeviceRegistration",setup(e){const{notifyInfo:a,notifyError:l}=(0,d.Z)(),c=(0,r.iH)(""),g=(0,r.iH)(""),f=(0,r.iH)(""),k=(0,r.iH)(""),q=(0,r.iH)(""),x=(0,r.iH)(""),C=async(e,s)=>{try{if("qsys"===e&&c.value===k.value)return;if("barix"===e&&g.value===q.value)return;if("tts"===e&&f.value===x.value)return;const l=await t.api.post("/bridge",{data:{type:e,id:s}});if(l.data&&l.data.result)switch(e){case"qsys":c.value=k.value;break;case"barix":g.value=q.value;break;case"tts":f.value=x.value;break}a(`Updated - ${e.toUpperCase()} - Bridge information`)}catch(i){console.error(i),l("Failed to update Brigde information")}};return(0,s.bv)((async()=>{try{const e=await t.api.get("/bridge");e.data.bridge.forEach((e=>{switch(e.type){case"qsys":c.value=e.id,k.value=e.id;break;case"barix":g.value=e.id,q.value=e.id;break;case"tts":f.value=e.id,x.value=e.id;break}}))}catch(e){console.error(e),l("Failed to get Bridge information")}})),(e,a)=>{const l=(0,s.up)("q-icon"),r=(0,s.up)("q-space"),t=(0,s.up)("q-input");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("div",n,[(0,s._)("div",u,[(0,s.Wm)(l,{name:"dns",size:"20px",color:"primary"}),v]),(0,s._)("div",p,[(0,s._)("div",m,[b,(0,s.Wm)(r),(0,s.Wm)(t,{modelValue:k.value,"onUpdate:modelValue":a[1]||(a[1]=e=>k.value=e),style:{"min-width":"350px",width:"50%"},outlined:"",dense:""},{append:(0,s.w5)((()=>[(0,s.Wm)(l,{class:(0,i.C_)(c.value!==k.value?"cursor-pointer":"disabled"),name:"check_circle",color:"primary",onClick:a[0]||(a[0]=e=>C("qsys",k.value))},null,8,["class"])])),_:1},8,["modelValue"])]),(0,s._)("div",_,[w,(0,s.Wm)(r),(0,s.Wm)(t,{modelValue:q.value,"onUpdate:modelValue":a[3]||(a[3]=e=>q.value=e),style:{"min-width":"350px",width:"50%"},outlined:"",dense:""},{append:(0,s.w5)((()=>[(0,s.Wm)(l,{class:(0,i.C_)(g.value!==q.value?"cursor-pointer":"disabled"),name:"check_circle",color:"primary",onClick:a[2]||(a[2]=e=>C("barix",q.value))},null,8,["class"])])),_:1},8,["modelValue"])]),(0,s._)("div",y,[h,(0,s.Wm)(r),(0,s.Wm)(t,{modelValue:x.value,"onUpdate:modelValue":a[5]||(a[5]=e=>x.value=e),style:{"min-width":"350px",width:"50%"},outlined:"",dense:""},{append:(0,s.w5)((()=>[(0,s.Wm)(l,{class:(0,i.C_)(f.value!==x.value?"cursor-pointer":"disabled"),name:"check_circle",color:"primary",onClick:a[4]||(a[4]=e=>C("tts",x.value))},null,8,["class"])])),_:1},8,["modelValue"])])])])])}}};var f=l(1639),k=l(2857),q=l(136),x=l(6611),C=l(9984),W=l.n(C);const V=(0,f.Z)(g,[["__scopeId","data-v-74985070"]]),B=V;W()(g,"components",{QIcon:k.Z,QSpace:q.Z,QInput:x.Z})}}]);