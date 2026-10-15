<script setup>
const props = defineProps({
    categories: Array,
    activeCategory: String
})

const emit = defineEmits(['update-category'])
function selectCategory(cat) {
    emit('update-category', cat)
}

</script>

<template>
<div class="filter-bar">
    <button v-for="cat in categories" :key="cat" :class="{active:activeCategory === cat}" @click="selectCategory(cat)">
        {{ cat }}
    </button>


</div>


</template> 

<style scoped>

</style>
    