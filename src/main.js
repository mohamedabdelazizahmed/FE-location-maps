// import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
console.log(components);
const vuetify = createVuetify({
    components,
    directives,
})

console.log(vuetify);
const app = createApp(App)
app.use(VueGoogleMaps, {
    load: {
        key: 'YOUR_API_KEY_COMES_HERE',
        // language: 'de',
    },
})
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')






