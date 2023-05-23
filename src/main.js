import { createApp } from "vue";

import App from "./App.vue";

// Import our custom CSS
import "./scss/styles.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./components/Home.vue";
// import Originales from './components/gestor/Originales.vue'
import Propio from "./components/gestor/Propio.vue";
import PropioAnadir from "./components/gestor/PropioAnadir.vue";
import Tienda from "./components/gestor/TiendasMaster.vue";
import TiendaAnadir from "./components/gestor/TiendasAnadir.vue";
// import Online from "./components/gestor/TiendasOnlineMaster.vue";
// import OnlineAnadir from "./components/gestor/TiendasOnlineAnadir.vue";
import Bienvenido from "./components/Bienvenido.vue";
// import OriginalesMaster from "./components/gestor/OriginalesMaster.vue";
// import OriginalesAnadir from "./components/gestor/OriginalesAnadir.vue";
import BlancasMaster from "./components/gestor/BlancasMaster.vue";
import BlancasAnadir from "./components/gestor/BlancasAnadir.vue";

import PrimeVue from "primevue/config";
import { createPinia } from "pinia";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/fisica", component: Tienda, name: "fisicaMaster" },
  { path: "/fisica/add", component: TiendaAnadir, name: "tiendaAnadir" },
  // { path: "/online", component: Online, name: "onlineMaster" },
  // { path: "/online/add", component: OnlineAnadir, name: "onlineAnadir" },
  // { path: "/originales", component: OriginalesMaster, name: "originalesMaster" },
  // { path: "/originales/add", component: OriginalesAnadir, name: "originalesAnadir" },
  { path: "/propio", component: Propio, name: "propio" },
  { path: "/propio/add", component: PropioAnadir, name: "propioAnadir" },
  { path: "/bienvenido", component: Bienvenido, name: "Bienvenido" },
  { path: "/blancas", component: BlancasMaster, name: "blancasMaster" },
  { path: "/blancas/add", component: BlancasAnadir, name: "blancasAnadir" },

  //   { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue);

app.mount("#app");
