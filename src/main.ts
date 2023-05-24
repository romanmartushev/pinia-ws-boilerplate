import { createApp } from "vue";
import App from "./App.vue";
import BoilerplatePlugin from "./plugins/BoilerplatePlugin";
import { createPinia } from "pinia";
import UndoRedoPlugin from "@/plugins/UndeRedoPlugin";

const pinia = createPinia();

pinia.use(UndoRedoPlugin);

// Init App
createApp(App).use(BoilerplatePlugin).use(pinia).mount("#app");
