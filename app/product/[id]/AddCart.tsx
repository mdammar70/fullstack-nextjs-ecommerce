"use client";
import { useCartStore } from "@/store";
import { ProductType } from "@/types/ProductType";

import React from "react";

const AddCart = ({ name, id, image, price, quantity  }: ProductType) => {
  const CartStore=useCartStore()
    return (
      <div className="mt-10 flex sm:flex-col1">
        <button
          onClick={() =>
            CartStore.addProduct({ name, id, image, price, quantity })
          }
          className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
        >
          Add to bag
        </button>
      </div>
    );
};

export default AddCart;
