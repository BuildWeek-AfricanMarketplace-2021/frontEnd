import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// const navstyle = styled.nav`
//   nav {
//     display: flex;
//     justify-content: space-around;
//     align-items: center;
//     min-height: 10vh;
//     background: greenyellow;
//   }
// `;

const Nav = () => {
  return (
    <div className="nav">
      <Link to="/">
        <h3>African MarketPlace</h3>
      </Link>
      <ul className="nav-links">
        <Link to="/login">
          <li>Login</li>
        </Link>
        <Link to="/additems">
          <li>Add-Items</li>
        </Link>
        <Link to="/signup">
          <li>Signup</li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
