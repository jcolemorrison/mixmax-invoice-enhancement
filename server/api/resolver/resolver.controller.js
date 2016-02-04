/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/resolver              ->  index
 */

'use strict';

function index(req, res) {
  res.json([]);
}

function create(req, res) {

  var data = req.body.params ? JSON.parse(req.body.params) : false;

  if (!data || !data.invoicedAmount || !data.invoicedPerson) {
    res.status(400).json('Invalid params');
    return;
  }

  if (typeof data.invoicedAmount !== 'number') {
    res.status(400).json('Invoiced amount must be a number');
    return;
  }

  var htmlString = '' +
  '<div style="background:#f7f7f7; padding: .5em;">' +
    '<h5>Invoice Amount: $' + data.invoicedAmount + '</h5>' + 
    '<a href="http://localhost:9000/pay-invoice?amount=' + data.invoicedAmount + '&customer=' + data.invoicedPerson + '">Click here to pay your invoice »</a>' +
  '</div>';
  res.json({
    body: htmlString
  });
}

// Gets a list of Resolvers
export { index, create };