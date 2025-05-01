import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';


function Home() {
  const user = useSelector((state) => state.user.user);
  //console.log(user?.name, 'current user login')
  return (
    <div style={{ display: 'flex' }}>
      <SidePanel />
      <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
        {/* <h1 className='text-center text-primary mt-2'>Welcome {user?.name}</h1> */}
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
