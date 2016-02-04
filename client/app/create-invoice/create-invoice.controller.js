'use strict';

angular.module('invoiceEnhancementApp')
  .controller('CreateInvoiceCtrl', function ($scope) {
    var Ctrl = $scope.Ctrl = {};

    Ctrl.showAmountFormatError = false;

    Ctrl.createInvoice = function () {
      console.log('called');
      if (!angular.isNumber(Ctrl.invoicedAmount)) {
        console.log('error');
        Ctrl.showAmountFormatError = true;
        return false;
      } else {
        console.log('success');
        Mixmax.done({
          invoicedPerson: Ctrl.invoicedPerson,
          invoicedAmount: Ctrl.invoicedAmount
        });
      }
    };
  });
