'use strict';

// Stuff that is used both in the ordering system and in the kitchen
var sharedVueStuff = {
  data: function () {
    return {
      orders: {},
      ingredients: {},
    }
  },

  created: function () {
    this.$store.state.socket.emit('pageLoaded');
    this.$store.state.socket.on('initialize', function (data) {
      this.orders = data.orders;
      this.ingredients = data.ingredients;
    }.bind(this));
    this.$store.state.socket.on('currentQueue', function (data) {
      this.orders = data.orders;
      if (typeof data.ingredients !== 'undefined') {
        this.ingredients = data.ingredients;
      }
    }.bind(this));


  },
  mounted() {
  },
  methods: {
    getMenu: function(){
        document.getElementById("homeTitle").innerHTML = this.uiLabels.home;
        document.getElementById("menuTitle").innerHTML = this.uiLabels.menu;
        document.getElementById("cartTitle").innerHTML = this.uiLabels.cartLabel;
        document.getElementById("languageTitle").innerHTML = this.uiLabels.languageLabel;
        document.getElementById("languageSelected").innerHTML = this.uiLabels.language;
        document.getElementById("languageButton").onclick = this.switchLang;
      },
  }
};

export default sharedVueStuff;