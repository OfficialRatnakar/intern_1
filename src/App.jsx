import React, { useState, useEffect } from 'react'
import logo from './assets/lzylogo.png'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { FaUser, FaPhoneAlt } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordLine } from 'react-icons/ri'

function App() {
  const [showSignup, setShowSignup] = useState(false)

  // Signup form state and validation
  const [signupData, setSignupData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [signupErrors, setSignupErrors] = useState({});
  const [signupTried, setSignupTried] = useState(false);

  function validateSignup() {
    const errors = {};
    if (!signupData.name.trim()) errors.name = 'Full Name is required.';
    if (!signupData.phone || signupData.phone.length < 6) errors.phone = 'Valid phone number is required.';
    if (!signupData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(signupData.email)) errors.email = 'Valid email is required.';
    if (!signupData.password || signupData.password.length < 6) errors.password = 'Password must be at least 6 characters.';
    return errors;
  }

  function handleSignupChange(field, value) {
    setSignupData(prev => ({ ...prev, [field]: value }));
  }

  function handleSignupSubmit(e) {
    e.preventDefault();
    setSignupTried(true);
    const errors = validateSignup();
    setSignupErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Submit logic here
      alert('Signup successful!');
    }
  }

  // Login form state and validation
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginErrors, setLoginErrors] = useState({});
  const [loginTried, setLoginTried] = useState(false);

  function validateLogin() {
    const errors = {};
    if (!loginData.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(loginData.email)) errors.email = 'Valid email is required.';
    if (!loginData.password || loginData.password.length < 6) errors.password = 'Password must be at least 6 characters.';
    return errors;
  }

  function handleLoginChange(field, value) {
    setLoginData(prev => ({ ...prev, [field]: value }));
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    setLoginTried(true);
    const errors = validateLogin();
    setLoginErrors(errors);
    if (Object.keys(errors).length === 0) {
      // Submit logic here
      alert('Login successful!');
    }
  }

  // Hide signup errors after 3 seconds
  useEffect(() => {
    if (signupTried && Object.keys(signupErrors).length > 0) {
      const timer = setTimeout(() => {
        setSignupErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [signupErrors, signupTried]);

  // Hide login errors after 3 seconds
  useEffect(() => {
    if (loginTried && Object.keys(loginErrors).length > 0) {
      const timer = setTimeout(() => {
        setLoginErrors({});
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loginErrors, loginTried]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50 ">
      <div className="flex-1 flex md:flex-row flex-col items-center justify-center w-full mt-20">
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-center justify-center md:px-8 pl-10 md:py-0 py-6 w-full max-w-full">
          <img src={logo} alt="LzyCrazy Logo" className="w-32 md:w-44 lg:w-60 opacity-90 mix-blend-multiply mb-8" />
          
          <div className="w-full max-w-md pt-10 mb-8">
            <div className="flex items-center bg-blue-50 rounded-full shadow md:px-4 px-3 md:py-3 py-2">
              <svg className="w-5 h-5 text-black mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" /></svg>
              <input className="flex-1 bg-transparent outline-none text-gray-700 md:text-base text-sm" placeholder="Search here..." />
            </div>
          </div>
          <div className="flex flex-wrap md:gap-4 gap-2 justify-center p-20 pt-10 w-full">
            <button className="md:px-6 px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-medium md:text-base text-sm w-full md:w-auto whitespace-nowrap transition border border-gray-300 hover:bg-gray-100">About Us</button>
            <button className="md:px-6 px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-medium md:text-base text-sm w-full md:w-auto whitespace-nowrap transition border border-gray-300 hover:bg-gray-100">LzyCrazy Services</button>
            <button className="md:px-6 px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-medium md:text-base text-sm w-full md:w-auto whitespace-nowrap transition border border-gray-300 hover:bg-gray-100">LzyCrazy Marketplace</button>
            <button className="md:px-6 px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-medium md:text-base text-sm w-full md:w-auto whitespace-nowrap transition border border-gray-300 hover:bg-gray-100">We Are Hiring</button>
            <button className="md:px-6 px-4 py-2 bg-white rounded-full shadow-md text-gray-700 font-medium md:text-base text-sm w-full md:w-auto whitespace-nowrap transition border border-gray-300 hover:bg-gray-100">LzyCrazy News</button>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center w-full md:px-0 px-2 md:py-0 py-6">
          <div className="bg-white rounded-xl shadow-lg md:p-10 p-3 w-full max-w-md flex flex-col justify-center items-stretch" style={{ minHeight: '540px', maxHeight: '600px' }}>
            {!showSignup ? (
              <>
                {/* Login Form */}
                <form className="space-y-4" onSubmit={handleLoginSubmit} noValidate>
                  {/* Email */}
                  <div className="relative">
                    {loginTried && loginErrors.email && (
                      <div className="absolute -top-6 left-0 text-xs text-white bg-gradient-to-r from-red-500 to-pink-500 rounded px-2 py-1 shadow z-10 animate-fade-in">
                        {loginErrors.email}
                      </div>
                    )}
                    <div className={`flex items-center border rounded px-3 py-2 transition-colors duration-200 ${loginTried ? (loginErrors.email ? 'border-red-400' : 'border-green-400') : 'border-gray-300'} bg-white`}>
                      <MdEmail className="w-5 h-5 text-gray-400 mr-2" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="flex-1 outline-none bg-white"
                        value={loginData.email}
                        onChange={e => handleLoginChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Password */}
                  <div className="relative">
                    {loginTried && loginErrors.password && (
                      <div className="absolute -top-6 left-0 text-xs text-white bg-gradient-to-r from-red-500 to-pink-500 rounded px-2 py-1 shadow z-10 animate-fade-in">
                        {loginErrors.password}
                      </div>
                    )}
                    <div className={`flex items-center border rounded px-3 py-2 transition-colors duration-200 ${loginTried ? (loginErrors.password ? 'border-red-400' : 'border-green-400') : 'border-gray-300'} bg-white`}>
                      <RiLockPasswordLine className="w-5 h-5 text-gray-400 mr-2" />
                      <input
                        type="password"
                        placeholder="Password"
                        className="flex-1 outline-none bg-transparent"
                        value={loginData.password}
                        onChange={e => handleLoginChange('password', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end text-sm">
                    <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
                  </div>
                  <button type="submit" className="w-full py-2 rounded bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold text-lg shadow">Login</button>
                </form>
                <div className="flex items-center my-6">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="mx-4 text-gray-400 text-sm">or continue with</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
                <div className="flex gap-4 mb-4">
                  <button className="flex-1 flex items-center justify-center border rounded py-2 bg-white shadow text-gray-700 font-medium"><svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4c-7.2 0-13.3 3.1-17.7 8.1z"/><path fill="#FBBC05" d="M24 44c5.8 0 10.7-2.2 14.3-5.7l-6.6-5.4C29.8 36 24 36 24 36c-5.8 0-10.7-2.2-14.3-5.7l6.6-5.4C18.2 33.9 21.1 36 24 36z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 6.5 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8.9 20-20 0-1.3-.1-2.7-.3-4z"/></g></svg>Google</button>
                  <button className="flex-1 flex items-center justify-center border rounded py-2 bg-white shadow text-gray-700 font-medium"><svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>Facebook</button>
                </div>
                <button type="button" onClick={() => setShowSignup(true)} className="mt-3.5 w-1/2 ml-22 rounded bg-[linear-gradient(to_right,_#9758fe,_#ff6ec4)] py-2 font-semibold text-white bg-gray-100 from-purple-500 to-pink-400 ">Create New Account</button>
              </>
            ) : (
              <>
                {/* Signup Form */}
                <form className="space-y-4" onSubmit={handleSignupSubmit} noValidate>
                  {/* Name */}
                  <div className="relative">
                    {signupTried && signupErrors.name && (
                      <div className="absolute -top-6 left-0 text-xs text-white bg-gradient-to-r from-red-500 to-pink-500 rounded px-2 py-1 shadow z-10 animate-fade-in">
                        {signupErrors.name}
                      </div>
                    )}
                    <div className={`flex items-center border rounded px-3 py-2 transition-colors duration-200 ${signupTried ? (signupErrors.name ? 'border-red-400' : 'border-green-400') : 'border-gray-300'} bg-gray-100`}>
                      <FaUser className="w-5 h-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="flex-1 outline-none bg-transparent"
                        value={signupData.name}
                        onChange={e => handleSignupChange('name', e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Phone */}
                  <div className="relative">
                    {signupTried && signupErrors.phone && (
                      <div className="absolute -top-6 left-0 text-xs text-white bg-gradient-to-r from-red-500 to-pink-500 rounded px-2 py-1 shadow z-10 animate-fade-in">
                        {signupErrors.phone}
                      </div>
                    )}
                    <div className={`flex items-center border rounded transition-colors duration-200 ${signupTried ? (signupErrors.phone ? 'border-red-400' : 'border-green-400') : 'border-gray-300'}`}>
                      <FaPhoneAlt className="w-5 h-5 text-gray-400 mr-2 ml-3" />
                      <div className="flex-1">
                        <PhoneInput
                          country={'in'}
                          value={signupData.phone}
                          onChange={value => handleSignupChange('phone', value)}
                          inputClass="!bg-gray-100 !border-0 !rounded !px-3 !py-2 !w-full !text-base !outline-none focus:!ring-2 focus:!ring-blue-300 !pl-11"
                          buttonClass="!bg-white"
                          dropdownClass="!bg-white"
                          containerClass="w-full"
                          enableSearch
                          inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: false,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Email */}
                  <div className="relative">
                    {signupTried && signupErrors.email && (
                      <div className="absolute -top-6 left-0 text-xs text-white bg-gradient-to-r from-red-500 to-pink-500 rounded px-2 py-1 shadow z-10 animate-fade-in">
                        {signupErrors.email}
                      </div>
                    )}
                    <div className={`flex items-center border rounded px-3 py-2 transition-colors duration-200 ${signupTried ? (signupErrors.email ? 'border-red-400' : 'border-green-400') : 'border-gray-300'} bg-gray-100`}>
                      <MdEmail className="w-5 h-5 text-gray-400 mr-2" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="flex-1 outline-none bg-transparent"
                        value={signupData.email}
                        onChange={e => handleSignupChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Password */}
                  <div className="relative">
                    {signupTried && signupErrors.password && (
                      <div className="absolute -top-6 left-0 text-xs text-white bg-gradient-to-r from-red-500 to-pink-500 rounded px-2 py-1 shadow z-10 animate-fade-in">
                        {signupErrors.password}
                      </div>
                    )}
                    <div className={`flex items-center border rounded px-3 py-2 transition-colors duration-200 ${signupTried ? (signupErrors.password ? 'border-red-400' : 'border-green-400') : 'border-gray-300'} bg-gray-100`}>
                      <RiLockPasswordLine className="w-5 h-5 text-gray-400 mr-2" />
                      <input
                        type="password"
                        placeholder="Password"
                        className="flex-1 outline-none bg-transparent"
                        value={signupData.password}
                        onChange={e => handleSignupChange('password', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 leading-snug">
                    We may use your contact information to improve your experience. <a href="#" className="text-blue-600 hover:underline">Learn more</a>
                  </div>
                  <div className="text-xs text-gray-500 leading-snug">
                    By clicking Sign Up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>, <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>, and <a href="#" className="text-blue-600 hover:underline">Cookies Policy</a>
                  </div>
                  <button type="submit" className="w-full py-2 rounded bg-gradient-to-r from-purple-500 to-pink-400 text-white font-semibold text-lg shadow">Signup</button>
                </form>
                <div className="text-center mt-4">
                  <button type="button" onClick={() => setShowSignup(false)} className="text-blue-600 hover:underline text-base">Already have an account?</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="w-full flex md:flex-row flex-col justify-between items-center md:gap-4 gap-2 py-4 border border-gray-300 text-sm bg-blue-50 md:px-6 px-2 mt-15">
        <div className="flex items-center flex-wrap justify-center md:gap-6 gap-2 md:text-sm text-xs">
          <a href="#" className="hover:underline">India</a>
          <span>|</span>
          <span className="text-gray-700">LzyCrazy offered in:</span>
          <a href="#" className="hover:underline text-blue-600">हिन्दी</a>
          <a href="#" className="hover:underline text-blue-600">English</a>
          <a href="#" className="hover:underline text-blue-600">বাংলা</a>
          <a href="#" className="hover:underline text-blue-600">العربية</a>
        </div>
        <div className="flex items-center justify-center md:gap-6 gap-4 md:text-sm text-xs">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </footer>
    </div>
  )
}

export default App

