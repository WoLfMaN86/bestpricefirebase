import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//Aqui haremos las distintas importanciones de las diferentes pestañas que hayamos creado
//(POR EJEMPLO) import About from '@/components/practica-rounting/About.vue'


//Todo esto lo sacamos de la practica de partidos
import { createRouter, createWebHashHistory } from 'vue-router';



import Home from '@/components/Home.vue';

import Originales  from '@/components/gestor/Originales.vue'


import Propio from '@/components/gestor/Propio.vue'
import Tienda from '@/components/gestor/Tienda.vue'
// import About from '@/components/About.vue'






import 'primevue/resources/themes/saga-blue/theme.css'  //theme
import 'primevue/resources/primevue.min.css'            //core css
import 'primeicons/primeicons.css'                      //icons
import PrimeVue from 'primevue/config'
import MultiSelect from 'primevue/multiselect';

// Import our custom CSS
import './scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { createPinia } from "pinia";
// /* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core'
// /* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


//Aqui pondremos todas las routas que hayamos creado

// const routes = [
//     { path: '/', component: Home, name: 'home' },
//     { path: '/partidos', component: ListadoPartidos, name: 'partidos' },
//     { path: '/about', component: About, name: 'about' },
//     { path: '/participante/:identificador', component: ParticipanteInfo, name: 'participante' },
//     {
//       path: '/nested',
//       component: NestedRoute,
//       children: [
//         { path: 'home', component: Home, name: 'nested-home' },
//         { path: 'partidos', component: ListadoPartidos, name: 'nested-partidos' },
//         { path: 'about', component: About, name: 'nested-about' },
//       ],
//     },
//     { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
//   ]
  
// const router = createRouter({
//     history: createWebHashHistory(),
//     routes
//   })

const routes = [
    { path: '/', 
    component: Home, 
    name: 'home' },
    {
      path: '/tienda' ,
      component: Tienda,
      name: 'tienda'
    },
   
    // { path: '/about', 
    // component: About, 
    // name: 'about' },
    {
      path: '/originales',
      component: Originales,
      name: 'originales'
    },
    {
      path: '/originales',
      component: Originales,
      name: 'originales'
    },
    {
      path: '/blanca',
      component: Blanca,
      name: 'blanca'
    }
  
    
    
    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })


  const pinia = createPinia();

// import { useOriginalesPinia } from '@/components/stores/originalesPinia';
const app = createApp(App)



app.use(pinia)

app.use(router)

app.use(PrimeVue)
app.use(MultiSelect)



// pinia.use(useOriginalesPinia);
// pinia.use(originalesStore);

// /* add font awesome icon component */
// app.component('font-awesome-icon', FontAwesomeIcon)

app.mount("#app")