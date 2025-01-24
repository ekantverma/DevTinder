import React from 'react';
import {useDispatch} from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';

const FeedCard = ({ feed }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, skills, about } = feed;
  const dispatch = useDispatch();

  const handleRequest = async (status, userId) => {
    try{
    const response = axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
      withCredentials: true,
    });
    dispatch(removeUserFromFeed(userId));

  }catch(err){
    console.log(err);
  }

  }

  return (
    <div className='flex justify-center mt-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <figure>
          <img 
            src={feed.photoUrl} 
            alt={`${firstName} ${lastName}`} 
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
          {age && gender && <p>{age + " " + gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={() => {handleRequest("ignored", _id)}}>Ignore</button>
            <button className="btn btn-secondary" onClick={() => {handleRequest("interested", _id)}}>Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
