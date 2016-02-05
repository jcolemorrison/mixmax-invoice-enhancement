'use strict';

angular.module('invoiceEnhancementApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('pay-invoice', {
        url: '/pay-invoice?amount&customer&user',
        templateUrl: 'app/pay-invoice/pay-invoice.html',
        controller: 'PayInvoiceCtrl'
      });
  });
