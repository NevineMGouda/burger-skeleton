<template>
    <div>
        <!--<button v-on:click="switchLang()">{{ uiLabels.language }}</button>-->
        <!--<h2 id="head-line">Crafty Burger AB</h2>-->
        <!--<button v-on:click="goToOrder()">Order</button>-->
        <!--<button v-on:click="goToCart()">Cart</button>-->
        <section class="cid-qTkA127IK8 mbr-fullscreen mbr-parallax-background" id="header2-1">

            <div class="container align-center">
                <div class="row justify-content-md-center">
                    <div class="mbr-white col-md-10">
                        <h1 class="mbr-section-title mbr-bold pb-3 mbr-fonts-style display-1"><em><a href="" id ="headline">
                            Crafty Burgers AB</a></em></h1>


                        <div class="mbr-section-btn">
                            <a class="btn btn-md btn-primary display-4" href="#/ordering">{{uiLabels.placeOrder}}</a>
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
    </div>
</template>

<script>
    import sharedVueStuff from '@/components/sharedVueStuff.js'
    import sharedVueStuffClient from '@/components/sharedVueStuffClient.js'
    export default {
        name: "Home",
        mixins: [sharedVueStuff, sharedVueStuffClient],
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
#headline{
    color:black;
    background: linear-gradient(#149dcc, grey, transparent);
}
</style>
