import React from "react";
import { Link } from "react-router-dom";

const AdminNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/phones" className="nav-link">
          Phones
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/brand" className="nav-link">
          Brand
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/isp" className="nav-link">
          ISP
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/material" className="nav-link">
          Material
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/admin/feature" className="nav-link">
          Feature
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Password
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdminNav;
