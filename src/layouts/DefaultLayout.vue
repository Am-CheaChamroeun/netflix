<template>
  <div class="min-h-screen bg-zinc-950 text-white">
    <Navbar />
    <main class="pt-14">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
</script>
