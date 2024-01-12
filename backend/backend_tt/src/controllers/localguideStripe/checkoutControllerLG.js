const stripe = require("stripe")(
  "sk_test_51OFAzLHNYB7xRUttx13GbXadMp57xuuxhCoDWelr1cNz9DJZdg96PevapuTssYvQ5mIdd34UfCyzZIyyt8CppBDd00R3ViuhYz"
);

const createCheckout_1Session = async (req, res) => {
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
      quantity: product.days, // Move days outside price_data
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItems],
      mode: "payment",
      success_url: "http://localhost:3000/successlg",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCheckout_1Session,
};
