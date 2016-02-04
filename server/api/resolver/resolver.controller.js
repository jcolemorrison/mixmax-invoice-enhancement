/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/resolver              ->  index
 */

'use strict';

function index(req, res) {
  res.json([]);
}

function create(req, res) {
  // var data = JSON.parse(req.body.params);
  // console.log(data);
  if (!req.body || !req.body.invoicedAmount || !req.body.invoicedPerson) {
    res.status(400).json('Invalid params');
    return;
  }

  if (typeof req.body.invoicedAmount !== 'number') {
    res.status(400).json('Invoiced amount must be a number');
    return;
  }

  var htmlString = '' +
  '<div style="background:#f7f7f7; padding: .5em;">' +
    '<h5>Invoice Amount: $' + req.body.invoicedAmount + '</h5>' + 
    '<a href="http://localhost:9000/pay-invoice?amount=' + req.body.invoicedAmount + '&customer=' + req.body.invoicedPerson + '">Click here to pay your invoice »</a>' +
  '</div>';
  res.json({
    body: htmlString
  });
}

// Gets a list of Resolvers
export { index, create };