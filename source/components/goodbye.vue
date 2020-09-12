<template>
	<p class="vue-goodbye">{{ vueGoodbye }}</p>
</template>

<script>
	module.exports = {
		data: function () {
			return {
				vueGoodbye: "Bye! I'm Vue :)"
			}
		}
	}
</script>

<style>
	.vue-goodbye {
		font-family: 'Roboto', sans-serif;
		font-size: 25px;
		font-weight: 700;
		line-height: 30px;
		color: red;
	}
</style>