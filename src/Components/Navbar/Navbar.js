import React from 'react'
import './navbar.css'; 
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

function Navbar() {
  return (
    <div className='container'>
      <div className='logo'>
        <img src="/Assets/Ark_logo.png" alt='Logo' className='img' ></img>
      </div>

      <div className='search'>
        <SearchSharpIcon className='searchicon'/>
        <input type="text" placeholder="What's today?" className='searchbar'/>
      </div>

    </div>
  );
}

export default Navbar
