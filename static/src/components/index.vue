<template>
	<div id="blog_list">
		<div class="list" v-for="list in lists" v-cloak>{{list.value}}</div>
	</div>
</template>

<script>
	export default({
		data(){
			return {
				lists:[{
					value:'first blog'
				},{
					value:'second blog'
				},{
					value:'last blog'
				}]
			}
		} 	
	})
</script>

<style scoped>
	#blog_list{
		width: 50%;
		margin: 0 auto;
	}

	.list{
		width: 90%;
		margin:5px auto;
		font-size: 16px;
		line-height: 1.2;
		color: #32df76;
	}
</style>