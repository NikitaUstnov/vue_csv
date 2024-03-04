<template>
  <div class="form-container">
    <FileUpload
      class="file"
      mode="basic"
      accept=".xlsx"
      :maxFileSize="1000000"
      @select="upload"
      chooseLabel="Browse xlsx file"
    />

    <hr />

    <FloatLabel>
      <InputText id="locname" v-model="store.state.locationName" />
      <label for="locname">Location name</label>
    </FloatLabel>

    <Button
      :loading="loading"
      :disabled="!file || loading"
      label="Generate"
      @click="createData"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import FileUpload from "primevue/fileupload";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

import { generate } from "@/utils/generate.js";

const store = useStore();
const router = useRouter();
const toast = useToast();

const file = ref(null);
const loading = ref(false);

const upload = ({ files }) => {
  file.value = files[0];
};

const createData = async () => {
  loading.value = true;

  const {
    error,
    message = "",
    data,
  } = await generate(file.value, store.state.locationName);

  if (error) {
    toast.error(message);
    loading.value = false;
    return;
  }

  store.commit("setGeneratedData", data);

  loading.value = false;
  file.value = null;
  router.push("/main");
};
</script>

<style scoped lang="scss">
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  padding: 20px;

  border-radius: 20px;

  box-shadow: -1px 12px 21px -1px rgba(16, 185, 129, 0.8);

  & .file {
    width: 100% !important;
    max-width: 500px !important;
    min-width: 300px !important;
  }
  & hr {
    width: 100%;
  }
}
</style>