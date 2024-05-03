import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Admin Dashboard</Link>
        </li>
        <li>
          <Link to="/articles">Article List</Link>
        </li>
        <li>
          <Link to="/submit-article">Submit Article</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
