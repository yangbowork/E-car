<template>
  <div id="main" class="main-page">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts" setup>
  onMounted(() => {
    const main = document.querySelector('#main');
    (main as any).style.height = window.innerHeight + 'px';
  });
</script>

<style scoped lang="scss">
  .main-page {
    overflow: scroll;
  }
</style>
