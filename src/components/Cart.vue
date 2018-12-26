<template>
    <div>
        <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
        <h1> Your Cart items</h1>
        <!--TODO: Fix grid below for the cart!-->
        <!--TODO: Show only the grid when the cart is not empty!-->
        <div class="ing-grid">
            <div>Item</div>
            <div>Ingredients</div>
            <div>Unit Price</div>
            <div>Quantity</div>
            <div>Total</div>
            <div>Delete Item</div>
        </div>
        <div v-for="(order,key) in orderToCart" :key="key" class="ing-grid">
            <div>{{key}}</div>
            <div>{{order.order.ingredients.map(item=>item["ingredient_"+ lang]).join(", ") }}</div>
            <div>{{order.order.price}}</div>
            <div>
                <button v-on:click="decrementQuantity(key)"> - </button>
                {{order.order.quantity}}
                <button v-on:click="incrementQuantity(key)"> + </button>
            </div>
            <div>{{(order.order.price * order.order.quantity)}}</div>
            <button v-on:click="deleteItem(key)">Delete</button>
        </div>
        <br>
        <div v-if="totalPrice != '0'">
            Total Price: {{totalPrice}} SEK
        </div>
        <div>
            <button v-on:click="clearCart()">Clear Cart</button>
            <button v-on:click="placeOrder()">Order</button>
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
.ing-grid{
    display: grid;
    grid-gap: 10px;
    grid-template-columns: auto auto auto auto auto auto;
    text-align: left;

}
</style>
