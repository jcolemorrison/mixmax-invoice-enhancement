'use strict';

angular.module('invoiceEnhancementApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('create-invoice', {
        url: '/create-invoice?customer',
        templateUrl: 'app/create-invoice/create-invoice.html',
        controller: 'CreateInvoiceCtrl'
      });
  });
