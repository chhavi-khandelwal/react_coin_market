import React from 'react';
import './limiter.scss';
import { connect } from "react-redux";
import { fetchCoins } from '../../redux/actions';
import { coinsFetchLimit } from '../../shared/constants/constants';

class Limiter extends React.Component {
  fetchLimit = (e) => {
    let val = e.target.value;
    this.props.fetchAction(val);
  }

  render() {
    return (
      <div className="coin-limiter">
         <label htmlFor="select">Fetch </label>
        <select onChange={ (e) => this.fetchLimit(e) }  id="select">
          {
            coinsFetchLimit.map((fetchLimit) => 
              <option
                key= { fetchLimit.name }
                value={ fetchLimit.value }>
                  { fetchLimit.name }
              </option>)
          }
          
        </select>
        <span> coins</span>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAction: (limit) => dispatch(fetchCoins(limit))
});

export default connect(
  null,
  mapDispatchToProps
)(Limiter);
