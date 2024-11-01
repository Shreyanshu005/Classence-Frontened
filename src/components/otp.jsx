import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import './css/otp.css';
import bro1 from '../assets/pana.svg';
import { useSelector } from 'react-redux';

const Otp = () => {
    const email = useSelector((state) => state.auth.email); 
    const inputRefs = useRef([]);
    
    const [timer, setTimer] = useState(59);
    const [isResendDisabled, setIsResendDisabled] = useState(true);

    useEffect(() => {
        if (isResendDisabled) {
            const countdown = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(countdown);
                        setIsResendDisabled(false); 
                        return 59;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
            return () => clearInterval(countdown);
        }
    }, [isResendDisabled]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otp = inputRefs.current.map((input) => input.value).join('');
        
        try {
            const response = await axios.post("https://singhanish.me/api/auth/verify", {
                email,
                otp
            });
            if (response.data.success) {
                alert('Signed up successfully');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
       
        try {
            const response = await axios.post("https://singhanish.me/api/auth/resend-otp", {
                email
            });
            if (response.data.success) {
                alert('Otp sent successfully');
                setIsResendDisabled(true); 
                setTimer(59);  
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        if (/^\d$/.test(value)) {
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) nextInput.focus();
        } else if (value === '' && index > 0) {
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) prevInput.focus();
        }
    };

    const handleKeyPress = (e) => {
        if (!/^\d$/.test(e.key)) {
            e.preventDefault();
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) prevInput.focus();
        }
    };

    return (
        <div className='otpPage'>
            <div className='otpleft'>
                <div className="otpleftSub">
                    <h2 id="otph2">Verify Your Email</h2>
                    <p id="otpp">We’ve sent a 6-digit verification code to {email}</p>
                    <form className="digits">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                id={`digit${index + 1}`}
                                maxLength="1"
                                inputMode="numeric"
                                pattern="\d*"
                                onKeyPress={handleKeyPress}
                                onKeyDown={(e) => handleBackspace(e, index)}
                                onChange={(e) => handleInputChange(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                            />
                        ))}
                    </form>
                    <p id='resend'>
                        <span 
                            onClick={isResendDisabled ? null : handleClick}
                            style={{ color: isResendDisabled ? 'gray' : '#066769', cursor: isResendDisabled ? 'default' : 'pointer' }}
                        >
                            Resend OTP
                        </span> 
                        {isResendDisabled ? ` in ${timer}s` : ''}
                    </p>
                    <input type="submit" id='otpsubmit' value="Verify" onClick={handleSubmit} />
                    <div className="askSign">
                        <p>Back to <Link to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
            <div className="otpright">
                <div className="otpcontent">
                    <img src={bro1} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Otp;
