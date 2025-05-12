<script setup>
import TaskList from "../components/TaskList.vue"
import TaskNewForm from "../components/TaskNewForm.vue"
import Header from "../components/Header.vue"
</script>

<template>
  <main class="d-flex flex-column pa-2 ga-4 app">
    <Header />
    <TaskNewForm />
    <TaskList />
  </main>
</template>

<style>
  html, body {
    height: 100%;
    background-color: #121212;
  }

  #app {
    background-color: #121212;
    height: 100%;
    color: white;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    gap: 0;
    font-family: "Verdana";
  }

  @media (min-width: 960px) {
    #app {
      width: 50%;
    }
  }
</style>