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
      .otherwise('/');

    $locationProvider.html5Mode(true);


    /**
     * ENTER STRIPE CLIENT KEY HERE (TODO MAKE IT AUTO FROM MIXMAX YEAH?)
     */
    stripeProvider.setPublishableKey('pk_test_N4fSqOFKTAr6dg7G8ylrl9pQ'); // <----------
    /* END STRIPE CLIENT INSERTION */
  });
