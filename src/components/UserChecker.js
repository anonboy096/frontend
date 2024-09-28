import React, { useState } from 'react';
import axios from 'axios';

const UserChecker = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');

    const checkUser = async () => {
        if (!username) {
            setError('Please enter a username.');
            return;
        }

        try {
            const response = await axios.get(`https://insta-0uo7.onrender.com/api/users/${username}`);
            setUserData(response.data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.error || 'Error fetching user data.');
            setUserData(null);
        }
    };

    return (
        <div className="user-checker">
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter Instagram Username" 
            />
            <button onClick={checkUser}>Check Account</button>
            {error && <p className="error">{error}</p>}
            {userData && (
                <div className="user-details">
                    <h2>User Details:</h2>
                    <p><strong>Name:</strong> {userData.data.full_name}</p>
                    <p><strong>User ID:</strong> {userData.data.id}</p>
                    <p><strong>Followers Count:</strong> {userData.data.follower_count}</p>
                    <p><strong>Following Count:</strong> {userData.data.following_count}</p>
                    <p><strong>Bio:</strong> {userData.data.biography || 'N/A'}</p>
                    <p><strong>Media Count:</strong> {userData.data.media_count}</p>
                    <p><strong>Account Private:</strong> {userData.data.is_private ? 'Yes' : 'No'}</p>
                    <p><strong>Join Date:</strong> {userData.data.about.date_joined}</p>
                    <p><strong>Former Username:</strong> {userData.data.about.former_usernames}</p>
                    <p><strong>Verified</strong> {userData.data.is_verified ? 'Yes' : 'No'}</p>
                </div>
            )}
        </div>
    );
};

export default UserChecker;