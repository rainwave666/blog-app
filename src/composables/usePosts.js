import { ref , computed , onMounted} from 'vue'

export function usePosts() {
    const articles = ref([])
    const isLoading = ref(true)
    const error = ref(null)
    const activeCategory = ref('全部')
    const keyword = ref('')

    const categories = computed(() => {
     const cats = articles.value.map(a => a.category)
    return ['全部', ...new Set(cats)]
    })

    const filteredArticles = computed(() => {
     let result = articles.value


    if (activeCategory.value !== '全部') {
    result = result.filter(a => a.category === activeCategory.value)
    }
    if(keyword.value.trim()) {
    const kw = keyword.value.trim().toLowerCase()
    result = result.filter(a => a.title.toLowerCase().includes(kw) || a.summary.toLowerCase().includes(kw))
    }
    return result
    })

    function handleCategoryChange(cat) {
  activeCategory.value = cat
    }

     function getArticleById(id) {
    return articles.value.find(a => a.id === id)
  }

  async function fetchPosts() {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch('/posts.json')
    if (!response.ok) {
      throw new Error(`加载失败:HTTP ${response.status}`)
    }
    const data = await response.json()
    articles.value = data
  } catch (error) {
    error.value = error.message
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  fetchPosts()
})
    return {
        articles,
        isLoading,
        error,
        activeCategory,
        keyword,
        categories,
        filteredArticles,
        handleCategoryChange,
        getArticleById,
        fetchPosts
        
    }
    
}
