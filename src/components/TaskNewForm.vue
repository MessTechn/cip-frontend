<script setup>
import {ref} from "vue"
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiSend } from '@mdi/js'
import {useCreateTask} from "../services/taskService"

const { mutate: createTaskMutate } = useCreateTask()

const path = ref(mdiSend)
const newTask = ref("")

function handleCreateTask() {
  createTaskMutate({title: newTask.value})
  newTask.value = ""
}
</script>

<template>
  <div>
    <form @submit.prevent="handleCreateTask">
      <div class="form-container">
        <div class="input-container">
          <v-text-field class="new-task-field" variant="outlined" :hide-details="true" v-model="newTask" placeholder="New Task .."></v-text-field>
        </div>
        <div class="icon-container">
          <button>
            <svg-icon class="icon" type="mdi" :path="path"></svg-icon>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container{
  display: flex;
  align-items: center;
  padding: 3%;
}

.input-container {
  flex-grow: 1;
  margin-right: 1rem;
}

.icon-container{
  display: flex;
  align-items: center;
}

.icon{
  color: #8685e7;
  width: auto;
  height: 40px;
}
</style>