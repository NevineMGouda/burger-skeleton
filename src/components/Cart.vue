<template>
    <section class="header5 cid-rdLXviWWKe mbr-fullscreen" id="header5-r">
        <div class="container">
            <div class="row justify-content-center">
                <div class="mbr-white col-md-12">
                    <div id="cart" class="container">
                        <!--<div class="button">-->
                            <!--<button class="btn-warning btn-xs" v-on:click="switchLang()">{{ uiLabels.language }}</button>-->
                        <!--</div>-->
                        <h1> {{uiLabels.yourCart}} </h1>
                        <br>
                        <div v-if="Object.keys(orderToCart).length === 0">
                            {{uiLabels.emptyCart}}
                        </div>
                        <div class="container" id="container-table">
                            <div class="row" id="grid-header" v-if="Object.keys(orderToCart).length !== 0">
                                <div class="col align-center"> {{uiLabels.item}} </div>
                                <div class="col align-center"> {{uiLabels.ingredients}} </div>
                                <div class="col align-center"> {{uiLabels.unitPrice}} </div>
                                <div class="col align-center"> {{uiLabels.quantity}} </div>
                                <div class="col align-center"> {{uiLabels.total}} </div>
                                <div class="col align-center"> {{uiLabels.remove}} </div>
                            </div>
                            <div v-for="(order,key) in orderToCart" :key="key" class="row grid-row">
                                <div class="col align-center grid-col">{{key}}</div>
                                <div class="col align-center">{{order.order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}</div>
                                <div class="col align-center">{{order.order.price}}</div>
                                <div class="col align-center">
                                    <button class="btn-warning btn-xs" v-on:click="decrementQuantity(key)"> - </button>
                                    {{order.order.quantity}}
                                    <button class="btn-warning btn-xs" v-on:click="incrementQuantity(key)"> + </button>
                                </div>
                                <div class="col align-center">{{(order.order.price * order.order.quantity)}}</div>
                                <div class="col align-center">
                                    <button class="btn-warning btn-xs" v-on:click="deleteItem(key)">{{uiLabels.remove}}</button>
                                </div>
                            </div>
                        </div>

                        <br>
                        <div v-if="totalPrice != '0'">
                            {{uiLabels.price}}: {{totalPrice}} SEK
                        </div>
                        <div>
                            <button class="btn btn-dark btn-sm" v-on:click="clearCart()"> {{uiLabels.clear}} </button>
                            <button class="btn btn-dark btn-sm" v-on:click="placeOrder()"> {{uiLabels.order}} </button>
                            <br>
                            <br>
                            <br>
                            <br>
                            <h1 v-if="orderNumber !== ''">  {{"your order number is: " + orderNumber}}</h1>
                            <h1>{{ uiLabels.ordersInQueue }}</h1>
                            <div v-for="(order, orderkey) in orders"
                                 v-if="order.status !== 'done'" :key="orderkey">
                                <OrderItem
                                        v-for="(item, key) in order.items"
                                        :order-id="orderkey"
                                        :order="item"
                                        :lang="lang"
                                        :ui-labels="uiLabels"
                                        :key="key">
                                </OrderItem>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mbr-arrow hidden-sm-down" aria-hidden="true">
            <a href="#footer1-q">
                <i class="mbri-down mbr-iconfont"></i>
            </a>
        </div>
    </section>

</template>

<script>
    import OrderItem from '@/components/OrderItem.vue'

    import sharedVueStuff from '@/components/sharedVueStuff.js'
    import sharedVueStuffClient from '@/components/sharedVueStuffClient.js'

    export default {
        name: "Cart",
        mixins: [sharedVueStuff, sharedVueStuffClient],
        components: {
            OrderItem,
        },
        data: function () {
            return{
                orderToCart:{},
                currentItemsCount:0,
                totalPrice:0,
                orderNumber:"",
                selectedItems:[],
            }

        },

        created: function (){
            this.$store.state.socket.on('addItem2', function (data) {
                var itemId =this.getOrderItemNumber();
                this.totalPrice += data.order.price;
                this.orderToCart[itemId]=data;
            }.bind(this));
            this.$store.state.socket.on('orderNumber', function (data) {
                this.orderNumber = data;
            }.bind(this));
        },
        mounted() {
            // Get stored cart when mounting, refreshing. (persisting the data when the page is refreshed)
            if (localStorage.getItem('orderToCart')) {
                this.orderToCart = JSON.parse(localStorage.getItem('orderToCart'));
                this.totalPrice = Number(localStorage.getItem('totalPrice'));
                this.currentItemsCount = Number(localStorage.getItem('currentItemsCount'));
            }
        },
        watch: {
            currentItemsCount: {
                handler() {
                    // Storre the cart to localStorage(browser's session) when the cart is updated.
                    localStorage.setItem('orderToCart', JSON.stringify(this.orderToCart));
                    localStorage.setItem('totalPrice', this.totalPrice);
                    localStorage.setItem('currentItemsCount', this.currentItemsCount);
                },
            },
        },
        methods:{
            placeOrder: function () {
                if(Object.keys(this.orderToCart).length > 0) {
                    this.$store.state.socket.emit('order', {order: this.orderToCart});
                    this.orderToCart = {};
                    this.totalPrice = 0;
                    localStorage.clear();
                }
                else{
                    alert("Please add at least 1 item to your Cart!");
                }
            },
            getOrderItemNumber: function () {
                this.currentItemsCount += 1;
                return this.currentItemsCount;
            },
            getSelectedItems: function(){
                var items,i, item_key;
                items={};
                for (i = 0; i < this.selectedItems.length; i += 1) {
                    item_key = this.selectedItems[i];
                    items[item_key]=this.orderToCart[item_key];
                }
                return items;
            },
            incrementQuantity: function(itemKey){
                if (this.orderToCart[itemKey].order.quantity  < this.orderToCart[itemKey].order.stock){
                    this.orderToCart[itemKey].order.quantity += 1;
                    this.totalPrice += this.orderToCart[itemKey].order.price;
                }
                else{
                    alert("Maximum number of Item "+ itemKey +" reached! Not enough in stock.")
                }
            },
            decrementQuantity: function(itemKey){
                if (this.orderToCart[itemKey].order.quantity > 1)
                    {
                        this.orderToCart[itemKey].order.quantity -= 1;
                        this.totalPrice -= this.orderToCart[itemKey].order.price;
                    }

            },
            deleteItem: function(itemKey){
                this.totalPrice -= this.orderToCart[itemKey].order.price;
                this.currentItemsCount -= 1;
                delete this.orderToCart[itemKey];
            },

            clearCart: function () {
                if (confirm("Are you sure you want to clear your cart?")){
                    this.currentItemsCount =0;
                    this.totalPrice = 0;
                    this.orderToCart={};
                    localStorage.clear();
                }
            }

        }


    }
</script>

<style scoped>

#cart {
    margin:auto;
    padding-top: 1px;
    max-width: 100%;
}
#grid-header{
    color: black;
    font-size: 20px;
    font-weight: bold;
    border: solid black;
    border-width: 4px 4px 2px 4px;
    padding: 4px;
}
#container-table{
    /*border: solid 1px black;*/
}
.grid-row{
    border: solid 2px black;
    /*padding-top: 10px;*/
    /*padding-bottom: 10px;*/
    padding: 30px 0;
    align-content: center;
}
.button{
    padding-top: 40px;
}
.ing-grid{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: auto auto auto auto auto auto;
    text-align: left;

}
</style>
