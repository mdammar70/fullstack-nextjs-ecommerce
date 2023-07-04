// "use client";
// import Image from "next/image";
// import { useCartStore } from "../../store";
// import { IoRemoveCircle } from "react-icons/io5";
// import { IoAddCircle } from "react-icons/io5";
// import { motion } from "framer-motion";
// import Checkout from "./Checkout";
// import OrderConfirmed from "./OrderConfirmed";

// export default function Cart() {
//   const cartStore = useCartStore();

//   const totalPrice = cartStore.cart.reduce((acc, item) => {
//     return acc + (item.price / 100) * item.quantity!;
//   }, 0);
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={() => cartStore.toggleCart()}
//       className="fixed w-full h-screen left-0 top-0 bg-black/25"
//     >
//       <motion.div
//         onClick={(e) => e.stopPropagation()}
//         className="bg-base-300 absolute right-0 top-0 lg:w-1/3 w-full h-screen p-12 overflow-auto
//               "
//       >
//         {cartStore.onCheckout==="cart" && (
//         <button
//           onClick={() => cartStore.toggleCart()}
//           className="text-sm font-bold pb-12"
//         >
//           Back to Store
//         </button>
//         )}

// {cartStore.onCheckout==="checkout" && (
//         <button
//           onClick={() => cartStore.setCheckout("cart")}
//           className="text-sm font-bold pb-12"
//         >
//           Check Your Cart
//         </button>
//         )}
//         <h1 className="font-bold">Shopping List:</h1>
//         {cartStore.onCheckout === "cart" && (
//           <>
//             {cartStore.cart.map((item) => (
//               <motion.div layout key={item.id} className="flex py-4 gap-4">
//                 <Image
//                   className="w-auto rounded-md"
//                   src={item.image}
//                   alt={item.name}
//                   width={90}
//                   height={90}
//                 />
//                 <div>
//                   <h2>{item.name}</h2>
//                   <div className="flex gap-2">
//                     <h2 className="text-sm">Quantity: {item.quantity}</h2>
//                     <button
//                       className="text-2xl"
//                       onClick={() =>
//                         cartStore.removeProduct({
//                           id: item.id,
//                           name: item.name,
//                           images: item.images,
//                           unit_amount: item.unit_amount,
//                           quantity: item.quantity,
//                         })
//                       }
//                     >
//                       <IoRemoveCircle />
//                     </button>

//                     <button
//                       className="text-2xl"
//                       onClick={() =>
//                         cartStore.addProduct({
//                           id: item.id,
//                           name: item.name,
//                           images: item.images,
//                           unit_amount: item.unit_amount,
//                           quantity: item.quantity,
//                         })
//                       }
//                     >
//                       <IoAddCircle />
//                     </button>
//                   </div>
//                   <p className="text-sm text-teal-700">
//                     Price: {item.price / 100 + " $"}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </>
//         )}
// {cartStore.cart.length > 0 && cartStore.onCheckout==="cart" ?(
//   <motion.div layout>
//    <p className="font-bold text-sm text-red-700 ">Total: {totalPrice} $</p>
//         <button
//           onClick={()=>cartStore.setCheckout("checkout")}
//           className="py-2 mt-4 bg-teal-500 w-full rounded-md text-white"
//         >
//           Checkout
//         </button>
//   </motion.div>
// ):null}
// {cartStore.onCheckout === "checkout" && <Checkout />}
// {cartStore.onCheckout === "success" && <OrderConfirmed/>}
// </motion.div>
// </motion.div>
//   )
// }
// {/* {cartStore.cart.length> 0 && cartStore.onCheckout==="cart" ?(
//   <>
//         <p className="text-bold text-sm text-red-700 ">Total: {totalPrice} $</p>
//         <button
//           onClick={()=>cartStore.setCheckout("checkout")}
//           className="py-2 mt-4 bg-teal-500 w-full rounded-md text-white"
//         >
//           Checkout
//         </button>
//         </>
//         ): null}
//       </div>
//       {cartStore.onCheckout === "checkout" && <Checkout />}
//       {cartStore.onCheckout === "success" && <OrderConfirmed/>}

//     </motion.div>
//   );
// } */}


"use client"

import Image from "next/image"
import { useCartStore } from "@/store"
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5"
import { motion, AnimatePresence } from "framer-motion"
import Checkout from "./Checkout"
import OrderConfirmed from "./OrderConfirmed"

export default function Cart() {
  const cartStore = useCartStore()

  //Total Price
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!
  }, 0)
console.log("PRICE IS "+totalPrice)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => cartStore.toggleCart()}
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
    >
      {/* Cart */}
      <motion.div
        layout
        onClick={(e) => e.stopPropagation()}
        className="bg-base-300 absolute right-0 top-0 lg:w-1/3 w-full h-screen p-12 overflow-auto"
      >
        {cartStore.onCheckout === "cart" && (
          <button
            onClick={() => cartStore.toggleCart()}
            className="text-sm font-bold pb-12"
          >
            Back to store
          </button>
        )}
        {cartStore.onCheckout === "checkout" && (
          <button
            onClick={() => cartStore.setCheckout("cart")}
            className="text-sm font-bold pb-12"
          >
            Check your cart
          </button>
        )}
        {/* Cart Items */}
        {cartStore.onCheckout === "cart" && (
          <>
            {cartStore.cart.map((item) => (
              <motion.div
                layout
                key={item.id}
                className="flex p-4 gap-4 bg-base-100 my-4 rounded-lg "
              >
                <Image
                  className="w-auto rounded-sm"
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                />
                <div>
                  <h2>{item.name}</h2>
                  {/* Update quantity of a product */}
                  <div className="flex gap-2">
                    <h2>Quantity: {item.quantity}</h2>
                    <button
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoRemoveCircle />
                    </button>
                    <button
                      onClick={() =>
                        cartStore.addProduct({
                          id: item.id,
                          image: item.image,
                          name: item.name,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <IoAddCircle />
                    </button>
                  </div>

                  <p className="text-sm">
                    {item.unit_amount && (item.unit_amount)}
                  </p>
                </div>
              </motion.div>
            ))}
          </>
        )}
        {/* Checkout and total */}
        {cartStore.cart.length > 0 && cartStore.onCheckout === "cart" ? (
          <motion.div layout>
            <p className="text-green-300 font-bold">Total: {totalPrice/100 + " $"}</p>
            <button
              onClick={() => cartStore.setCheckout("checkout")}
              className="py-2 mt-4 bg-primary w-full rounded-md text-white"
            >
              Checkout
            </button>
          </motion.div>
        ) : null}
        {/* Checkout Form */}
        {cartStore.onCheckout === "checkout" && <Checkout />}
        {cartStore.onCheckout === "success" && <OrderConfirmed />}
        <AnimatePresence>
          {!cartStore.cart.length && cartStore.onCheckout === "cart" && (
            <motion.div
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              initial={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              exit={{ scale: 0.5, rotateZ: -10, opacity: 0 }}
              className="flex flex-col items-center gap-12 text-2xl font-medium pt-56 opacity-75"
            >
              <h1>Uhhh ohhh...it's empty 😢</h1>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
