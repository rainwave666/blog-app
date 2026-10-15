import { ref , watchEffect } from 'vue'
export function useDarkMode() {
    const saved = localStorage.getItem('blog-theme')
    const isDark = ref(saved === 'dark' )

    function applyTheme(dark) {
        if (dark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('blog-theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('blog-theme', 'light')
        }

    }
    watchEffect(() => {
        applyTheme(isDark.value)
    })
    function toggleDark() {
        isDark.value = !isDark.value
    }
    return {
        isDark,
        toggleDark
    }
}