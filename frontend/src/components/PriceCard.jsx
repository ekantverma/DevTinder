import React from 'react';

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export function PricingCard({ title, price }) {
  return (
    <div className="w-full max-w-[20rem] bg-gray-800 text-white p-8 rounded-lg shadow-lg">
      <div className="text-center border-b border-white/10 pb-8">
        <h3 className="text-sm uppercase font-normal">{title}</h3>
        <h1 className="mt-6 flex justify-center items-end text-7xl font-normal">
          <span className="text-4xl mt-2">$</span>{price} <span className="text-4xl self-end">/mo</span>
        </h1>
      </div>
      <div className="mt-8">
        <ul className="space-y-4">
          {["5 team members", "200+ components", "40+ built-in pages", "1 year free updates", "Life time technical support"].map((feature, index) => (
            <li key={index} className="flex items-center gap-4">
              <span className="rounded-full border border-white/20 bg-white/20 p-1">
                <CheckIcon />
              </span>
              <span className="font-normal">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-12">
        <button className="w-full bg-white text-gray-800 py-3 rounded-lg text-lg font-medium transition transform hover:scale-105 focus:scale-105 active:scale-100">
          Buy Now
        </button>
      </div>
    </div>
  );
}