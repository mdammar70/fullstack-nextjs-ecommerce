"use client";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import Cart from "./Cart";
import { useCartStore } from "@/store";
import { AiFillShopping } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import DarkLight from "./DarkLight";


const Navbar = ({ user }: Session) => {
  const cartStore = useCartStore();
  return (
    <nav className="m-4 flex justify-between items-center py-4 px-5">
      <h1 className="font-lobster text-3xl md:text-2xl">Andy's Store</h1>
      <ul className="flex items-center gap-8">
        <li
          onClick={() => cartStore.toggleCart()}
          className="flex items-center relative cursor-pointer text-3xl"
        >
          <AiFillShopping />
          {cartStore.cart.length > 0 && (
            <motion.span
              animate={{ scale: 1 }}
              initial={{ scale: 0 }}
              className="bg-teal-700 text-white text-sm font-bold w-5 h-5 rounded-full absolute left-4 bottom-4 flex items-center justify-center"
            >
              {cartStore.cart.length}
            </motion.span>
          )}
        </li>
        <DarkLight/>
        {!user && (
          <li className="bg-primary text-white py-2 px-4 rounded-md">
            <button onClick={() => signIn()}>SignIn</button>
          </li>
        )}

        {user && (
          <li>
            <div className="dropdown dropdown-end cursor-pointer">
            <Image
              //onClick={() => signOut()}
              src={user.image as string}
              alt={user.name as string}
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
              tabIndex={0}
            />
            <ul 
            tabIndex={0} className="dropdown-content menu p-4 space-y-4 shadow bg-base-100 rounded-box w-72">
               <Link 
               className="hover:bg-base-300 p-4 rounded-md"
               href={"/dashboard"}
               onClick={()=>{
                if(document.activeElement instanceof HTMLElement) {
                  document.activeElement.blur()
                }
               }}
               >
                Orders
              </Link>
               <li 
                onClick={()=>{
                  if(document.activeElement instanceof HTMLElement) {
                    document.activeElement.blur()
                  }
                 }}
               className="hover:bg-base-300 p-4 rounded-md"
               >Sign out</li>
            </ul>
            </div>
          </li>
        )}

        <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
      </ul>
    </nav>

  
  );
};

export default Navbar;
