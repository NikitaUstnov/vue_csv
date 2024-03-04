import { createStore } from "vuex";

export default createStore({
  state: () => ({
    generatedData: {},
    locationName: "",
  }),
  mutations: {
    setGeneratedData: (state, object) => (state.generatedData = object),
  },
  actions: {},
  getters: {},
});
