import React from 'react';
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Image from 'next/image';

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return null
  }
  const orders = await prisma.order.findMany({
    where: { userId: user?.user?.id },
    include: { products: true },
  });

  return orders;
};

export default async function Dashboard() {

  const orders = await fetchOrders();
  console.log(orders)
  if(orders===null)
  {
    return <div>You need to be logged in to view your orders</div>
  }
  if(orders.length===0)
  {
    return <div>No Order Placed</div>
  }
  return (
    
      <div className="font-medium">
        {orders.map((order) => (
          <div key={order.id} className="bg-base-300 rounded-lg p-8 my-12">
            <h2>Order reference: {order.id}</h2>
            {/* <p>Time: {new Date(order.createdDate)}</p> */}
            <p className="text-md py-2">
              Status:{" "}
              <span className={`${order.status === 'complete' ? 'bg-teal-500' : 'bg-orange-500'} text-white  py-1 rounded-md px-2 mx-2 text-sm`} >{order.status}</span>
            </p>
            <p className="font-medium">Total: {order.amount/100 + "$"}</p>
            <div className="flex gap-8 ">
              {order.products.map((product) => (
                <div className="py-2 " key={product.id}>
                  <h2 className="py-2">{product.name}</h2>
                  <div className="flex items-center gap-4">
                    <Image
                    className='rounded-md'
                      src={product.image}
                      width={90}
                      height={90}
                      alt={product.name}
                    />
                    <p>{product.unit_amount/100 + "$"}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
   
  );
}