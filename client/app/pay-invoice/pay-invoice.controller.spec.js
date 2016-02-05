'use strict';

describe('Controller: PayInvoiceCtrl', function () {

  // load the controller's module
  beforeEach(module('invoiceEnhancementApp'));

  var PayInvoiceCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PayInvoiceCtrl = $controller('PayInvoiceCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
