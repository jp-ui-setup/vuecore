import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createPinia } from 'pinia'
import { registerPlugins } from './plugins'
// import { plugins } from 'prismjs'
const pinia = createPinia();
const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);
app.use(registerPlugins)
app.use(pinia)
app.use(vuetify)
app.use(router)
app.mount('#app')
