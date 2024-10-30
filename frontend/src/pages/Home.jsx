
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState(''); // State to hold username
  const navigate = useNavigate();

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/auth/home', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        // Assuming the response contains the user's information
        const userData = response.data.user; // Adjust based on your actual response structure
        setUsername(userData.username); // Set username from response
        localStorage.setItem('username', userData.username); // Store username in local storage
      } else {
        navigate('/login');
      }
    } catch (err) {
      navigate('/login');
      console.log(err);
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Clear username from local storage
    navigate('/login');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className='text-3xl text-blue-500 flex flex-col items-center'>
      <p>{username ? `Welcome ${username}. You are authenticated.` : 'Welcome. You are authenticated.'}</p>
      <button onClick={handleLogout} className="mt-5 bg-red-500 text-white py-2 px-4 rounded">
        Logout
      </button>
    </div>
  );
};

export default Home;





