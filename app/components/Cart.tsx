"use client";
import Image from "next/image";
import { useCartStore } from "../../store";
import { IoRemoveCircle } from "react-icons/io5";
import { IoAddCircle } from "react-icons/io5";
import { motion } from "framer-motion";
import Checkout from "./Checkout";
import OrderConfirmed from "./OrderConfirmed";

export default function Cart() {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + (item.price / 100) * item.quantity!;
  }, 0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-base-300 absolute right-0 top-0 lg:w-1/3 w-full h-screen p-12 overflow-auto
              "
      >
        {cartStore.onCheckout==="cart" && (
        <button
          onClick={() => cartStore.toggleCart()}
          className="text-sm font-bold pb-12"
        >
          Back to Store
        </button>
        )}

{cartStore.onCheckout==="checkout" && (
        <button
          onClick={() => cartStore.setCheckout("cart")}
          className="text-sm font-bold pb-12"
        >
          Check Your Cart
        </button>
        )}
        <h1 className="font-bold">Shopping List:</h1>
        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div layout key={item.id} className="flex py-4 gap-4">
                <Image
                  className="w-auto rounded-md"
                  src={item.image}
                  alt={item.name}
                  width={90}
                  height={90}
                />
                <div>
                  <h2>{item.name}</h2>
                  <div className="flex gap-2">
                    <h2 className="text-sm">Quantity: {item.quantity}</h2>
                    <button
                      className="text-2xl"
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          name: item.name,
                          images: item.images,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoRemoveCircle />
                    </button>

                    <button
                      className="text-2xl"
                      onClick={() =>
                        cartStore.addProduct({
                          id: item.id,
                          name: item.name,
                          images: item.images,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoAddCircle />
                    </button>
                  </div>
                  <p className="text-sm text-teal-700">
                    Price: {item.price / 100 + " $"}
                  </p>
                </div>
              </motion.div>
            ))}
          </>
        )}
{cartStore.cart.length > 0 && cartStore.onCheckout==="cart" ?(
  <motion.div layout>
   <p className="font-bold text-sm text-red-700 ">Total: {totalPrice} $</p>
        <button
          onClick={()=>cartStore.setCheckout("checkout")}
          className="py-2 mt-4 bg-teal-500 w-full rounded-md text-white"
        >
          Checkout
        </button>
  </motion.div>
):null}
{cartStore.onCheckout === "checkout" && <Checkout />}
{cartStore.onCheckout === "success" && <OrderConfirmed/>}
</motion.div>
</motion.div>
  )
}
{/* {cartStore.cart.length> 0 && cartStore.onCheckout==="cart" ?(
  <>
        <p className="text-bold text-sm text-red-700 ">Total: {totalPrice} $</p>
        <button
          onClick={()=>cartStore.setCheckout("checkout")}
          className="py-2 mt-4 bg-teal-500 w-full rounded-md text-white"
        >
          Checkout
        </button>
        </>
        ): null}
      </div>
      {cartStore.onCheckout === "checkout" && <Checkout />}
      {cartStore.onCheckout === "success" && <OrderConfirmed/>}

    </motion.div>
  );
} */}
