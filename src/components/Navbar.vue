<!-- 文件路径：src/components/NavBar.vue -->
<script setup>
import { useDarkMode } from '../composables/useDarkMode.js'
import { useFavoriteStore } from '../stores/useFavoriteStore.js'
const { isDark , toggleDark } = useDarkMode()
const favoriteStore = useFavoriteStore()
</script>

<template>
  <header class="navbar">
    <a href="/" class="logo">RUNOOB Blog</a>
    <nav>
      <a href="/">首页</a>
      <button @click="toggleDark">{{ isDark ? '☀️' : '🌙' }}</button>
      <span class="fav-badge" v-if="favoriteStore.favoriteCount > 0">
        收藏数: {{ favoriteStore.favoriteCount }}</span>   
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.logo {
  font-size: 22px;
  font-weight: bold;
  color: #42b883;
  text-decoration: none;
}

nav a {
  margin-left: 24px;
  text-decoration: none;
  color: #333;
  font-size: 15px;
}

nav a:hover {
  color: #42b883;
}
.fav-badge {
  background: #e74c3c;
  color: #fff;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 13px;
}
</style>