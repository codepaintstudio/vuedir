import{_ as o,aB as c,c as l,o as n,j as s,ab as e,F as k,B as E,t as d,ad as h,G as p}from"./chunks/framework.BY7ne7pH.js";import{A as g}from"./chunks/ApiTable.BM7RJQe3.js";/* empty css                                                                        */const y={},u={class:"demo-container"},F={class:"scroll-wrapper"},v={class:"demo-header"},b={class:"scroll-content"};function C(r,i){const t=c("headerscroll");return n(),l("div",u,[s("div",F,[e((n(),l("header",v,i[0]||(i[0]=[s("div",{class:"header-content"},[s("h1",null,"基础用法示例"),s("nav",null,[s("a",{href:"#",class:"active"},"首页")])],-1)]))),[[t,{scope:"local"}]]),s("div",b,[(n(),l(k,null,E(4,a=>s("div",{key:a,class:"content-block"},[s("h3",null,"Section "+d(a),1),i[1]||(i[1]=s("p",null,"这是一个基础示例，向下滚动时头部会自动隐藏，向上滚动时会显示。",-1))])),64))])])])}const _=o(y,[["render",C],["__scopeId","data-v-b0845932"]]),m={},q={class:"demo-container"},B={class:"scroll-wrapper"},f={class:"demo-header"},A={class:"demo-sections"},D={class:"local-scroll-section"},x={class:"scroll-container"},P={class:"local-header"},T={class:"local-content"},S={class:"blur-section"},w={class:"scroll-container"},I={class:"local-header"},V={class:"local-content"};function N(r,i){const t=c("headerscroll");return n(),l("div",q,[s("div",B,[e((n(),l("header",f,i[0]||(i[0]=[s("div",{class:"header-content"},[s("h1",null,"进阶用法示例"),s("nav",null,[s("a",{href:"#",class:"active"},"首页")])],-1)]))),[[t,{transition:"fade",duration:300,offset:50,scope:"local"}]]),s("div",A,[s("div",D,[s("div",x,[e((n(),l("header",P,i[1]||(i[1]=[s("div",{class:"header-content"},[s("h3",null,"局部效果头部")],-1)]))),[[t,{transition:"scale",duration:300,scope:"local"}]]),s("div",T,[(n(),l(k,null,E(5,a=>s("div",{key:a,class:"content-block"},[s("h4",null,"Section "+d(a),1),i[2]||(i[2]=s("p",null,"这是局部滚动区域的内容，使用了缩放效果。",-1))])),64))])])]),s("div",S,[s("div",w,[e((n(),l("header",I,i[3]||(i[3]=[s("div",{class:"header-content"},[s("h3",null,"模糊效果头部")],-1)]))),[[t,{transition:"blur",duration:400,scope:"local"}]]),s("div",V,[(n(),l(k,null,E(5,a=>s("div",{key:a,class:"content-block"},[s("h4",null,"Section "+d(a),1),i[4]||(i[4]=s("p",null,"这是另一个局部滚动区域，使用了模糊效果。",-1))])),64))])])])])])])}const $=o(m,[["render",N],["__scopeId","data-v-4f98eb45"]]),G=JSON.parse('{"title":"v-headerscroll 指令","description":"","frontmatter":{},"headers":[],"relativePath":"directives/headerscroll.md","filePath":"directives/headerscroll.md","lastUpdated":1741572947000}'),R={name:"directives/headerscroll.md"},J=Object.assign(R,{setup(r){const i=[{name:"duration",description:"过渡动画持续时间（毫秒）",type:"number",default:"300",required:!1},{name:"offset",description:"触发显示/隐藏的滚动距离阈值（像素）",type:"number",default:"50",required:!1},{name:"transition",description:"过渡效果类型",type:"'slide' | 'fade' | 'scale' | 'blur'",default:"'slide'",required:!1},{name:"showClass",description:"自定义显示状态类名",type:"string",default:"-",required:!1},{name:"hideClass",description:"自定义隐藏状态类名",type:"string",default:"-",required:!1},{name:"scope",description:"滚动监听范围",type:"'global' | 'local'",default:"'global'",required:!1}];return(t,a)=>(n(),l("div",null,[a[0]||(a[0]=h("",6)),p(_),a[1]||(a[1]=h("",15)),p($),a[2]||(a[2]=h("",20)),p(g,{data:i}),a[3]||(a[3]=h("",6))]))}});export{G as __pageData,J as default};
