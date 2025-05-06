<template>
  <div class="flex flex-col size-full overflow-hidden">
    <div class="h-[500px] bg-green-500 flex-shrink-0">123321</div>
    <div class="flex-1 size-full overflow-y-auto bg-slate-500">
      <p v-for="i in 100" :key="i">111</p>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>