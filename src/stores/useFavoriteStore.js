import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', () => {
    const favoriteIds = ref([])
      // 从 localStorage 恢复收藏列表
    const saved = localStorage.getItem('blog-favorites')
    if (saved) {
         favoriteIds.value = JSON.parse(saved)
    }
    //统计收藏数量
    const favoriteCount = computed(() =>  favoriteIds.value.length)
    // 判断某篇文章是否已收藏
    function isFavorite(articleId) {
        return favoriteIds.value.includes(articleId)
    }

    function toggleFavorite(articleId) {
      const index = favoriteIds.value.indexOf(articleId)
      if (index === -1) {
        favoriteIds.value.push(articleId)  // 添加收藏
      } else {
        favoriteIds.value.splice(index, 1) // 移除收藏
      }
    
        // 同步到 localStorage（持久化保存）
        localStorage.setItem('blog-favorites', JSON.stringify(favoriteIds.value))
    
    }
    return {
        favoriteIds,
        favoriteCount,
        isFavorite,
        toggleFavorite
    }
})
