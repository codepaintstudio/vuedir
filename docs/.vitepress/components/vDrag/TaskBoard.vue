<template>
  <div class="task-board-container">
    <h3>任务看板（综合示例）</h3>
    <div class="board-columns">
      <!-- 待办任务列 -->
      <div class="board-column">
        <div class="column-header">待办任务</div>
        <ul class="task-list">
          <li
            v-for="(task, index) in todoTasks"
            :key="task.id"
            class="task-card"
            v-drag="{
              isList: true,
              handle: '.task-handle',
              onSort: (event) => handleSort('todo', event)
            }"
          >
            <div class="task-handle">
              <svg class="handle-icon" viewBox="0 0 24 24">
                <path d="M3,15h18v-2H3V15z M3,19h18v-2H3V19z M3,11h18V9H3V11z M3,5v2h18V5H3z" />
              </svg>
            </div>
            <div class="task-content">
              <div class="task-title">{{ task.title }}</div>
              <div class="task-description">{{ task.description }}</div>
              <div class="task-meta">
                <span class="priority" :class="'priority-' + task.priority">{{ priorityLabels[task.priority] }}</span>
                <span class="task-id">#{{ task.id }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 进行中任务列 -->
      <div class="board-column">
        <div class="column-header">进行中</div>
        <ul class="task-list">
          <li
            v-for="(task, index) in inProgressTasks"
            :key="task.id"
            class="task-card"
            v-drag="{
              isList: true,
              handle: '.task-handle',
              onSort: (event) => handleSort('inProgress', event)
            }"
          >
            <div class="task-handle">
              <svg class="handle-icon" viewBox="0 0 24 24">
                <path d="M3,15h18v-2H3V15z M3,19h18v-2H3V19z M3,11h18V9H3V11z M3,5v2h18V5H3z" />
              </svg>
            </div>
            <div class="task-content">
              <div class="task-title">{{ task.title }}</div>
              <div class="task-description">{{ task.description }}</div>
              <div class="task-meta">
                <span class="priority" :class="'priority-' + task.priority">{{ priorityLabels[task.priority] }}</span>
                <span class="task-id">#{{ task.id }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- 已完成任务列 -->
      <div class="board-column">
        <div class="column-header">已完成</div>
        <ul class="task-list">
          <li
            v-for="(task, index) in doneTasks"
            :key="task.id"
            class="task-card"
            v-drag="{
              isList: true,
              handle: '.task-handle',
              onSort: (event) => handleSort('done', event)
            }"
          >
            <div class="task-handle">
              <svg class="handle-icon" viewBox="0 0 24 24">
                <path d="M3,15h18v-2H3V15z M3,19h18v-2H3V19z M3,11h18V9H3V11z M3,5v2h18V5H3z" />
              </svg>
            </div>
            <div class="task-content">
              <div class="task-title">{{ task.title }}</div>
              <div class="task-description">{{ task.description }}</div>
              <div class="task-meta">
                <span class="priority" :class="'priority-' + task.priority">{{ priorityLabels[task.priority] }}</span>
                <span class="task-id">#{{ task.id }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="feature-description">
      <h4>功能说明</h4>
      <ul>
        <li>通过左侧拖拽把手可以重新排序每一列中的任务卡片</li>
        <li>仅点击卡片左侧带有线条图标的区域才能拖动卡片</li>
        <li>每列内的任务可以独立排序</li>
        <li>实现了重排时的视觉反馈和平滑动画</li>
      </ul>
      <p>此示例展示了 v-drag 指令的列表排序和拖拽把手功能的结合使用。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineOptions } from 'vue'

interface Task {
  id: number
  title: string
  description: string
  priority: 'high' | 'medium' | 'low'
}

const priorityLabels = {
  high: '高',
  medium: '中',
  low: '低'
}

const todoTasks = ref<Task[]>([
  { id: 101, title: '设计登录页面', description: '为新应用设计登录界面和注册表单', priority: 'high' },
  { id: 102, title: '实现数据验证', description: '对所有用户输入添加表单验证功能', priority: 'medium' },
  { id: 103, title: '编写单元测试', description: '为认证模块编写单元测试', priority: 'low' }
])

