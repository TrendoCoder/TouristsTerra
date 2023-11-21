// const stripe = require("stripe")("sk_test_51MGLBKIr2GtQtYrgGdvP4lRaA8Wd6UVYqJoWYvJxE5JHHRLzCNLueoenlo30JqJ54N6zsOWSOFi2eMG86oRkCAk000RlLrnPMW");

// const createCheckoutSession = async (req, res) => {
//   try {
//     const { product } = req.body;

//     console.log(product);

//     const lineItems = {
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: product.name,
//           images: [product.image],

//         },
//         unit_amount: product.price * 100,
//       },
//       quantity: quantity,
//     };

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [lineItems],
//       mode: "payment",
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = {
//   createCheckoutSession,
// };

const stripe = require("stripe")(
  "sk_test_51MGLBKIr2GtQtYrgGdvP4lRaA8Wd6UVYqJoWYvJxE5JHHRLzCNLueoenlo30JqJ54N6zsOWSOFi2eMG86oRkCAk000RlLrnPMW"
);

const createCheckoutSession = async (req, res) => {
  try {
    const { product } = req.body;

    console.log(product);

    const lineItems = {
      price_data: {
        currency: "pkr",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItems],
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCheckoutSession,
};
