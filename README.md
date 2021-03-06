# invoice-enhancement

This is an integration for MixMax that allows users to invoice via Stripe directly from their email.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)

### First... you need a stripe account

1. Go to stripe.com and sign up for an account

2. Login to your dashboard -> click on "Account" up top

3. Navigate to "API Keys" and grab your `Test Publishable Key` and paste it in `/client/app/app.js`

4. Grab your `Test Secret Key` and paste it in `/server/api/pay-invoice/pay-invoice.controller.js`

*Yes this isn't ideal... it would be awesome if you could do this from the MIXMAX dashboard instead*

### Setup with Mixmax

1. Go to Mixmax dashboard -> integrations

2. Click `Add Enhancement`

3. Name it `invoice`

4. Tooltip whatever you'd like

5. Editor URL: `http://localhost:9000/create-invoice`

5. Resolver URL: `http://localhost:9000/api/resolver`

### Steps to Enhance!

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

4. Open `Chrome` in insecure mode as documented here http://sdk.mixmax.com/docs/chrome-insecure-content-https-request-blocked-when-developing-locally

5. Create and email and select `Invoice` from the enhancements button

6. Enter in the email and amount and click enter and send your email!

7. Receive the email as the person - open it up and pay!

    - Use `4242424242424242` as the card number (it's a test card)
    - any month number (i.e. `09`)
    - any year after 2016 (i.e. .... 2016)
    - any cvc combo (i.e. 123)

### Other

- Use `gulp test`, `gulp test:client`, `gulp test:server` to run tests

