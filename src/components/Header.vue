<template>
  <header>
    <Button
      v-if="route.path !== '/'"
      icon="pi pi-angle-left"
      text
      raised
      rounded
      aria-label="Filter"
      @click="backToForm"
    />
    <div v-else></div>
    <h4>CSV READER</h4>
    <div></div>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import Button from "primevue/button";

const store = useStore();
const route = useRoute();
const router = useRouter();

const backToForm = () => {
  store.commit("setGeneratedData", {});
  router.push("/");
};
</script>

<style scoped>
header {
  width: 100%;

  padding: 30px;
  /* height: 40px; */

  display: flex;
  align-items: center;
  justify-content: space-between;
}

h4 {
  margin: 0;
  height: 40px;
}
</style>