'use strict';

(function() {

class MainController {

  constructor($state) {
    // nothing but redirect for now
    $state.go('create-invoice');
  }
}

angular.module('invoiceEnhancementApp')
  .controller('MainController', MainController);

})();
