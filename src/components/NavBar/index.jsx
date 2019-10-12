import React from 'react';
import './navBar.scss';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import GraphBoard from '../ChartBoard';
import CryptoList from '../CryptoList';

class NavBar extends React.Component {
  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li><NavLink to="/" exact id="overview">Overview</NavLink></li>
            <li><NavLink to="/liquidity" activeClassName="active" id="liquidity">Liquidity</NavLink></li>
          </ul>
        </nav>
        <Route exact path="/" component={ CryptoList } />
        <Route path="/liquidity" component={ GraphBoard } />
      </Router>
    )
  }
}

export default NavBar;
