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

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
