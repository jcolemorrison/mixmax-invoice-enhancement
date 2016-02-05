'use strict';

describe('Controller: CreateInvoiceCtrl', function () {

  // load the controller's module
  beforeEach(module('invoiceEnhancementApp'));

  var CreateInvoiceCtrl, scope, location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $location) {
    scope = $rootScope.$new();
    location = $location;
    location.search('user', 'bob@example.com');
    CreateInvoiceCtrl = $controller('CreateInvoiceCtrl', {
      $scope: scope
    });
  }));

  describe('getCurrentUser()', function () {
    it('should grab the current email user from the window parameters', function () {
      scope.Ctrl.getCurrentUser();
      expect(scope.Ctrl.currentUser).to.equal('bob@example.com');
    });
  });

  describe('Ctrl.createInvoice()', function () {
    it('should show a message indicating that amount should be a number if submitted as text and return false', function () {
      scope.Ctrl.invoicedPerson = 'john@example.com';
      scope.Ctrl.invoicedAmount = 'Hello';
      scope.Ctrl.invoicingUser = 'bob@example.com';
      var result = scope.Ctrl.createInvoice();
      expect(scope.Ctrl.showAmountFormatError).to.be.true;
      expect(result).to.be.false;
    });

    it('should call to Mixmax with invoice options after successfully building an invoice', function () {
      var MixmaxSpy = sinon.stub(Mixmax, "done");
      scope.Ctrl.invoicedPerson = 'john@example.com';
      scope.Ctrl.invoicedAmount = 10.00;
      scope.Ctrl.invoicingUser = 'bob@example.com';
      scope.Ctrl.createInvoice();
      expect(MixmaxSpy).to.have.been
        .calledWith({ invoicingUser: 'bob@example.com', invoicedAmount: 10.00, invoicedPerson: "john@example.com" });
    });
  })
});
