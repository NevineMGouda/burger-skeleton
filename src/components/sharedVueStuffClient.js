'use strict';
// import { EventBus } from './event-bus.js';

// Stuff that is used both in the ordering system and in the kitchen
var sharedVueStuffClient = {
    data: function () {
        return {
            newOrderItem:{}
        }
    },
  computed: {
    uiLabels: {get: function(){
            return this.$store.state.uiLabels;
        },
        set: function(uiLabels){
            this.$store.commit('setUiLabels', uiLabels);
        }
    },
    lang: {get: function(){
      return this.$store.state.lang;
      },
      set: function(lang){
        this.$store.commit('switchLang', lang);
      }
    }
  },

  created: function () {
      if (localStorage.getItem('lang')){
          this.$store.state.socket.emit('pageLoaded', JSON.parse(localStorage.getItem('lang')));
      }
      else{
          this.$store.state.socket.emit('pageLoaded');
      }
    this.$store.state.socket.on('initialize', function (data) {
      this.$store.commit('setUiLabels', data.uiLabels);
    }.bind(this));
    this.$store.state.socket.on('switchLang', function (data) {
      this.$store.commit('setUiLabels', data);
      this.getMenu();
    }.bind(this));
    this.getMenu();
      this.$store.state.socket.on('addItem2', function (data) {
          this.$store.state.socket.emit('addItem2', data);
      }.bind(this));

  },
  mounted() {
      // Get stored cart when mounting, refreshing. (persisting the data when the page is refreshed)
      if (localStorage.getItem('lang')) {
        this.lang = JSON.parse(localStorage.getItem('lang'));
      }
      if (localStorage.getItem('uiLabels')) {
          this.uiLabels = JSON.parse(localStorage.getItem('uiLabels'));
      }
      if (localStorage.getItem('newOrderItem')) {
          this.newOrderItem = JSON.parse(localStorage.getItem('newOrderItem'));
      }
      this.getMenu();
  },
  watch: {
      lang: {
          handler() {
              localStorage.setItem('lang', JSON.stringify(this.lang));

          },
      },
      uiLabels: {
          handler() {
              localStorage.setItem('uiLabels', JSON.stringify(this.uiLabels));
          },
      },
      newOrderItem:{
          handler() {
              localStorage.setItem('newOrderItem', JSON.stringify(this.newOrderItem));

          },
      }


  },
  methods: {
    switchLang: function () {
      if (this.lang === "en") {
        this.lang = "sv";
      } else {
        this.lang = "en";
      }
      this.$store.state.socket.emit('switchLang', this.lang);

    },
    newOrder: function(orderItem){
        this.newOrderItem = {order: orderItem.order};
    },
  }
};

export default sharedVueStuffClient;