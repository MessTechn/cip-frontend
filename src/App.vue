<script setup>
import { RouterView } from 'vue-router'
import {VueQueryDevtools} from "@tanstack/vue-query-devtools";
</script>

<template>
  <RouterView />
  <VueQueryDevtools :initial-is-open="true" />
</template>
