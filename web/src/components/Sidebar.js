import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css'; // ✅ fixed CSS import
import { LuFilePen } from "react-icons/lu";
import { GiProgression } from "react-icons/gi"; // ✅ replaced invalid icon
import { CgProfile } from "react-icons/cg";     // ✅ replaced invalid icon
import { MdLogout } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

function SidePanel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setTimeout(() => {
      navigate("/");
    }, 0);
  };

  const navItems = [
    { to: "/home/assignments", icon: <FaTasks />, label: "Assignments" },
    { to: "/home/progress", icon: <GiProgression />, label: "EvalProgress" },
    { to: "/home/profile", icon: <CgProfile />, label: "UserInfo" },
  ];

  return (
    <div className="sidebar bg-primary shadow-sm">
      <div className="sidebar-header text-center py-3">
        <NavLink className="sidebar-brand" to="/home/test">
          <h3 className="text-white">Student Portal</h3>
        </NavLink>
      </div>
      <ul className="sidebar-nav" style={{ listStyle: "none" }}>
        {navItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? 'active-nav' : ''}`}
              to={item.to}
              aria-label={item.label}
            >
              {item.icon} <span style={{ marginLeft: '8px' }}>{item.label}</span>
            </NavLink>
          </li>
        ))}
        <li className="nav-item">
          <button
            className="nav-link logout-button"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <MdLogout /> <span style={{ marginLeft: '8px' }}>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SidePanel;
