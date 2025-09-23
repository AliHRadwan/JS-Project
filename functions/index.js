const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
const STRIPE_RK = "stripe restricted key, or secret key";

exports.createPaymentIntent =
  onRequest({ region: "europe-central2", secrets: ["STRIPE_SECRET"] },
    async (req, res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
      res.set("Access-Control-Allow-Headers",
        "Content-Type, Authorization");

      if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
      }

      const stripe = require("stripe")(STRIPE_RK);

      try {
        const requestData = req.body;
        const [{ items }, { user_id }] = requestData;

        if (!items || !Array.isArray(items)) {
          return res.status(400)
            .send({ error: "Invalid request body. 'items' array is missing." });
        }

        let amount = 0;
        for (const item of items) {
          const snap = await db.collection("products")
            .doc(item.product_id).get();

          if (!snap.exists) {
            return res.status(404)
              .send({ error: `Product with ID ${item.product_id} not found.` });
          }
          const product = snap.data();
          const quantity = Number(item.quantity);
          if (isNaN(quantity) || quantity <= 0) {
            return res.status(400)
              .send({ error: `Invalid qty for product ${item.product_id}.` });
          }
          amount += product.price * quantity;
        }

        const paymentIntent = await stripe.paymentIntents.create({
          amount: Math.round(amount * 100),
          currency: "egp",
          automatic_payment_methods: { enabled: true },
          metadata: {
            user_id: user_id,
            order_amount: amount,
          }
        });

        res.send({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).send({ error: error.message });
      }
    });

exports.stripeWebhookHandler =
  onRequest({ region: "europe-central2", secrets: ["STRIPE_SECRET"] },
    async (req, res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
      res.set("Access-Control-Allow-Headers",
        "Content-Type, Authorization");
      const sig = req.headers["stripe-signature"];
      const webhookSecret = "stripe webhook secret";
      const stripe = require("stripe")(STRIPE_RK);
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, webhookSecret);
      } catch (err) {
        console.error("Webhook signature verification failed.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      const dataObject = event.data.object;

      switch (event.type) {
        case "payment_intent.succeeded": {
          console.log(`PaymentIntent succeeded: ${dataObject.id}`);
          
          const userId = dataObject.metadata.user_id;
          const orderAmount = dataObject.metadata.order_amount;

          if (userId) {
            try {
              const userDocRef = db.collection("users").doc(userId);
              const userDoc = await userDocRef.get();
              if (userDoc.exists) {
                var orderCart = userDoc.data().cart;
              }

              const newOrderRef = await db.collection("orders").add({
                status: "paid",
                user_id: userId,
                items: orderCart,
                total_amount: orderAmount,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
              });

              await userDocRef.update({
                cart: []
              });

              console.log(`Successfully created a new order with ID: ${newOrderRef.id}`);
            } catch (error) {
              console.error("Error creating new order:", error);
            }
          } else {
            console.warn(`Webhook received for PaymentIntent ${dataObject.id} with no orderId in metadata.`);
          }
          break;
        }

        case "payment_intent.payment_failed": {
          console.log(`PaymentIntent failed: ${dataObject.id}`);
          break;
        }

        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      res.status(200).send();
    });