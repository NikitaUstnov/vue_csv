<template>
  <Header />
  <div class="container">
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </router-view>
  </div>
</template>


<script setup>
import Header from "@/components/Header.vue";
import Form from "@/views/Form.vue";
import Main from "@/views/Main.vue";
</script>


<style scoped>
.container {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 30px;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
