<template>
  <!-- Note in this component that it is using another component -->
<div class ="row grid-row">
  <div class="col-md-2 align-center ">{{orderId}}</div>
  <div class="col-md-3 align-center ">
    <span v-if="eatIn === 1 ">{{uiLabels.eatIn}}</span> <span v-if="eatIn === 0 ">{{uiLabels.takeAway}}</span>
  </div>
  <div class="col-md-3 align-center ingr-item">
    <OrderItem
      v-for="(item, key) in order"
      :ui-labels="uiLabels"
      :lang="lang"
      :key="key"
      :order-id="orderId"
      :eat-in="eatIn"
      :order="item" class="row align-center">

    </OrderItem>
  </div>
  <div class="col-md-4 align-center donebutton">
    <button v-on:click="orderDone">
      {{uiLabels.ready}}
    </button>
  </div>

</div>
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'

export default {
  name: 'OrderItemToPrepare',
  components: { OrderItem },
  props: {
    uiLabels: Object,
    order: Object,
    orderId: String,
    lang: String,
    eatIn: Number
  },
  methods: {
    orderDone: function () {
      // sending 'done' message to parent component or view so that it
      // can catch it with v-on:done in the component declaration
      this.$emit('done');
    },
    cancelOrder: function () {
      // not implemented
    }
  }
}
</script>
<style scoped>
  .donebutton{
    padding-left: 6%;
  }
  .ingr-item{
    padding-left:10%;
  }
	
</style>