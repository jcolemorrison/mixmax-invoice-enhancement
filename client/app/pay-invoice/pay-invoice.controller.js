'use strict';

angular.module('invoiceEnhancementApp')
  .controller('PayInvoiceCtrl', function ($scope, $location, $http, stripe) {
    var Ctrl = $scope.Ctrl = {},
        Card = $scope.Card = {};

    Ctrl.setupViewParams = () => {
      Ctrl.amount = $location.search().amount;
      Ctrl.customer = $location.search().customer;
      Ctrl.user = $location.search().user;
    };

    Ctrl.submitPayment = (response) => {
      if (response.error) {
        Ctrl.stripeErrorMessage = response.error.message;
      } else {
        Card.token = response.id;
        var request = {
          card: Card,
          invoice: {
            amount: Ctrl.amount,
            customer: Ctrl.customer,
            user: Ctrl.user
          }
        };
        $http.post('/api/pay-invoice', request)
          .then(function (success) {
            Ctrl.paymentSuccessMessage = true;
            Ctrl.submitting = false;
            Ctrl.paid = true;
          },
          function (error) {
            Ctrl.paymentErrorMessage = true;
          });
      }
    };

    Ctrl.chargeCard = () => {
      if (!Card.number || !Card.exp_month || !Card.exp_year || !Card.cvc) {
        Ctrl.cardFieldsErrorMessage = true;
        return false;
      }
      Ctrl.submitting = true;
      return stripe.card.createToken(Card).then(Ctrl.submitPayment);
    };

    Ctrl.setupViewParams();
  });
