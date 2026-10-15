<script setup>
import Navbar from './components/Navbar.vue'



</script>

<template>
    <Navbar/>
     <main>
    <!-- RouterView 是魔法位置：当前路由匹配到的组件会在这里渲染 -->
    <RouterView/>
    </main>
    
    
</template>

<style scoped>

</style>