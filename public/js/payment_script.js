import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-functions.js";
import { getFirestore, doc, getDoc, collection, addDoc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDBBHmLTSuwJhTcr5ZEBb7_mLKqZSfANC4",
    authDomain: "brand-website-ce759.firebaseapp.com",
    databaseURL: "https://brand-website-ce759-default-rtdb.firebaseio.com",
    projectId: "brand-website-ce759",
    storageBucket: "brand-website-ce759.firebasestorage.app",
    messagingSenderId: "234496063014",
    appId: "1:234496063014:web:6e42b87acd29324f5718e7",
    measurementId: "G-CG97PT2MV2"
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const db = getFirestore(app);


const stripe = Stripe("pk_test_51S8NXnCWSJjW8T1w0tpX3wH1XPsxVd9B8HqXegTwk0QZ12tSxcq2BIFPwA6ay4trMmYpJPbEdDocsKLJfYG06zbT00obTpwM7N");
const style = {
  base: {
    iconColor: '#666EE8',
    color: '#0e9fffff',
    fontWeight: 400,
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
    fontSize: '24px',
    '::placeholder': {
      color: '#29415cff',
    }
  },
};
const elements = stripe.elements();
const cardElement = elements.create('card', { style: style });
cardElement.mount("#card-element");

const auth = getAuth();
let cart = [];
let userId = null;

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userId = user.uid;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      cart = userDoc.data().cart; 
      console.log("Cart loaded for user:", user.uid);
    } else {
      console.log("No user profile found in Firestore.");
    }
  } else {
    console.log("User is not logged in.");
    userId = null;
    cart = [];
    window.location.href = "login.html";
  }
});

document.getElementById("payment-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const response = await fetch("https://europe-central2-brand-website-ce759.cloudfunctions.net/createPaymentIntent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([{ items: cart }, { user_id:  userId }])
    });

        const data = await response.json();
        const clientSecret = data.clientSecret;

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card: cardElement }
        });

    const messageDiv = document.getElementById("payment-message");

    if (error) {
        messageDiv.textContent = "⚠️ " + error.message;
    } else if (paymentIntent.status === "succeeded") {
        messageDiv.textContent = "✅ Payment successful!";
        setTimeout(()=>{window.location.href = "orders.html";}, 3000);
    }
});