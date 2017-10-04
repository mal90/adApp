var dashboard = new Vue({
  el: '#dashboard',
  methods: {
    goToAdProduct: function () {
      window.location = '../products.html';
    },
    goToAdCheckout: function() {
      window.location = '../checkout.html';
    }
  }
});

// DEPRECATED: remove after angular dependencies are removed
var app = angular.module("adApp", ['ui-notification']);