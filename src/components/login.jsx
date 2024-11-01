import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import img1 from '../assets/img1.svg';
import img2 from '../assets/img2.svg'; 
import img3 from '../assets/img3.svg'; 
import axios from 'axios';

import './css/login.css';

const images = [img1, img2, img3];

const Login = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const response = await axios.post("https://singhanish.me/api/auth/login", {
        email,
        password
      });

      if (response.data.success) {
        alert('Logged in successfully');
      } 
    } catch (error) {
    } finally {
     
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className='loginPage' >
      <div className='left'>
        <div className="leftSub">
          <h2 id="leftsubh2">Log In</h2>
          <p>to access your classes, assignments and more.</p>

          <input type="email" placeholder='Email address' className='textinput'    value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
          <br />
          <input type="password" placeholder='Password' className='textinput' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required/>
          <br />

          <div className="checkbox-container">
          <Link to="/pwreset" id="forgethover">Forget Password?</Link>
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <input type="submit" value="Log in"  onClick={handleSubmit}/>
          <div className="askSign">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="content">
         

          <div className="slider">
            <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="slide"
                />
              ))}
            </div>
          </div>

          <div className="scroller">
            {images.map((_, index) => (
              <div
                key={index}
                className={`rec ${currentIndex === index ? 'recActive' : 'rec2'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
