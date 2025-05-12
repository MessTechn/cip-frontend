<script setup>
import {computed, ref} from "vue"
import SvgIcon from "@jamescoyle/vue-icon"
import {mdiCheckCircle, mdiCircleOutline, mdiTrashCanOutline} from "@mdi/js"
import {useDeleteTask, useUpdateTask} from "../services/taskService"

const props = defineProps({
  id: Number,
  title: String,
  completed: [Boolean, Number],
  createdAt: String
})

const { mutate: updateTaskMutate} = useUpdateTask()
const { mutate: deleteTaskMutate} = useDeleteTask()

const checkedIcon = ref(mdiCheckCircle)
const uncheckedIcon = ref(mdiCircleOutline)
const deleteIcon = ref(mdiTrashCanOutline)

const formattedCreatedAt = computed(() => {
  if (props.createdAt === null) {
    return null
  }
  const utcDate = new Date(props.createdAt)
  const day = String(utcDate.getDate()).padStart(2, '0')
  const month = String(utcDate.getMonth() + 1).padStart(2, '0')
  const year = utcDate.getFullYear()
  const hours = String(utcDate.getHours()).padStart(2, '0')
  const minutes = String(utcDate.getMinutes()).padStart(2, '0')

  return `${day}.${month}.${year} ${hours}:${minutes} Uhr`
})

function handleUpdateTask() {
  updateTaskMutate({id: props.id, data: {completed: !props.completed}})
}
function handleDeleteTask() {
  deleteTaskMutate(props.id)
}
</script>

<template>
  <v-card class="card">
    <v-row class="card-row">
      <v-col cols="2" class="icon-col">
        <svg-icon @click="handleUpdateTask" v-if="completed" class="icon icon-checked" type="mdi" :path="checkedIcon"></svg-icon>
        <svg-icon @click="handleUpdateTask" v-else class="icon" type="mdi" :path="uncheckedIcon"></svg-icon>
      </v-col>
      <v-col cols="8" class="text-container">
        <p :class="{ 'strikethrough': props.completed }">{{ title }}</p>
        <p>{{formattedCreatedAt}}</p>
      </v-col>
      <v-col cols="2" class="button-container">
        <button @click="handleDeleteTask" class="delete-button">
          <svg-icon class="icon" type="mdi" :path="deleteIcon"></svg-icon>
        </button>
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.card{
  color: white;
  background-color: #363636;
  margin: 3%;
  height: 100%;
  padding: 3%;
}

.card-row {
  display: flex;
  align-items: center;
  height: 100%;
}

.icon-col {
  display: flex;
  align-items: center;
  justify-content: start;
  height: 100%;
}

.icon-checked{
  color: #8685e7;;
}

.text-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.button-container {
  display: flex;
  align-items: center;
  justify-content: end;
  height: 100%;
}

.delete-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon{
  height: 2rem;
}

.strikethrough {
  text-decoration: line-through;
}
</style>