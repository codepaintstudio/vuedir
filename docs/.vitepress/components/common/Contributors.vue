<script setup>
import { vConfetti } from '@cp-vuedir/core'
const contributors = [
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/120795714?v=4',
    contributions: 157,
    login: 'minorcell',
    html_url: 'https://github.com/minorcell'
  },
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/127094690?v=4',
    contributions: 39,
    login: '512465',
    html_url: 'https://github.com/512465'
  },
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/90372299?v=4',
    contributions: 25,
    login: 'neverbiasu',
    html_url: 'https://github.com/neverbiasu'
  },
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/120694702?v=4',
    contributions: 20,
    login: 'hot777zzz',
    html_url: 'https://github.com/hot777zzz'
  },
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/121385437?v=4',
    contributions: 17,
    login: 'KindSeven',
    html_url: 'https://github.com/KindSeven'
  },
  {
    avatar_url: 'https://avatars.githubusercontent.com/in/29110?v=4',
    contributions: 8,
    login: 'dependabot[bot]',
    html_url: 'https://github.com/apps/dependabot'
  },
  {
    avatar_url: 'https://avatars.githubusercontent.com/u/164345197?v=4',
    contributions: 6,
    login: 'lozinz',
    html_url: 'https://github.com/lozinz'
  }
]

const sortedContributors = contributors.sort((a, b) => b.contributions - a.contributions)
</script>

<template>
  <div class="contributors-container" v-confetti>
    <h2>项目贡献者</h2>
    <div class="contributors-list">
      <div v-for="contributor in sortedContributors" :key="contributor.login" class="contributor-card">
        <a :href="contributor.html_url" :title="contributor.login" target="_blank">
          <img :src="contributor.avatar_url" :alt="contributor.login" class="avatar" />
        </a>
        <div class="info">
          <a :href="contributor.html_url" target="_blank" class="name">{{ contributor.login }}</a>
          <span class="contributions">{{ contributor.contributions }} 次贡献</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contributors-container {
  text-align: center;
  margin: 2rem auto;
  padding: 1.5rem;
  max-width: 800px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: var(--vp-c-text-3);
}

.contributors-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.2rem;
}

.contributor-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  width: 140px;
}

.contributor-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #ddd;
  transition: border-color 0.3s;
}

.avatar:hover {
  border-color: #007bff;
}

.info {
  margin-top: 0.5rem;
  text-align: center;
}

.name {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s;
}

.name:hover {
  color: #007bff;
}

.contributions {
  font-size: 0.9rem;
}
</style>
