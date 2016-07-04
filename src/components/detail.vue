<template>
	<div class="detail" v-cloak>{{detail}}</div>
</template>

<script>
	export default({
		data(){
			return {
				detail: 'This is sujunfei'
			}
		}
	})
</script>

<style scoped>
	.detail{
		color: #ccc;
		font-size: 14px;
	}
</style>