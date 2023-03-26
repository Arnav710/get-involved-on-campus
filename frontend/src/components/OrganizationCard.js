import React from 'react';
import './../styles/OrganizationCard.css';

function OrganizationCard({ name, description, link, final_tags }) {
    return (
      <div className="org-box">
        <a href={link}>
          <h3>{name}</h3>
        </a>
        <p>{description}</p>
        <ul>
          {final_tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    );
  }

export default OrganizationCard;