import React, { useState, useEffect } from 'react';
import linkLogo from './../images/link-logo.png';
import './../styles/OrganizationCard.css';

function OrganizationCard({ name, description, link, final_tags, upvotes }) {
  const [isUpvoted, setIsUpvoted] = useState(false);

  useEffect(() => {
    // Get the user information from localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Check if the user is logged in
    if (accessToken) {
      // Get the user's name from the access token
      const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
      const username = decodedToken.username;

      // Call the fetchUserDetails function to fetch the user details
      fetchUserDetails(username);
    }
  }, []);

  // Fetch user details by username
  const fetchUserDetails = async (username) => {
    try {
      const response = await fetch(`http://localhost:4000/api/get-user/${username}`);
      const user = await response.json();

      // Retrieve the upvoted organizations from the user object
      const { upvotedOrganizations } = user;

      // Check if the organization is upvoted by the user
      const isOrganizationUpvoted = upvotedOrganizations.includes(name);
      setIsUpvoted(isOrganizationUpvoted);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpvote = async () => {
    try {
      // Toggle the upvoted state locally
      setIsUpvoted(!isUpvoted);
  
      // Get the user information from localStorage
      const accessToken = localStorage.getItem('accessToken');
  
      // Check if the user is logged in
      if (accessToken) {
        // Get the user's name from the access token
        const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
        const username = decodedToken.username;
  
        // Perform the upvote action on the server
        await fetch(`http://localhost:4000/api/organizations/upvote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            organization_name: name,
          }),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    <div className="org-box">
      <h3>{name}</h3>
      <p>{description}</p>
      <ul>
        {final_tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="bottom-row">
        <button className={`upvote-button${isUpvoted ? '-upvoted' : ''}`} onClick={handleUpvote}>
          {isUpvoted ? 'Upvoted' : 'Upvote'}
        </button>

        <div>
          <p>Upvote Count: {upvotes}</p>
        </div>

        <div className="link-container">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <img src={linkLogo} alt="Logo" className="link-logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default OrganizationCard;
