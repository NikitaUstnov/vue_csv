<template>
  <section class="main-section">
    <Button @click="download" label="Download CSV`s" />
    <Accordion :multiple="true">
      <AccordionTab
        v-for="({ label, settings }, index) in dataToRender"
        :key="index"
        :header="label"
      >
        <div
          class="table"
          :style="[settings.data.length >= 20 ? { height: '400px' } : {}]"
        >
          <hot-table ref="refs" :settings="settings"></hot-table>
        </div>
      </AccordionTab>
    </Accordion>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { HotTable } from "@handsontable/vue3";
import { registerAllModules } from "handsontable/registry";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Button from "primevue/button";

registerAllModules();

const store = useStore();
const router = useRouter();

const refs = ref([]);

const dataToRender = reactive([]);

const additionalSettings = {
  rowHeaders: true,
  height: "auto",
  autoWrapRow: true,
  autoWrapCol: true,
  manualColumnMove: true,
  dropdownMenu: true,
  manualRowMove: true,
  filters: true,
  contextMenu: true,
  navigableHeaders: true, // New accessibility feature
  tabNavigation: true,
  licenseKey: "non-commercial-and-evaluation",
};

const download = () => {
  const labels = [
    "classes",
    "courses",
    "location",
    "rosters",
    "staffs",
    "students",
  ];

  for (let index = 0; index < refs.value.length; index++) {
    const element = refs.value[index];
    let plugin = element.hotInstance
      ? element.hotInstance.getPlugin("exportFile")
      : element[0].hotInstance.getPlugin("exportFile");
    plugin.downloadFile("csv", {
      bom: false,
      columnDelimiter: ",",
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: "csv",
      filename: labels[index],
      mimeType: "text/csv",
      rowDelimiter: "\r\n",
      rowHeaders: false,
    });
  }
};

onMounted(() => {
  if (!Object.keys(store.state.generatedData).length) {
    router.push("/");
  } else {
    for (const key in store.state.generatedData) {
      dataToRender.push({
        label: key,
        settings: {
          data: store.state.generatedData[key].data,
          colHeaders: store.state.generatedData[key].headers,
          ...additionalSettings,
        },
      });
    }
  }
});
</script>



<style scoped>
.main-section {
  width: 100%;
}

.table {
  overflow: auto;
}
</style>
