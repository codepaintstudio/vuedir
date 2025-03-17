import{p as n}from"./chunks/theme.BfoQEBc2.js";import{d as F,p as t,c as g,o as y,j as s,ad as h,k as l,_ as c,af as E,G as p,a as u}from"./chunks/framework.CEgwgnIk.js";import{A as d}from"./chunks/ApiTable.D9aVOBNJ.js";/* empty css                                                                        */const m={class:"banner"},C=F({__name:"FomatterDemo",setup(o){const k=t(1e5),e=t(.5),r=t(new Date),i=t(5e3);return(f,a)=>(y(),g("div",m,[a[0]||(a[0]=s("h2",null,"中国货币",-1)),h(s("div",null,null,512),[[l(n),{value:k.value,locale:"zh-CN",options:{style:"currency",currency:"CNY"}}]]),a[1]||(a[1]=s("h2",null,"百分比",-1)),h(s("div",null,null,512),[[l(n),{value:e.value,options:{fractionDigits:2}}]]),a[2]||(a[2]=s("h2",null,"时间：传入数据为Date类型就会格式化",-1)),h(s("div",null,null,512),[[l(n),{value:r.value,options:{weekday:"short",year:"numeric",month:"narrow",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}}]]),a[3]||(a[3]=s("h2",null,"字节",-1)),h(s("div",null,null,512),[[l(n),{value:i.value,options:{decimals:2}}]])]))}}),D=c(C,[["__scopeId","data-v-e8ba8ec9"]]),b=JSON.parse('{"title":"v-fomatter","description":"","frontmatter":{},"headers":[],"relativePath":"directives/fomatter.md","filePath":"directives/fomatter.md","lastUpdated":1742194510000}'),B={name:"directives/fomatter.md"},x=Object.assign(B,{setup(o){const k=[{name:"value",description:"需要格式化的数据",type:"number | Date",required:!0},{name:"locale",description:"当前区域",type:"string",default:"zh-CN",required:!1},{name:"options",description:"格式化选项",type:"object",required:!0}],e=[{name:"style",description:"格式化样式，若需要初始化为货币，需要传值 currency",type:"string",required:!1},{name:"currency",description:"货币符号",type:"string",default:"CNY",required:!1},{name:"fractionDigits",description:"若数据需要格式化为百分比就传，百分比小数位数",type:"number",required:!1},{name:"weekday",description:"显示星期几的方式 (narrow、short、long)",type:"string",required:!1},{name:"year",description:"年份 (2-digit、numeric)",type:"string",required:!1},{name:"month",description:"月份 (2-digit、numeric、narrow、short、long)",type:"string",required:!1},{name:"day",description:"显示日期的方式 (2-digit、numeric)。",type:"string",required:!1},{name:"hour",description:"显示小时的方式 (2-digit、numeric)",type:"string",required:!1},{name:"minute",description:" 显示分钟的方式 (2-digit、numeric)。",type:"string",required:!1},{name:"second",description:" 显示秒的方式 (2-digit、numeric)",type:"string",required:!1},{name:"timeZone",description:"显示时区名称的方式 (short、long)",type:"string",required:!1},{name:"minimumIntegerDigits",description:"最小整数位数",type:"number",required:!1},{name:"minimumFractionDigits",description:"最小小数位数",type:"number",required:!1},{name:"minimumFractionDigits",description:"最小小数位数",type:"number",required:!1},{name:"maximumFractionDigits",description:"最大小数位数",type:"number",required:!1}];return(r,i)=>(y(),g("div",null,[i[0]||(i[0]=E("",5)),p(D),i[1]||(i[1]=E("",2)),p(d,{data:k}),i[2]||(i[2]=s("h3",{id:"options",tabindex:"-1"},[u("options "),s("a",{class:"header-anchor",href:"#options","aria-label":'Permalink to "options"'},"​")],-1)),p(d,{data:e})]))}});export{b as __pageData,x as default};
