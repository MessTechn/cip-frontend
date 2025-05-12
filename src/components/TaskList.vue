<script setup>
import {computed} from "vue"
import TaskItem from "./TaskItem.vue"
import todoIllustration from "@/assets/todo-list-illustration.webp"
import TasksClearButton from "./TasksClearButton.vue"
import {useFetchDoneTasks, useFetchOpenTasks} from "../services/taskService"

const { data: openTasks} = useFetchOpenTasks()
const { data: doneTasks} = useFetchDoneTasks()

const openTasksAmount = computed(() => {
  if (openTasks.value === undefined) {
    return 0
  }
  return Object.keys(openTasks.value).length > 0 ? Object.keys(openTasks.value).length : 0
})

const doneTasksAmount = computed(() => {
  if (doneTasks.value === undefined) {
    return 0
  }
  return Object.keys(doneTasks.value).length > 0 ? Object.keys(doneTasks.value).length : 0
})
</script>

<template>
  <div>
    <TasksClearButton v-if="openTasksAmount > 0 || doneTasksAmount > 0"/>
    <div v-if="openTasksAmount < 1 && doneTasksAmount < 1" class="logo-container">
      <VImg :src="todoIllustration" class="todo-logo"/>
      <h2>What do you want to do today?</h2>
    </div>
    <p class="ml-3" v-if="openTasksAmount > 0">Open</p>
    <TaskItem
        v-for="task in openTasks"
        :key="task.id"
        :id="task.id"
        :title="task.title"
        :completed="task.completed"
        :createdAt="task.created_at"
    />
    <p class="ml-3" v-if="doneTasksAmount > 0">Done</p>
    <TaskItem
        v-for="task in doneTasks"
        :key="task.id"
        :id="task.id"
        :title="task.title"
        :completed="task.completed"
        :createdAt="task.created_at"
    />
  </div>
</template>

<style>
.todo-logo{
  width: 15rem;
  height: auto;
  filter: saturate(0.7);
}

.logo-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>