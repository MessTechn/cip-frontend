<script setup>
import {useClearTasks} from "../services/taskService";

const { mutate: clearTasksMutate } = useClearTasks()

function handleClearTasks() {
  if (!confirm("Are you sure?")){
    return
  }
  clearTasksMutate()
}
</script>

<template>
  <div class="button-container">
    <v-btn @click="handleClearTasks" color="red" class="mr-4">Clear Tasks</v-btn>
  </div>
</template>

<style scoped>
.button-container{
  display: flex;
  flex-direction: column;
  align-items: end;
}
</style>