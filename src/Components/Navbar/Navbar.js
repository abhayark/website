import React from 'react'
import './navbar.css'; 
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import Avatar from '@mui/joy/Avatar';
import {useNavigate} from 'react-router-dom';

function Navbar() {

    const goto = useNavigate();

  return (
    <div className='container'>
      
      <div className='logo'>
        <img src="/Assets/logo.png" alt='Logo' className='img' ></img>
      </div>

      <div className='func'>
          <div className='home'>
            <button onClick={() =>goto('/')} className='homebn'>
              home
            </button>
          </div>

          <div className='Basket'>
            <button onClick={() =>goto('/')} className='basketbn'>
              Basket
            </button>
          </div>
          
      </div>
    {/*
      <div className='search'>
        <SearchSharpIcon className='searchicon'/>
        <input type="text" placeholder="What's today?" className='searchbar'/>
      </div>
    */}

      <div className='register'>
        <button onClick={()=>goto('/signin')} className='bn'>
          <Avatar variant="plain" className='avator'/>
          </button>
    
      </div>
    </div>
  )
}

export default Navbar
