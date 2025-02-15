import React from 'react';
import { PricingCard } from './PriceCard';

const Prices = () => {
  return (
    <div className='flex gap-4 items-center justify-center my-10 my-0 pt-20'>
      <PricingCard title='Basic' price='10' />
      <PricingCard title='Standard' price='20' />
      <PricingCard title='Premium' price='30' />
    </div>
  );
}

export default Prices;