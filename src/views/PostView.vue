<!-- 文件路径：src/views/PostView.vue -->
<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { usePosts } from '../composables/usePosts.js'
import { useFavoriteStore } from '../stores/useFavoriteStore.js'

const favoriteStore = useFavoriteStore()

const route = useRoute()
const id = Number(route.params.id)

const { isLoading, error , getArticleById } = usePosts()

const article = computed(() => getArticleById(id))


</script>

<template>
  <div class="post-view">
    <p v-if="isLoading" >加载中...</p>
    <p v-else-if="error" >加载失败: {{ error }}</p>
    <div v-else-if="!article">
      <h2>文章不存在</h2>
      <RouterLink to="/">返回首页</RouterLink>
    </div>

    <!-- 文章存在，展示完整内容 -->
    <article v-else>
      <span class="category-tag">{{ article.category }}</span>
      <h1>{{ article.title }}</h1>
      <button class="fav-btn" @click="favoriteStore.toggleFavorite(article.id)">
        {{ favoriteStore.isFavorite(article.id) ? '❤️' : '🤍' }}
      </button>
      <time>{{ article.date }}</time>
      <!-- v-html 渲染 HTML 字符串 -->
      <div class="content" v-html="article.content"></div>
      <RouterLink to="/" class="back-link">← 返回首页</RouterLink>
    </article>
  </div>
</template>

<style scoped>
.post-view {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 20px;
}

.category-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #e8f5e9;
  color: #42b883;
  border-radius: 12px;
  font-size: 13px;
  margin-bottom: 12px;
}

h1 {
  font-size: 32px;
  margin-bottom: 12px;
  line-height: 1.4;
}

time {
  display: block;
  color: #999;
  font-size: 14px;
  margin-bottom: 30px;
}

.content {
  line-height: 1.8;
  font-size: 16px;
  color: #333;
}

.content :deep(h2) {
  margin: 24px 0 12px;
  font-size: 22px;
}

.content :deep(p) {
  margin-bottom: 12px;
}

.back-link {
  display: inline-block;
  margin-top: 40px;
  color: #42b883;
  text-decoration: none;
}

.not-found {
  text-align: center;
  padding: 60px 0;
}
</style>
