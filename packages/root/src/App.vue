<template>
  <div class="container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
// import { validLayoutPath } from "../single-spa.setup"

// const route = useRoute()
// const showLayout = computed(() => validLayoutPath(route.path))
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
