"use client";
import { Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/solid";
import AddCart from "./AddCart";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
console.log("hello");
export default async function Product({ searchParams }) {
  return (
    <div className="">
      <div className="max-w-2xl mx-auto py-8 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}

            <Tab.Panels className="w-full rounded-lg">
              <Tab.Panel key={searchParams.image}>
                <img

                  src={searchParams.image}
                  alt={searchParams.image}
                  className="w-auto object-center object-cover rounded-lg"
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>


          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight ">
              {searchParams.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl">
                {"$ " + searchParams.price / 100}
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        4 > rating ? "text-indigo-500" : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{4} out of 5 stars</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div className="text-base text-gray-700 space-y-6" />
              <span>
                Whether you're working out, running errands or just relaxing at
                home, this versatile hoodie will keep you comfortable. Made with
                medium-weight fleece, featuring Dri-Power moisture wicking
                technology to keep body heat in so you can stay warm and dry.
                Ribbed waistband and cuffs provide a secure fit, front muff
                pocket for convenient storage and drawstring hood.
              </span>
            </div>

            <AddCart {...searchParams} />
          </div>
        </div>
      </div>
    </div>
 );
}
    
{/* <>
<div className="flex flex-wrap p-4">
  <div className="w-full md:w-1/2 lg:w-1/3 justify-center">
  <img src={searchParams.image} alt={searchParams.name} className="rounded-lg w-[75%] h-auto" />  </div>
  <div className="w-full md:w-1/2 lg:w-2/3 pl-5">
    <h1 className="text-3xl font-extrabold tracking-tight">
      {searchParams.name}
    </h1>

    <div className="mt-3">
      <h2 className="sr-only">Product information</h2>
      <p className="text-3xl text-gray-900">
        {"$ " + searchParams.price / 100}
      </p>
    </div>

    <div className="text-base text-gray-700 space-y-6">
      <span>
        Whether you're working out, running errands or just relaxing at
        home, this versatile hoodie will keep you comfortable. Made with
        medium-weight fleece, featuring Dri-Power moisture wicking
        technology to keep body heat in so you can stay warm and dry.
        Ribbed waistband and cuffs provide a secure fit, front muff
        pocket for convenient storage and drawstring hood.
      </span>
    </div>

    <div className="mt-3">
      <h3 className="sr-only">Reviews</h3>
      <div className="flex items-center">
        <div className="flex items-center">
         {Array.from({ length: 5 }, (_, index) => (
            <StarIcon
              key={index}
              className={classNames(
                index < 4 ? "text-indigo-500" : "text-gray-300",
                "h-5 w-5 flex-shrink-0"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="sr-only">4 out of 5 stars</p>
      </div>
    </div>

    <AddCart {...searchParams} />
  </div>
</div>
</> */}
 
