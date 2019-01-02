<template>
	<div class="row grid-row">
		<!--{{lang}}-->
		<div class="col-md-3 align-center ">{{orderId}}</div>
		<div>{{order.type}}</div>
		<div class="col-md-4 align-center ">
			<span v-if="eatIn === 1 ">{{uiLabels.eatIn}}</span> <span v-if="eatIn === 0 ">{{uiLabels.takeAway}}</span>
		</div>
		<div class="col-md-5 align-center ">
			{{order.order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}
		</div>
	</div>
</template>
<script>
export default {
  name: 'OrderItem',
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String,
    eatIn: Number
  }
}
</script>
<style scoped>
</style>