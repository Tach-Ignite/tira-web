# Payment

The RA allows for payment. Currently, the following payment providers are supported:

- Stripe

## Stripe

Stripe is a powerful online payment platform that is also developer friendly.

To test locally with stripe, you should install the Stripe CLI. You can find instructions [here](https://stripe.com/docs/stripe-cli). The CLI allows you both detect incoming webhooks on your local machine as well as send test events to your webhook endpoint.

## Stripe Environment variables

Stripe Environment variables can obtained from Stripe Dashboard > Developers Page

- `STRIPE_PUBLIC_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

### Webhook Listener & Local Https

The Stripe CLI will throw an error that the CA is untrusted because we are using local https with a self-signed certificate. When using the `listen` command, make sure to use the `--skip-verify` flag:

```bash
stripe listen --forward-to https://localhost:3001/api/stripe/webhook --skip-verify
```

Be sure to set the `STRIPE_WEBHOOK_SECRET` environment variable to the secret key provided by this command.
