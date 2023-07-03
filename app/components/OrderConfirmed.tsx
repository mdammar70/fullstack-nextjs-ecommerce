"use client"

import { useCartStore } from "@/store";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export default function OrderConfirmed() {
    const cartStore= useCartStore()
    useEffect(()=>{
        cartStore.setPaymentIntent("")
        cartStore.clearCart()
    },[])
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="p-12 rounded-md text-center" >
        <h1 className="text-xl font-medium">Your order has been placed</h1>
        <h2 className="text-sm my-4">Check your email for the receipt.</h2>
      </div>
      <div className="flex items-center justify-center gap-12">
  <Link href={"/dashboard"}>
    <button onClick={()=>{
        cartStore.setCheckout("cart"),
        cartStore.toggleCart()
    }} className="font-medium">Check your Order</button>
  </Link>
  
</div>
    </motion.div>
  );
}