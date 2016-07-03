<template>
	<div class="login">
		{{login}}
	</div>
</template>

<script>
	export default({
		data(){
			return {
				login: 'This is login page'
			}
		}
	})
</script>

<style scoped>
	.login{
		color: #232433;
	}
</style>