<template>
    <div>
        <h1> Your Cart items</h1>

        <div v-for="(item) in ordertocart" :key="item">
            {{"Burger " +item.id}} : {{item.data.order}}
        </div>

    </div>
</template>

<script>
    export default {
        name: "Cart",
        data: function () {
            return{
                ordertocart:[]
            }

        },
        created: function (){
            this.$store.state.socket.on('addItem2', function (data) {
                var id =this.ordertocart.length;
                this.ordertocart.push({id ,data});
            }.bind(this));
        },
        mounted() {
            console.log('App mounted/refreshed!');
            // Get stored cart when mounting, refreshing. (persisting the data when the page is refreshed)
            if (localStorage.getItem('ordertocart')) this.ordertocart = JSON.parse(localStorage.getItem('ordertocart'));
        },
        watch: {
            ordertocart: {
                handler() {
                    console.log('ordertocart changed!');
                    // Storre the cart to localStorage(browser's session) when the cart is updated.
                    localStorage.setItem('ordertocart', JSON.stringify(this.ordertocart));
                },
                deep: true,
            },
        }


    }
</script>

<style scoped>

</style>