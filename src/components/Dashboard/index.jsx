import React from 'react';
import './dashboard.scss';
import { connect } from "react-redux";
import { fetchCoins } from '../../redux/actions';
import Limiter from '../Limiter';
import NavBar from '../NavBar';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <Limiter></Limiter>
        <NavBar></NavBar>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchAction();
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAction: (limit) => dispatch(fetchCoins(limit))
});

export default connect(null, mapDispatchToProps)(Dashboard);
