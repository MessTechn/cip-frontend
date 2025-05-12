<script setup>
import placeholder from "@/assets/sw-horizontal-color-black.svg"
</script>

<template>
  <v-container class="header">
    <div class="logo-title-container">
      <VImg :src="placeholder" class="logo"/>
      <h2 class="title">TODO</h2>
    </div>
  </v-container>
</template>

<style scoped>
.header{
  height: 5rem;
  display: flex;
  justify-content: center;
}

.logo-title-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.logo{
  width: 3rem;
  height: auto;
  position: absolute;
  left: -3rem;
}

</style>
