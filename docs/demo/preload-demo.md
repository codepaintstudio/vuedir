# 预加载演示页面

这是一个用于演示 v-preload 指令预加载功能的页面。当你通过带有 v-preload 指令的链接访问到这个页面时,说明预加载功能工作正常。

## 图片预加载演示

下面这些图片使用了预加载功能,当链接进入视口时会自动开始加载:

<div class="image-grid">
  <div class="image-item">
    <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a" alt="预加载图片1">
    <p>可爱的小狗</p>
  </div>
  <div class="image-item">
    <img src="https://images.unsplash.com/photo-1439853949127-fa647821eba0" alt="预加载图片2">
    <p>海洋风光</p>
  </div>
  <div class="image-item">
    <img src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b" alt="预加载图片3">
    <p>城市夜景</p>
  </div>
</div>

## 功能说明

1. 当链接进入视口时,会自动预加载此页面
2. 点击链接跳转时可以立即看到页面内容
3. 图片资源也会被预加载,提升用户体验
4. 支持跨域资源的预加载

## 预加载的优势

- 提前加载资源,减少用户等待时间
- 改善页面切换的流畅度
- 优化大图片加载的体验
- 智能判断资源类型,自动选择最佳预加载策略

## 返回

[返回预加载指令文档](/directives/preload)

<style>
.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.image-item {
  text-align: center;
}

.image-item img {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.image-item p {
  margin-top: 8px;
  color: #666;
}
</style>
