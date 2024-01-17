const stripe = require("stripe")(
  "sk_test_51OFAzLHNYB7xRUttx13GbXadMp57xuuxhCoDWelr1cNz9DJZdg96PevapuTssYvQ5mIdd34UfCyzZIyyt8CppBDd00R3ViuhYz"
);

const createCheckoutSession = async (req, res) => {
  try {
    const { products, customerAddress } = req.body;

    console.log("Products are", products);

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: product.name,
          images: Array.isArray(product.image)
            ? product.image
            : [product.image],
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      billing_address_collection: 'required', // Specify 'required' or 'auto' based on your needs
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
