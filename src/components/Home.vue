<template>
    <div id="home">
        <ul class="sidenav">
            <li><a class="active" href="#home">Home</a></li>
            <li><a href="#/Ordering">Menu</a></li>
            <li><a href="#/cart">Cart</a></li>
        </ul>
        <div class="content">

            <h1> Home Page</h1>
            <button v-on:click="switchLang()">{{ uiLabels.language }}</button>
            <h1>{{ uiLabels.ingredients }} </h1>
            <h2 id="head-line">Crafty Burger AB</h2>
            <button v-on:click="goToOrder()">Order</button>
            <button v-on:click="goToCart()">Cart</button>
        </div>

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

    body {margin: 0;}

    ul.sidenav {
        list-style-type: none;
        margin: 0;
        padding: 0;
        width: 25%;
        background-color: #f1f1f1;
        position: fixed;
        height: 100%;
        overflow: auto;
    }

    ul.sidenav li a {
        display: block;
        color: #000;
        padding: 8px 16px;
        text-decoration: none;
    }

    ul.sidenav li a.active {
        background-color: #4CAF50;
        color: white;
    }

    ul.sidenav li a:hover:not(.active) {
        background-color: #555;
        color: white;
    }

    div.content {
        margin-left: 25%;
        padding: 1px 16px;
        height: 1000px;
    }

    @media screen and (max-width: 900px) {
        ul.sidenav {
            width: 100%;
            height: auto;
            position: relative;
        }

        ul.sidenav li a {
            float: left;
            padding: 15px;
        }

        div.content {margin-left: 0;}
    }

    @media screen and (max-width: 400px) {
        ul.sidenav li a {
            text-align: center;
            float: none;
        }
    }

</style>
