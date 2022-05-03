import React from 'react';
import { Navbar, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

export const Welcome = () => (
  <Navbar data-cy="navbar" dark expand="sm" fixed="top" className="jh-navbar">
    <div className="header-components"></div>
    <NavLink tag={Link} to="/book" className="d-flex libraryTitle">
      <h1>e-Library</h1>
    </NavLink>
  </Navbar>
);
