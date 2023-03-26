import React, { useState } from 'react';
import Select from 'react-select';
import './SearchBar.css';

function SearchBar() {
  const [searchBy, setSearchBy] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const options = [
      { value: 'art', label: 'art '},
      { value: 'biology', label: 'biology '},
      { value: 'business and management', label: 'business and management '},
      { value: 'chemistry', label: 'chemistry '},
      { value: 'community', label: 'community '},
      { value: 'community service', label: 'community service '},
      { value: 'computer science', label: 'computer science '},
      { value: 'cooperative', label: 'cooperative '},
      { value: 'cultural', label: 'cultural '},
      { value: 'dance', label: 'dance '},
      { value: 'earth science', label: 'earth science '},
      { value: 'economics', label: 'economics '},
      { value: 'educational', label: 'educational '},
      { value: 'engineering', label: 'engineering '},
      { value: 'environmental science', label: 'environmental science '},
      { value: 'finance', label: 'finance '},
      { value: 'greek fraternity', label: 'greek fraternity '},
      { value: 'greek sorority', label: 'greek sorority '},
      { value: 'health professions', label: 'health professions '},
      { value: 'history', label: 'history '},
      { value: 'interfraternity council (ifc)', label: 'interfraternity council (ifc) '},
      { value: 'language', label: 'language '},
      { value: 'law', label: 'law '},
      { value: 'leadership', label: 'leadership '},
      { value: 'martial arts/combatives/weaponry', label: 'martial arts/combatives/weaponry '},
      { value: 'math', label: 'math '},
      { value: 'mathematics', label: 'mathematics '},
      { value: 'media', label: 'media '},
      { value: 'music', label: 'music '},
      { value: 'music and performance', label: 'music and performance '},
      { value: 'national pan-hellenic council', label: 'national pan-hellenic council '},
      { value: 'panhellenic association', label: 'panhellenic association '},
      { value: 'political', label: 'political '},
      { value: 'political science', label: 'political science '},
      { value: 'pre-professional', label: 'pre-professional '},
      { value: 'psychology', label: 'psychology '},
      { value: 'public health', label: 'public health '},
      { value: 'service and changemaking', label: 'service and changemaking '},
      { value: 'social', label: 'social '},
      { value: 'spiritual', label: 'spiritual '},
      { value: 'sports', label: 'sports '},
      { value: 'student affirmative actions committee', label: 'student affirmative actions committee '},
      { value: 'student organization', label: 'student organization '},
      { value: 'sustainability', label: 'sustainability '},
      { value: 'ucsd', label: 'ucsd '},
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
