import React from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try{
    const res = await axios.get("http://localhost:3000/profile/view", {
      withCredentials: true,
    });
    dispatch(addUser(res.data));
  } catch(err) {
    if(err.status == 401){
      navigate("/login");
    }
  }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
};

export default Body;