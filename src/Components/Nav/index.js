import React from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';
import { NAV_ITEMS } from './constants';

function Nav() {

  function renderMenuItems() {
    return NAV_ITEMS.map((navItem) => {
      return (
        <Menu.Item key={navItem.name}>
          <Link to={navItem.path}>
            { navItem.name }
          </Link>
        </Menu.Item>
      )
    });
  }

  return (
    <Menu>
      { renderMenuItems() }
    </Menu>
  );
}

export default Nav;
