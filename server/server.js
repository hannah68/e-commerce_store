const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const stripe = require("stripe")("sk_test_51MgQ1OHzy2wESnBK0salokKDjXAW2cGogd6YAoJcnke7saqAVDFR4N8hG2xlZm9ZhWO6oClgLGeQpJ9lMfd4blnX00nXCkszoz");

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(cors({origin: true, credentials: true}));

const DOMAIN = "http://localhost:4242";

app.post('/checkout', async (req, res, next) => {
    try {
        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {allowed_countries: ['US', 'CA']},
            shipping_options: [
                {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    fixed_amount: {amount: 0, currency: 'gbp'},
                    display_name: 'Free shipping',
                    delivery_estimate: {
                    minimum: {unit: 'business_day', value: 5},
                    maximum: {unit: 'business_day', value: 7},
                    },
                },
                },
            ],
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: item.name,
                            images: [item.product]
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quantity
                }
            }),
            mode: "payment",
            success_url: `${DOMAIN}/success.html`,
            cancel_url: `${DOMAIN}/cancel.html`,
          });
          res.status(200).json(session);
    } catch (error) {
        next(error);
    }
});


app.listen(4242, () => console.log('Running on port 4242'));