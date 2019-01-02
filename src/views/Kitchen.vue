<template>
<div id="orders">
  <br>
  <button v-on:click="kitchenSwitchLang()">{{uiLabels.language}}</button>
  <br>
  <br>
  <h1>{{ uiLabels.ordersInQueue }}</h1>
  <br>
  <div class="container-fluid">
    <div class="row grid-header">
      <div class="col-md-2 align-center"> {{uiLabels.orderNumber}} </div>
      <div class="col align-center"> {{uiLabels.eatInOrTakeAway}} </div>
      <div class="col align-center"> {{uiLabels.ingredients}} </div>
      <div class="col-3 align-center"> {{uiLabels.status}}  </div>
    </div>
    <div >
    <OrderItemToPrepare
      v-for="(order, key) in orders"
      v-if="order.status !== 'done'"
      v-on:done="markDone(key)"
      :order-id="key"
      :order="order.items"
      :ui-labels="uiLabels"
      :eat-in="order.eatIn"
      :lang="lang"
      :key="key" >
    </OrderItemToPrepare>
    </div>
  </div>
  <br>
  <h1>{{ uiLabels.ordersFinished }}</h1>
  <br>
  <div class="container-fluid">
    <div class="row grid-header">
      <div class="col-md-3 align-center"> {{uiLabels.orderNumber}} </div>
      <div class="col align-center"> {{uiLabels.eatInOrTakeAway}} </div>
      <div class="col align-center"> {{uiLabels.ingredients}} </div>
    </div>
    <div v-for="(order, orderkey) in orders"
      v-if="order.status === 'done'" :key="orderkey" >
      <OrderItem
        v-for="(item, key) in order.items"
        :order-id="orderkey"
        :order="item"
        :lang="lang"
        :ui-labels="uiLabels"
        :eat-in="order.eatIn"
        :key="key">
      </OrderItem>
    </div>
  </div>
</div>	
</template>
<script>
import OrderItem from '@/components/OrderItem.vue'
import OrderItemToPrepare from '@/components/OrderItemToPrepare.vue'

//import methods and data that are shared between ordering and kitchen views
import sharedVueStuff from '@/components/sharedVueStuff.js'

export default {
  name: 'Ordering',
  components: {
    OrderItem,
    OrderItemToPrepare
  },
  mixins: [sharedVueStuff], // include stuff that is used in both 
                            //the ordering system and the kitchen
  data: function(){
    return {
      chosenIngredients: [],
      price: 0,
      uiLabels: {},
      lang: 'sv'
    }
  },
    created: function(){
      this.hideNav();
        this.$store.state.socket.emit('kitchenpageLoaded', this.lang);
        this.$store.state.socket.on('kitchenLabels', function (data) {
            this.uiLabels = data.uiLabels;
        }.bind(this));
        this.$store.state.socket.on('kitchenSwitchLang', function (data) {
            this.uiLabels=data;
        }.bind(this));
    },
  methods: {
    markDone: function (orderid) {
      this.$store.state.socket.emit("orderDone", orderid);
    },
    hideNav: function(){
        var x = document.getElementById("menu1-7");
        var y = document.getElementById("footer1-q");
        x.style.display = "none";
        y.style.display = "none";
    },
    kitchenSwitchLang: function () {
        if (this.lang === "en") {
            this.lang = "sv";
        } else {
            this.lang = "en";
        }
        console.log(this.lang);
        this.$store.state.socket.emit('kitchenSwitchLang', this.lang);
    }
  }
}
</script>
<style scoped>
	#orders {
    font-size:20pt;
  }

  h1 {
    text-transform: uppercase;
    font-size: 1.4em;
  }
    .grid-header{
      color: black;
      font-size: 25px;
      font-weight: bold;
      border: solid black;
      border-width: 4px 4px 2px 4px;
      padding: 4px;
    }
    .grid-row{
      border: solid 2px black;
      /*padding-top: 10px;*/
      /*padding-bottom: 10px;*/
      padding: 30px 0;
      align-content: center;
    }
</style>