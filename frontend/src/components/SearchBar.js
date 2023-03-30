import React, { useState, useRef, useEffect} from 'react';
import Select from 'react-select';
import './../styles/SearchBar.css';
import OrganizationCard from './OrganizationCard'
import Header from './Header.js';

function SearchBar() {
  const [searchBy, setSearchBy] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [resData, setResData] = useState(null);
  const listRef = useRef(null);

  const options = [
      { value: 'art', label: 'art '},
      { value: 'biology', label: 'biology '},
      { value: 'business and management', label: 'business and management '},
      { value: 'chemistry', label: 'chemistry '},
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

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [resData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form was submitted!');

    const REST_API_ENDPOINT = (searchBy === 'name') ? 
      'http://localhost:4000/api/search/name-and-description' : 
      'http://localhost:4000/api/search/tags';

    let value = (searchBy === 'name') ? searchText : selectedTag.label;
    value = value.trim();

    console.log(REST_API_ENDPOINT);
    console.log(value);

      try {
        const body = {queries: [value]};
        console.log(body)
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        };
        
        fetch(REST_API_ENDPOINT, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setResData(data);
          console.log(resData);
        })
        .catch((error) => {
          console.error(error);
        }
      );
      } catch (error) {
        console.error('Error submitting form data:', error);
      }
  };

  const customStyle = {
    control: (styles) => ({
      ...styles,
      borderColor: '#9e9e9e',
      height: '70px',
      width: '100%',
      paddingLeft: '25px'
    }),
    option: (provided) => ({
      ...provided,
      paddingLeft: '30px',
    }),
  };

  return (
    <div className='outer'>
    <form className="select-container" onSubmit={handleSubmit}>
      <h1 className='heading'>Get Involved.</h1>
      <h2>Student Organizations @ UCSD</h2>
      <div className="search-options-container">
        <div className='checkbox-container'>
          <input type="radio" id="search-by-name" name="search-by" value="name" checked={searchBy === 'name'} onChange={handleSearchByChange} />
          <label htmlFor="search-by-name">Search by Name</label>
        </div>
        <div className='checkbox-container'>
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
    
    <div className='org-list-container' style={{ marginTop: '100vh' }} ref={listRef}>
      {
        resData !== null && (
          resData.map(org => {
            return <OrganizationCard 
              key={org.name}
              name={org.name}
              description={org.description}
              link={org.link}
              final_tags={org.final_tags}  
              upvotes={org.upvote_count}
            />
          })
        )
      }
    </div>
    {resData !== null && <div className='footer'></div>}

    <Header />
    </div>
  );
}

export default SearchBar;