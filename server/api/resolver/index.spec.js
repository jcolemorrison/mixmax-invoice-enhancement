'use strict';

var proxyquire = require('proxyquire').noPreserveCache();
var request = require('supertest');

var resolverCtrlStub = {
  index: 'resolverCtrl.index',
  create: 'resolverCtrl.create'
};

var routerStub = {
  get: sinon.spy(),
  post: sinon.spy()
};

// require the index with our stubbed out modules
var resolverIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './resolver.controller': resolverCtrlStub
});

describe('Resolver API Router:', function() {

  it('should return an express router instance', function() {
    expect(resolverIndex).to.equal(routerStub);
  });

  describe('GET /api/resolver', function() {

    it('should route to resolver.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'resolverCtrl.index')
        ).to.be.calledOnce;
    });

  });
});
