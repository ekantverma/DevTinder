import React from 'react';

const FeedCard = ({ feed }) => {
  const { firstName, lastName, photoUrl, age, gener, skills, about } = feed;

  return (
    <div className='flex justify-center mt-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img 
            src={photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"} 
            alt={`${firstName} ${lastName}`} 
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          <p>{about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
