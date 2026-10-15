<!-- 文件路径：src/views/HomeView.vue -->
<script setup>

import BlogCard from '../components/BlogCard.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import { usePosts } from '../composables/usePosts.js'

// 文章数据
const {
  articles,
  isLoading,
  error,
  keyword,
  categories,
  activeCategory,
  filteredArticles,
  handleCategoryChange
} = usePosts()


</script>

<template>
  <div class="home">
    <!-- 搜索框 -->
    <div class="search-bar">
      <input type="text" v-model="keyword" placeholder="搜索文章标题或摘要..." class="search-input"/>
      <span v-if="keyword" class="clear-btn" @click="keyword=''">✕</span>
    </div>

    <p v-if="isLoading" class="status-msg">加载中...</p>
    <p v-else-if="error" class="error">{{ error }}
      <button @click="fetchPosts">重新加载</button>
    </p>
    <p v-else-if="articles.length === 0" class="empty-tip">暂无文章</p>
    分类筛选组件
    <CategoryFilter :categories="categories" :active-category="activeCategory"
      @update-category="handleCategoryChange" />

    <!-- 空状态 -->
    <p v-if="filteredArticles.length === 0" class="empty-tip">
      该分类下暂无文章
    </p>

    <!-- 文章卡片列表 -->
    <div v-else class="article-grid">
      <BlogCard v-for="article in filteredArticles" :key="article.id" :id="article.id" :title="article.title" :summary="article.summary"
        :date="article.date" :category="article.category" />
    </div>
  </div>
</template>

<style scoped>
.home { max-width: 960px; margin: 0 auto; padding: 20px; }

.search-bar {
  position: relative;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #42b883;
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #999;
  font-size: 18px;
}

.article-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;
}
</style>