import React, { useEffect } from 'react';

const SocialSignup = () => {
  useEffect(() => {
    // Extract the JWT token from the query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Store the token in local storage or use it as needed for authentication
    // Example: localStorage.setItem('token', token);

    // Redirect the user to another page or perform any necessary actions
    // Example: history.push('/dashboard');
  }, []);

  return (
    <div>
      <h1>Social Sign-Up</h1>
      <p>Loading...</p>
    </div>
  );
};

export default SocialSignup;
