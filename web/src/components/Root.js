import React from 'react'
import { Outlet } from 'react-router-dom';
//import { SidePanel } from './SideBar/SideBar';


const BaseShell = () => {
    return (
      <div style={{display:'flex', alignItems:'center',flexDirection:'column'}}>
        <TopNavigation />
        {/* <Routes>
          <Route path="/" element={<StudentLogin />} />
          <Route path="/teacher-login" element={<TeacherLogin />} />
        </Routes> */}
        <Outlet />
      </ div>
    );
  };

export default BaseShell