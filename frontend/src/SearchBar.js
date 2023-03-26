import React, { useState } from 'react';
import Select from 'react-select';
import './SearchBar.css';

function SearchBar() {
  const [searchBy, setSearchBy] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const options = [
    { value: 'tag1', label: 'Tag 1' },
    { value: 'tag2', label: 'Tag 2' },
    { value: 'tag3', label: 'Tag 3' },
    { value: 'tag4', label: 'Tag 4' },
    // Add more options as needed
  ];

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagChange = (selectedOption) => {
    setSelectedTag(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted!');
  };

  const customStyle = {
    control: (styles) => ({
      ...styles,
      borderColor: '#9e9e9e',
      height: '70px',
      width: '100%',
    }),
  };

  return (
    <div className='outer'>
    <form className="select-container" onSubmit={handleSubmit}>
      <div className="search-options-container">
        <div>
          <input type="radio" id="search-by-name" name="search-by" value="name" checked={searchBy === 'name'} onChange={handleSearchByChange} />
          <label htmlFor="search-by-name">Search by Name</label>
        </div>
        <div>
          <input type="radio" id="search-by-tag" name="search-by" value="tag" checked={searchBy === 'tag'} onChange={handleSearchByChange} />
          <label htmlFor="search-by-tag">Search by Tag</label>
        </div>
      </div>
      {searchBy === 'name' && (
        <input type="text" className="search-input" placeholder="Search by name" value={searchText} onChange={handleTextChange} />
      )}
      {searchBy === 'tag' && (
        <Select
          className="select-input"
          value={selectedTag}
          onChange={handleTagChange}
          options={options}
          styles={customStyle}
          placeholder="Search by tag"
          isClearable
        />
      )}
      <button className="submit-button" type="submit">Submit</button>
    </form>
    </div>
  );
}

export default SearchBar;
