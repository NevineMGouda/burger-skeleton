<template>
    <div>
        <h1> Your Cart items</h1>
        <div v-for="(order,key) in orderToCart" :key="key">
            {{"Burger " +key}} : {{order}}
        </div>
        <div v-if="totalPrice != '0'">
            Total Price: {{totalPrice}} SEK
        </div>
        <div>
            <button v-on:click="placeOrder()">Order</button>
            <button v-on:click="clearCart()">Clear Cart</button>
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
</template>

<script>
    import OrderItem from '@/components/OrderItem.vue'

    import sharedVueStuff from '@/components/sharedVueStuff.js'
    export default {
        name: "Cart",
        mixins: [sharedVueStuff],
        components: {
            OrderItem,
        },
        data: function () {
            return{
                orderToCart:{},
                currentItemsCount:0,
                totalPrice:0,
                orderNumber:""
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
                if(this.totalPrice>0) {
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
            clearCart: function () {
                this.currentItemsCount =0;
                this.totalPrice = 0;
                this.orderToCart={};
                localStorage.clear();
            }

        }


    }
</script>

<style scoped>

</style>