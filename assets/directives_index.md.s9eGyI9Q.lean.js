import{r as _,v}from"./chunks/theme.D7OQbRAz.js";import{_ as f,p as b,h as k,C as x,c as a,o as t,ad as m,k as l,a as g,t as o,F as y,B as u,j as i,b as w,w as B}from"./chunks/framework.kaj8Trvw.js";const C={class:"category-title"},D={class:"directive-grid"},j=["href"],z={class:"directive-name"},N={class:"directive-description"},T=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"directives/index.md","filePath":"directives/index.md","lastUpdated":1741883142000}'),E={name:"directives/index.md"},F=Object.assign(E,{setup(O){const c=b([{name:"timetrack",description:"用于媒体元素的指令，当达到指定时间时触发回调函数，支持数组形式的多个时间点",category:"交互类"},{name:"backtop",description:"返回顶部指令，当页面滚动到一定高度时显示返回顶部按钮",category:"交互类"},{name:"copy",description:"一键复制文本内容，支持动态文本和复制状态反馈",category:"交互类"},{name:"clickout",description:"点击外部处理函数，支持自定义点击外部处理函数",category:"交互类"},{name:"hotkey",description:"监听键盘事件，支持自定义多个快捷键和回掉函数",category:"交互类"},{name:"tooltip",description:"为元素添加悬浮提示，支持自定义提示内容和位置",category:"交互类"},{name:"preload",description:"预加载指令，支持页面预加载和资源预加载",category:"性能优化类"},{name:"emoji",description:"禁止表情符号输入功能，防止在表单中用户输入表情符号",category:"表单类"},{name:"trim",description:"去除输入框首尾空格，防止用户输入空格",category:"表单类"},{name:"ellipsis",description:"文本溢出时自动添加省略号，支持自定义行数",category:"视觉类"},{name:"focus",description:"自动聚焦表单元素，提升表单交互体验",category:"表单类"},{name:"pwdvisible",description:"密码可见性切换功能",category:"表单类"},{name:"clearable",description:"为输入框或文本域添加一个清除按钮，点击后可以快速清空内容",category:"表单类"},{name:"debounce",description:"防抖函数，用于减少事件触发频率",category:"交互类"},{name:"throttle",description:"节流函数，用于控制事件触发频率",category:"交互类"},{name:"highlight",description:"灵活的文本高亮效果，支持多种颜色格式和自动对比度",category:"视觉类"},{name:"watermarker",description:"为元素添加水印效果，支持自定义水印文本和样式",category:"视觉类"},{name:"longpress",description:"长按事件功能，支持自定义长按时间",category:"交互类"},{name:"scrollto",description:"滚动到指定元素，支持自定义滚动行为",category:"交互类"},{name:"spare",description:"处理图片加载失败场景，自动切换到备用图片",category:"性能优化类"},{name:"doubleclick",description:"双击事件处理，提供更丰富的交互方式",category:"交互类"},{name:"threeclick",description:"三击事件处理，支持自定义三击时间",category:"交互类"},{name:"drag",description:"创建可拖动的元素，支持设置范围、设置回掉函数",category:"交互类"},{name:"ripple",description:"给目标元素添加水波纹效果，支持自定义波纹颜色和时长",category:"视觉类"},{name:"countup",description:"数字滚动动画效果，支持指定目标数值或使用元素内容作为目标值",category:"视觉类"},{name:"lazyload",description:"图片懒加载功能，支持自定义加载时机",category:"性能优化类"},{name:"fitfont",description:"根据容器的大小动态调整文本的字体大小",category:"视觉类"},{name:"autobox",description:"自动调整box大小以适应其内容",category:"视觉类"},{name:"boxresize",description:"监听元素的尺寸变化，并在尺寸变化时触发回调函数",category:"视觉类"},{name:"verify",description:"表单验证功能，支持自定义验证规则和错误提示",category:"表单类"},{name:"draggablesort",description:"拖拽元素来重新排序列表，并且在拖拽完成后更新数据",category:"交互类"},{name:"autoinputtype",description:"根据输入内容自动切换输入框类型，例如在输入邮箱时自动切换到邮箱输入框",category:"表单类"},{name:"fullscreen",description:"点击元素全屏显示，再次点击退出全屏",category:"交互类"},{name:"infinitescroll",description:"实现无限滚动功能，当滚动到底部时触发加载更多数据",category:"交互类"},{name:"mousefollow",description:"鼠标跟随指令，支持自定义跟随元素和位置",category:"交互类"},{name:"marquee",description:"实现文本滚动效果，支持自定义滚动速度和方向",category:"视觉类"},{name:"top",description:"永远使得元素图层最高！",category:"视觉类"},{name:"desaturate",description:"一键开启网页灰色素调，至远方",category:"视觉类"},{name:"closetab",description:"关闭当前浏览器标签页",category:"交互类"},{name:"headerscroll",description:"控制顶部header的显示和隐藏",category:"视觉类"},{name:"loading",description:"显示加载动画",category:"视觉类"},{name:"particle",description:"点击粒子爆炸效果",category:"视觉类"},{name:"invertcolors",description:"实现文字颜色和背景色的反转效果",category:"视觉类"},{name:"confetti",description:"点击元素触发全屏五彩纸屑动画效果",category:"视觉类"},{name:"gradient",description:"为元素添加渐变背景流动效果",category:"视觉类"},{name:"typing",description:"模拟打字机效果的指令，支持速度控制和状态回调，让文本展示更生动有趣。",category:"视觉类"},{name:"progress",description:"实时进度条（绑定数值自动渲染环形/条形进度）",category:"视觉类"},{name:"magnet",description:"元素磁化，支持定义磁力、磁性",category:"视觉类"},{name:"appleBlur",description:"苹果毛玻璃效果",category:"视觉类"},{name:"i18n",description:"i18n，更轻量级、指令化的国际化方案。",category:"工具类"},{name:"virtuallist",description:"虚拟列表，用于渲染大量数据时提升性能",category:"性能优化类"}]),p=k(()=>{const r={};return c.value.sort((e,s)=>e.name.localeCompare(s.name)),c.value.forEach(e=>{r[e.category]||(r[e.category]=[]),r[e.category].push(e)}),r});return(r,e)=>{const s=x("a-button");return t(),a("div",null,[m((t(),a("h1",null,[g("指令集预览 - "+o(c.value.length)+"个",1)])),[[l(_)]]),(t(!0),a(y,null,u(p.value,(h,d)=>(t(),a("div",{key:d,class:"category-section"},[i("h3",C,o(d)+" - "+o(p.value[d].length)+"个 ",1),i("div",D,[(t(!0),a(y,null,u(h,n=>(t(),a("a",{key:n.name,href:`/directives/${n.name}`,class:"directive-card"},[i("div",z,o(n.name),1),e[0]||(e[0]=i("hr",{style:{width:"100%"}},null,-1)),i("div",N,o(n.description),1)],8,j))),128))])]))),128)),m((t(),w(s,{type:"primary",long:"",size:"large",shape:"round"},{default:B(()=>e[1]||(e[1]=[g(" 返回顶部 ")])),_:1})),[[l(v)]])])}}}),V=f(F,[["__scopeId","data-v-06bd78ea"]]);export{T as __pageData,V as default};
