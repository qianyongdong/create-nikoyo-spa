<template>
  <Teleport to=".container" :disabled="isTeleportDisabled">
    <section class="main">
      <router-view />
    </section>
  </Teleport>
</template>

<script setup lang="ts">
const isTeleportDisabled = import.meta.env.MODE === 'development'
</script>

<style scoped>
.main {
  margin-top: var(--navbar-height, 0px);
  margin-left: var(--navbar-width, 0px);
  height: calc(100vh - var(--navbar-height, 0px));
  width: calc(100vw - var(--navbar-width, 0px));
}
</style>
