<!-- 文件路径：src/components/BlogCard.vue -->
<script setup>
import { useFavoriteStore } from '../stores/useFavoriteStore.js';

const props = defineProps({
  id: Number,       // 新增：文章 ID，用于跳转
  title: String,
  summary: String,
  date: String,
  category: String
})

const favoriteStore = useFavoriteStore();

function handleFavorite(e) {
  e.preventDefault(); // 阻止默认的 RouterLink 跳转行为
  favoriteStore.toggleFavorite(props.id);
}


</script>

<template>
  <!-- 整个卡片被 RouterLink 包裹，点击任意位置都能跳转 -->
  <RouterLink :to="{ name: 'post', params: { id } }" class="card-link">
    <div class="card">
      <span class="tag">{{ category }}</span>
      <h3>{{ title }}</h3>
      <p>{{ summary }}</p>
      <div class="card-footer">
        <span class="date">{{ date }}</span>
        <button class="fav-btn" @click="handleFavorite">
          {{ favoriteStore.isFavorite(id) ? '❤️' : '🤍' }}
        </button>
      </div>
      
    </div>
  </RouterLink>
</template>

<style scoped>
.card-link { text-decoration: none; color: inherit; display: block; }
.card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.tag {
  display: inline-block;
  padding: 2px 10px;
  background: #e8f5e9;
  color: #42b883;
  border-radius: 12px;
  font-size: 12px;
}
.card h3 { margin: 10px 0 8px; font-size: 18px; }
.card p { color: #666; font-size: 14px; line-height: 1.6; }
.date { font-size: 12px; color: #999; }

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.fav-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #e74c3c;
  padding: 4px 8px;
}
.fav-btn:hover {
  transform: scale(1.2);
}
</style>