'use strict';

// *** Importing main tools for development  ***
import Vue from "vue";
import Vuelidate from "vuelidate";

// *** Importing Vue-components ***
import registrationForm from "./registrationForm.vue";


// *** Main Vue development configuration ***
Vue.config.productionTip = false;
Vue.config.devtools = true;


// *** Connecting tools ***
Vue.use(Vuelidate);


// *** Vue instance ***
new Vue({
  render: h => h(registrationForm)
}).$mount('#registrationForm');