const inProgressTasks = ref<Task[]>([
  { id: 201, title: '重构API模块', description: '使用新的请求库重构API请求模块', priority: 'medium' },
  { id: 202, title: '优化图片加载', description: '添加图片懒加载和渐进式加载功能', priority: 'high' }
])

const doneTasks = ref<Task[]>([
  { id: 301, title: '修复导航栏bug', description: '解决移动端导航栏折叠问题', priority: 'high' },
  { id: 302, title: '更新依赖包', description: '更新所有npm包到最新版本', priority: 'low' },
  { id: 303, title: '添加深色模式', description: '实现应用的深色模式切换功能', priority: 'medium' }
])

function handleSort(columnType: 'todo' | 'inProgress' | 'done', event: { oldIndex: number; newIndex: number }) {
  let targetList: Task[] = []
  if (columnType === 'todo') {
    targetList = todoTasks.value
  } else if (columnType === 'inProgress') {
    targetList = inProgressTasks.value
  } else if (columnType === 'done') {
    targetList = doneTasks.value
  }

  const { oldIndex, newIndex } = event
  if (
    oldIndex !== newIndex &&
    oldIndex >= 0 &&
    newIndex >= 0 &&
    oldIndex < targetList.length &&
    newIndex <= targetList.length
  ) {
    const [movedItem] = targetList.splice(oldIndex, 1)
    targetList.splice(newIndex, 0, movedItem)
  }
}

defineOptions({
  name: 'TaskBoard'
})
</script>

<style scoped>
.task-board-container {
  padding: 20px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  transition:
    background-color 0.3s,
    border-color 0.3s;
}

h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}

.board-columns {
  display: flex;
  gap: 20px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.board-column {
  flex: 1;
  background-color: var(--vp-c-bg);
  border-radius: 6px;
  min-width: 250px;
  max-width: 330px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px var(--vp-c-divider);
  border: 1px solid var(--vp-c-divider);
}

.column-header {
  padding: 12px 15px;
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  border-radius: 6px 6px 0 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.task-list {
  list-style-type: none;
  padding: 10px;
  margin: 0;
  flex-grow: 1;
  min-height: 200px;
  position: relative;
}

.task-card {
  background-color: var(--vp-c-bg);
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px var(--vp-c-divider);
  display: flex;
  overflow: hidden;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
  border: 1px solid var(--vp-c-divider);
}

.task-card[data-dragging='true'] {
  z-index: 100;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  opacity: 0.9;
  background-color: var(--vp-c-brand-dimm);
  border-color: var(--vp-c-brand);
}

:deep(.v-drag-placeholder) {
  opacity: 0.7;
  border: 2px dashed var(--vp-c-brand) !important;
  background-color: var(--vp-c-brand-dimm) !important;
  box-shadow: none !important;
}

.task-handle {
  width: 40px;
  background-color: var(--vp-c-bg-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  border-right: 1px solid var(--vp-c-divider);
}

.handle-icon {
  width: 24px;
  height: 24px;
  fill: var(--vp-c-text-3);
}

.task-content {
  padding: 12px;
  flex-grow: 1;
}

.task-title {
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 6px;
  color: var(--vp-c-text-1);
}

.task-description {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 10px;
  line-height: 1.4;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.priority {
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 3px;
  font-weight: 500;
}

.priority-high {
  background-color: var(--vp-c-danger-dimm);
  color: var(--vp-c-danger);
}

.priority-medium {
  background-color: var(--vp-c-warning-dimm);
  color: var(--vp-c-warning);
}

.priority-low {
  background-color: var(--vp-c-info-dimm);
  color: var(--vp-c-info);
}

.task-id {
  font-size: 12px;
  color: var(--vp-c-text-3);
}

.feature-description {
  background-color: var(--vp-c-info-dimm);
  border-radius: 6px;
  padding: 15px;
  border-left: 4px solid var(--vp-c-info);
  margin-top: 15px;
}

.feature-description h4 {
  margin-top: 0;
  font-size: 16px;
  color: var(--vp-c-info);
}

.feature-description ul {
  margin-bottom: 10px;
}

.feature-description li {
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.feature-description p {
  margin-bottom: 0;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.v-drag-placeholder {
  opacity: 0.5;
  background-color: #e0f2fe !important;
  border: 1px dashed #0ea5e9 !important;
}
</style>
