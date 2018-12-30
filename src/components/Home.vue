<template>
    <div>
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

        },
        methods:{
            goToOrder: function(){
                location.href = "#/ordering";
            },
            goToCart: function(){
                location.href = "#/cart";
            },
            reloadPage: function(){
                if (localStorage.getItem('reloaded')) {
                    localStorage.removeItem('reloaded');
                } else {
                    localStorage.setItem('reloaded', '1');
                    location.reload();
                }
            }
        },

    }
</script>

<style scoped>
    #head-line {
        padding: 0px 150px 40px;
        font-size: 24pt;
        text-align: center;
    }

</style>
