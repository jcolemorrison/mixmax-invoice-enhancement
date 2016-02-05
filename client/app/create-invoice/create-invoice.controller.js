'use strict';

angular.module('invoiceEnhancementApp')
  .controller('CreateInvoiceCtrl', function ($scope, $location) {
    var Ctrl = $scope.Ctrl = {};

    Ctrl.showAmountFormatError = false;

    Ctrl.getCurrentUser = () => {
      Ctrl.currentUser = $location.search().user;
    };

    Ctrl.createInvoice = function () {
      if (isNaN(parseFloat(Ctrl.invoicedAmount))) {
        Ctrl.showAmountFormatError = true;
        return false;
      } else {
        Mixmax.done({
          invoicedPerson: Ctrl.invoicedPerson,
          invoicedAmount: parseFloat(Ctrl.invoicedAmount),
          invoicingUser: Ctrl.currentUser
        });
      }
    };

    Ctrl.getCurrentUser();
  });
