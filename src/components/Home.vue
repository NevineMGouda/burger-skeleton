<template>
    <div>
        <h1> Home Page</h1>
        <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
        <h2 id="head-line">Crafty Burger AB</h2>
        <button v-on:click="goToOrder()">Order</button>
        <button v-on:click="goToCart()">Cart</button>

    </div>
</template>

<script>
    import sharedVueStuff from '@/components/sharedVueStuff.js'
    export default {
        name: "Home",
        mixins: [sharedVueStuff],
        components: {
        },
        data: function () {
            return{
            }

        },

        created: function (){
            this.reloadPage();

        },
        mounted() {
            this.reloadPage();

        },
        methods:{
            goToOrder: function(){
                location.href = "#/ordering";
            },
            goToCart: function(){
                location.href = "#/cart";
            },
        }
        ,
        reloadPage: function(){
            if (localStorage.getItem('reloaded')) {
                // The page was just reloaded. Clear the value from local storage
                // so that it will reload the next time this page is visited.
                localStorage.removeItem('reloaded');
            } else {
                // Set a flag so that we know not to reload the page twice.
                localStorage.setItem('reloaded', '1');
                location.reload();
            }
        }


    }
</script>

<style scoped>
    #head-line {
        padding: 0px 150px 40px;
        font-size: 24pt;
        text-align: center;
    }

</style>
