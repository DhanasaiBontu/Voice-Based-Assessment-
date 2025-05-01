import React from 'react'
import { SidePanel2 } from './Sidebar2';
import { Outlet } from 'react-router-dom'

function MainEntryPoint() {
  return (
    <div style={{display:'flex'}}>
        <SidePanel2 />
        <div style={{marginLeft:'250px',padding:'20px',width:'100%'}}>
            <Outlet/>
        </div>
        </div>
  )
}

export default MainEntryPoint
