'use strict';

describe('Controller: CreateInvoiceCtrl', function () {

  // load the controller's module
  beforeEach(module('invoiceEnhancementApp'));

  var CreateInvoiceCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateInvoiceCtrl = $controller('CreateInvoiceCtrl', {
      $scope: scope
    });
  }));


  describe('Ctrl.createInvoice()', function () {
    it('should show a message indicating that amount should be a number if submitted as text and return false', function () {
      scope.Ctrl.invoicedPerson = 'john@example.com';
      scope.Ctrl.invoicedAmount = 'Hello';
      var result = scope.Ctrl.createInvoice();
      expect(scope.Ctrl.showAmountFormatError).to.be.true;
      expect(result).to.be.false;
    });

    it('should call to Mixmax with invoice options after successfully building an invoice', function () {
      var MixmaxSpy = sinon.stub(Mixmax, "done");
      scope.Ctrl.invoicedPerson = 'john@example.com';
      scope.Ctrl.invoicedAmount = 10.00;
      scope.Ctrl.createInvoice();
      expect(MixmaxSpy).to.have.been
        .calledWith({ invoicedAmount: 10.00, invoicedPerson: "john@example.com" });
    });
  })
});
