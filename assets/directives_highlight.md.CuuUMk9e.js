import{a as e}from"./chunks/theme.BWB9-vEN.js";import{d as g,c as l,o as h,ah as n,k as p,a as t,_ as o,ai as c,G as k,j as a}from"./chunks/framework.BWvz8Kb5.js";import{A as r}from"./chunks/ApiTable.56dFC-og.js";const y={class:"highlight-examples"},u={class:"highlight-item"},v={class:"highlight-item"},b={class:"highlight-item"},F=g({__name:"HighlightDemo",setup(E){return(d,i)=>(h(),l("div",y,[n((h(),l("div",u,i[0]||(i[0]=[t("简单红色背景")]))),[[p(e),"#ff0000"]]),n((h(),l("div",v,i[1]||(i[1]=[t(" 黄色背景黑色文字 ")]))),[[p(e),{bgColor:"#ffff00",textColor:"#000000"}]]),n((h(),l("div",b,i[2]||(i[2]=[t(" 半透明蓝色背景自动文字颜色 ")]))),[[p(e),{bgColor:"rgba(0, 0, 255, 0.5)",auto:!0}]])]))}}),m=o(F,[["__scopeId","data-v-4c54c62e"]]),D=JSON.parse('{"title":"v-highlight 指令","description":"","frontmatter":{},"headers":[],"relativePath":"directives/highlight.md","filePath":"directives/highlight.md","lastUpdated":1739711636000}'),C={name:"directives/highlight.md"},_=Object.assign(C,{setup(E){const d=[{name:"value",description:"高亮配置，一个有效的颜色指：rgb、rgba、hex、color关键字",type:"string",required:!0}],i=[{name:"bgColor",description:"高亮的背景颜色",type:"string",required:!0},{name:"textColor",description:"高亮时的文字颜色",type:"string",required:!1},{name:"auto",description:"是否自动计算文字颜色，若开启则textColor将被忽略",type:"boolean",required:!1,default:"false"}];return(f,s)=>(h(),l("div",null,[s[0]||(s[0]=c(`<h1 id="v-highlight-指令" tabindex="-1">v-highlight 指令 <a class="header-anchor" href="#v-highlight-指令" aria-label="Permalink to &quot;v-highlight 指令&quot;">​</a></h1><h2 id="介绍" tabindex="-1">介绍 <a class="header-anchor" href="#介绍" aria-label="Permalink to &quot;介绍&quot;">​</a></h2><p><code>v-highlight</code> 指令用于为元素添加背景高亮效果。</p><h2 id="使用方法" tabindex="-1">使用方法 <a class="header-anchor" href="#使用方法" aria-label="Permalink to &quot;使用方法&quot;">​</a></h2><h3 id="基础用法" tabindex="-1">基础用法 <a class="header-anchor" href="#基础用法" aria-label="Permalink to &quot;基础用法&quot;">​</a></h3><p>传入一个有效的高亮颜色值，即可为元素添加背景高亮效果。</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-highlight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&#39;#ff0000&#39;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;红色背景高亮&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h3 id="扩展用法" tabindex="-1">扩展用法 <a class="header-anchor" href="#扩展用法" aria-label="Permalink to &quot;扩展用法&quot;">​</a></h3><ol><li>字符串颜色值，支持以下颜色值类型：</li></ol><ul><li>RGB: 如<code>rgb(255, 0, 0)</code></li><li>RGBA: 如<code>rgba(255, 0, 0, 0.5)</code></li><li>HEX: 如<code>#ff0000</code></li><li>颜色关键字：如<code>red</code>、<code>blue</code>、<code>yellow</code>等</li></ul><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-59Urv" id="tab-XTdcG9W" checked><label data-title="RGB" for="tab-XTdcG9W">RGB</label><input type="radio" name="group-59Urv" id="tab-G5PkVi9"><label data-title="RGBA" for="tab-G5PkVi9">RGBA</label><input type="radio" name="group-59Urv" id="tab-wCebeBL"><label data-title="HEX" for="tab-wCebeBL">HEX</label><input type="radio" name="group-59Urv" id="tab-bc3e76Z"><label data-title="Color Keyword" for="tab-bc3e76Z">Color Keyword</label></div><div class="blocks"><div class="language-vue vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-highlight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&#39;rgb(0, 255, 0)&#39;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;绿色背景高亮&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-highlight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&#39;rgba(0, 0, 255, 0.5)&#39;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;半透明蓝色背景高亮&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-highlight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&#39;#ff0000&#39;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;红色背景高亮&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-highlight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&#39;yellow&#39;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;黄色背景高亮&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div></div></div><ol start="2"><li>对象配置方式</li></ol><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &lt;!-- 字符串类型参数 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-highlight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;&#39;#ff0000&#39;&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;highlight-item&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;简单红色背景&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &lt;!-- 对象类型参数 —— 传入指定文本颜色 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    v-highlight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ bgColor: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#ffff00&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, textColor: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;#000000&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;highlight-item&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    黄色背景黑色文字</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  &lt;!-- 对象类型参数 —— 自动匹配高亮背景下文字颜色 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    v-highlight</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{ bgColor: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;rgba(0, 0, 255, 0.5)&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, auto: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> }</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;highlight-item&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    半透明蓝色背景自动文字颜色</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">template</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div>`,13)),k(m),s[1]||(s[1]=a("h2",{id:"参数说明",tabindex:"-1"},[t("参数说明 "),a("a",{class:"header-anchor",href:"#参数说明","aria-label":'Permalink to "参数说明"'},"​")],-1)),s[2]||(s[2]=a("h3",{id:"字符串类型",tabindex:"-1"},[t("字符串类型 "),a("a",{class:"header-anchor",href:"#字符串类型","aria-label":'Permalink to "字符串类型"'},"​")],-1)),k(r,{data:d}),s[3]||(s[3]=a("h3",{id:"配置对象类型",tabindex:"-1"},[t("配置对象类型 "),a("a",{class:"header-anchor",href:"#配置对象类型","aria-label":'Permalink to "配置对象类型"'},"​")],-1)),k(r,{data:i})]))}});export{D as __pageData,_ as default};
