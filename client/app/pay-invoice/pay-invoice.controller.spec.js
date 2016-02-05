'use strict';

describe('Controller: PayInvoiceCtrl', function () {

  // load the controller's module
  beforeEach(module('invoiceEnhancementApp'));
  beforeEach(module('stateMock'));

  var PayInvoiceCtrl, scope, state, location, stripeStubCard, $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $state, $location, _$httpBackend_) {
    scope = $rootScope.$new();
    state = $state;
    $httpBackend = _$httpBackend_;
    location = $location;
    location.search('amount', 10.00);
    location.search('customer', 'john@example.com');
    location.search('user', 'bob@example.com');
    PayInvoiceCtrl = $controller('PayInvoiceCtrl', {
      $scope: scope
    });
  }));

  describe('Ctrl.setupViewParams()', function () {
    it('should grab all route parameters and inject them into scope', function () {
      scope.Ctrl.setupViewParams();
      expect(scope.Ctrl.amount).to.equal(10.00);
      expect(scope.Ctrl.customer).to.equal('john@example.com');
      expect(scope.Ctrl.user).to.equal('bob@example.com');
    });
  });

  describe('Ctrl.chargeCard()', function () {
    it('should show an error message if any credit card fields aren\'t filled in' , function () {
      var check = scope.Ctrl.chargeCard();
      expect(scope.Ctrl.cardFieldsErrorMessage).to.be.true;
      expect(check).to.be.false;
    });
  });

  describe('Ctrl.submitPayment()', function () {

    it('should show the appropriate error if stripe fails', function () {
      scope.Ctrl.submitPayment({ error: { message: 'an error message'} });
      expect(scope.Ctrl.stripeErrorMessage).to.equal('an error message');
    });

    it('should attach the token to the card scope if stripe is successful', function () {
      scope.Ctrl.submitPayment({ id: 'sometoken' });
      expect(scope.Card.token).to.equal('sometoken');
    });

    it('should show the successful payment message when payment verifies', function () {
      var request;
      $httpBackend.expectPOST('/api/pay-invoice', request).respond(200, true);
      scope.Card = {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2017,
        cvc: 123
      };
      scope.Ctrl.submitPayment(200, { id: 'sometoken' });
      request = {
        card: scope.Card,
        invoice: {
          amount: 10.00,
          customer: 'john@example.com',
          user: 'bob@example.com'
        }
      }
      $httpBackend.flush();
      expect(scope.Ctrl.paymentSuccessMessage).to.be.true;

    });

    it('should show the error payment message when payment fails', function () {
      
      var request;
      $httpBackend.expectPOST('/api/pay-invoice', request).respond(400, false);
      scope.Card = {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2017,
        cvc: 123
      };
      scope.Ctrl.submitPayment(200, { id: 'sometoken' });
      request = {
        card: scope.Card,
        invoice: {
          amount: 10.00,
          customer: 'john@example.com',
          user: 'bob@example.com'
        }
      }
      $httpBackend.flush();
      expect(scope.Ctrl.paymentErrorMessage).to.be.true;

    });
  })

});
