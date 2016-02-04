'use strict';

angular.module('invoiceEnhancementApp')
  .controller('CreateInvoiceCtrl', function ($scope) {
    var Ctrl = $scope.Ctrl = {};

    Ctrl.showAmountFormatError = false;

    Ctrl.createInvoice = function () {
      if (!angular.isNumber(Ctrl.invoicedAmount)) {
        Ctrl.showAmountFormatError = true;
        return false;
      } else {
        Mixmax.done({
          invoicedPerson: Ctrl.invoicedPerson,
          invoicedAmount: Ctrl.invoicedAmount
        });
      }
    };
  });
