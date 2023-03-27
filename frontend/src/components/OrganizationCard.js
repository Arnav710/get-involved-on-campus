import React from 'react';
import linkLogo from './../images/link-logo.png'
import './../styles/OrganizationCard.css';

function OrganizationCard({ name, description, link, final_tags, upvotes}) {
    return (
      <div className="org-box">
        <h3>{name}</h3>
        <p>{description}</p>
        <ul>
          {final_tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <div className='bottom-row'>
          
          <div>
            <image></image>
            <p>Upvote Count: {upvotes}</p>
          </div>
        
          <div className='link-container'>
            <a href={link} target="_blank">
              <img src={linkLogo} alt="Logo" className='link-logo'/>
            </a>
          </div>
        </div>

      </div>
    );
  }

export default OrganizationCard;