'use strict';

angular.module('invoiceEnhancementApp', [
  'invoiceEnhancementApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngMessages',
  'ui.router',
  'angular-stripe'
])
  .config(function($urlRouterProvider, $locationProvider, stripeProvider) {
    $urlRouterProvider
      .otherwise('/create-invoice');

    $locationProvider.html5Mode(true);


    /**
     * ENTER STRIPE CLIENT KEY HERE (TODO MAKE IT AUTO FROM MIXMAX YEAH?)
     */
    stripeProvider.setPublishableKey('YOUR TEST KEY HERE'); // <----------
    /* END STRIPE CLIENT INSERTION */
  });
