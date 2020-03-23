<template>
  <div id="app" class="min-h-screen w-screen flex flex-col px-4 lg:pt-16 lg:px-16">
    <router-view />
  </div>
</template>

<script>
import "./assets/css/tailwind.css";

export default {
  name: "app"
};
</script>

<style lang="scss">
.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
</style>
