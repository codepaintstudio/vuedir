import{C as B}from"./chunks/theme.D-7qWsmb.js";import{d as A,p as r,C as d,c as p,o as e,F as f,G as k,w as h,ab as D,j as a,k as _,a as E,ad as g}from"./chunks/framework.BeX3lPKv.js";import{A as b}from"./chunks/ApiTable.DuEw1IeG.js";/* empty css                                                                        */const q=A({__name:"Basic",setup(y){const n=r(!1),t=r(),i=l=>{var s;n.value=!0,(s=t.value)==null||s.pause()},F=l=>{var s;n.value=!0,(s=t.value)==null||s.pause()},o=()=>{var l;n.value=!1,(l=t.value)==null||l.play()},c=()=>{var l;n.value=!1,(l=t.value)==null||l.play()},u=[{time:5e3,callback:()=>F()},{time:"100%",callback:()=>i()}];return(l,s)=>{const m=d("a-card"),C=d("a-modal");return e(),p(f,null,[k(m,null,{default:h(()=>[D((e(),p("video",{ref_key:"videoRef",ref:t,controls:"",autoplay:""},s[1]||(s[1]=[a("source",{src:"https://videos.pexels.com/video-files/856171/856171-hd_1920_1080_30fps.mp4",type:"video/mp4"},null,-1)]))),[[_(B),u]])]),_:1}),k(C,{visible:n.value,"onUpdate:visible":s[0]||(s[0]=v=>n.value=v),onOk:o,onCancel:c},{title:h(()=>s[2]||(s[2]=[E(" 提示 ")])),default:h(()=>[s[3]||(s[3]=a("div",null,"timeTrack触发，视频已暂停播放。点击确定/取消按钮继续播放。",-1))]),_:1},8,["visible"])],64)}}}),O=JSON.parse('{"title":"v-timetrack","description":"","frontmatter":{},"headers":[],"relativePath":"directives/timetrack.md","filePath":"directives/timetrack.md","lastUpdated":1741655961000}'),T={name:"directives/timetrack.md"},V=Object.assign(T,{setup(y){const n=[{name:"options",type:"option[]",default:"[]",description:"配置对象数组",required:!0},{name:"option",type:"object",default:"{}",description:"配置对象",required:!0},{name:"time",type:"number ｜ string",default:"0",description:"时间点，用于在指定时间触发回掉，单位为毫秒或者百分比",required:!0},{name:"callback",type:"function",default:"() => {}",description:"回调函数",required:!0}];return(t,i)=>(e(),p("div",null,[i[0]||(i[0]=g("",6)),k(q),i[1]||(i[1]=g("",2)),k(b,{data:n}),i[2]||(i[2]=a("h2",{id:"注意事项",tabindex:"-1"},[E("注意事项 "),a("a",{class:"header-anchor",href:"#注意事项","aria-label":'Permalink to "注意事项"'},"​")],-1)),i[3]||(i[3]=a("div",{class:"warning custom-block"},[a("p",{class:"custom-block-title"},"注意"),a("ul",null,[a("li",null,[a("code",null,"time"),E("属性的单位为毫秒或者百分比。")]),a("li",null,"回调函数的参数为当前时间点。")])],-1))]))}});export{O as __pageData,V as default};
