"use client"
 
import React, { useState, useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useCartStore } from "@/store";


export default function CheckoutForm({ clientSecret }) {

const stripe = useStripe();
const elements = useElements();
const [isLoading, setIsLoading] = useState(false);

const cartStore = useCartStore();

const totalPrice = cartStore.cart.reduce((acc, item) => {
  return acc + item.price! * item.quantity!;
}, 0);

useEffect(() => {
  if (!stripe || !clientSecret) {
    return;
  }
}, [stripe]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!stripe || !elements) {
    return;
  }
  setIsLoading(true);
  stripe
  .confirmPayment({
    elements,
    redirect: "if_required",
  })
    .then((result) => {
      if (!result.error) {
        cartStore.setCheckout("success");
      setIsLoading(false)
      }
    });
};
  return (
<form className="" onSubmit={handleSubmit} id="payment-form">
  <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
  <h1 className="py-4 text-sm font-bold">Total: {totalPrice/100 + "$"}</h1>
  <button className={`py-2 mt-4 w-full bg-teal-700 rounded-md text-white`} id="submit" disabled={isLoading || !stripe || !elements}>
    <span id="button-text">
      {isLoading ? <span>Processing...</span> : <span>Pay now</span>}
    </span>
  </button>
</form>
  );
}