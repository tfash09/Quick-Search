import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchValue, setSearchValue ] = useState('');
  const [error, setError ] = useState('');
  const [message, setMessage ] = useState('');
  const a = {
    user: {
        id: 1,
        name: {
            firstName: "James",
            lastName: "Ibori"
        },
        location: {
            city: "Ikoyi",
            state: "Lagos",
            address: "One expensive house like that"
        }
    }
  }

  const find = (obj, item) => {
      for (var key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            var result = find(obj[key], item);
            if (result) {
                result.unshift(key);
                return result;
            }
        } else if (obj[key] === item) {
            return [key];
        }
    }
  }

  const findFormatted = (obj, item) => {
    var path = find(obj, item);
    if (path == null) {
        return '';
    }
    return 'a.' + path.join('.');
  }

  const searchTerm = () => {
    setError('')
    setMessage('')
    if(searchValue === ""){
      setError('Search can not be empty')
      return false;
    }
    
    let path = findFormatted(a, searchValue);
    if(path === ''){
      setError('No result found')
      return false;
    }
    setMessage(path)

  }

  return (
    <div className="wrap">
      <div className="search">
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} id="searchTerm" className="searchTerm" placeholder="What are you looking for?" />
          <button type="submit" className="searchButton" onClick={searchTerm}>
            <i className="fa fa-search"></i>
          </button>
      </div>
      <span className="span">{error}</span>
      <span className="span2">{message}</span>
    </div>
  );
}

export default App;
