import React from 'react';
import frame from '../assets/Frame.svg';
import cuate from '../assets/cuate.svg';
import { Link } from 'react-router-dom';

function Getstarted() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="flex items-center justify-center mt-[4vh] ">
        <h1 className="text-6xl font-bold text-[#008080] mr-[1.5vw]">Welcome to</h1>
        <img src={frame} alt="Frame" className="h-20" />
      </div>

      <div className="flex justify-center mt-[3vh] ">
        <p className="text-[24px] leading-relaxed text-[#414A4B} w-[80vw]">
          Your all-in-one platform for collaborative, efficient, and engaging learning. Join or create classes, manage assignments, connect with classmates, and stay on top of your academic journey.
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <img src={cuate} alt="Illustration"  />
      </div>


      <div className="flex justify-center  space-x-4 mt-[5vh]">
        <button className="bg-[#008080] w-[10vw] text-white px-6 py-3 rounded-lg  font-semibold   ">
            <Link to="/login" className='text-xl'> Log In</Link>
        </button>
        <button className="bg-[#008080] w-[10vw] text-white px-6 py-3 rounded-lg font-semibold ">
         <Link to="/signup" className='text-xl'> Create Account</Link>
        </button>
      </div>


      <div className="flex justify-center  text-[#4C5858] text-lg mt-[4vh] font-semibold ">
        <p className='text-xl'>Ready to start? Your classroom is just a click away!</p>
      </div>


      <div className="flex justify-center text-[#414A4B] text-[12px] mt-[5vh] font-semibold ">
        Classence | ESTD. 2024
      </div>
    </div>
  );
}

export default Getstarted;
