<template>
	<h2 class="vue-greeting">{{ vueGreeting }}</h2>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				vueGreeting: "Hi! I'm Vue :)"
			}
		}
	}
</script>

<style>
	.vue-greeting {
		font-family: 'Roboto', sans-serif;
		font-size: 25px;
		font-weight: 700;
		line-height: 30px;
		color: royalblue;
	}
</style>