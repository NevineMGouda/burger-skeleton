<template>
  <!-- Note in this component that it is using another component -->
<div>
  <OrderItem
    v-for="(item, key) in order"
    :ui-labels="uiLabels"
    :lang="lang"
    :key="key"
    :order-id="orderId"
    :order="item">
  </OrderItem>
  <button v-on:click="orderDone">
    {{uiLabels.ready}}
  </button>
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
    lang: String
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
	
</style>