'use strict';

var Vue = require('../../node_modules/vue/dist/vue.js');

var hello = require('../components/hello.vue');
var goodbye = require('../components/goodbye.vue');

var app = new Vue ({
	el: '#app',
	components: {
		hello: hello,
		goodbye: goodbye
	}
});