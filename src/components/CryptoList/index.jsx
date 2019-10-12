import React from 'react';
import './cryptoList.scss';
import { connect } from "react-redux";
import Loader from '../Loader';
import { getFormattedString } from '../../shared/utils/helpers';
import { LIMITER } from '../../shared/constants/constants';
import ReactPaginate from 'react-paginate';
import { fetchCoins } from '../../redux/actions';

class CryptoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinsOnPage: []
    };
  }

  //pagination logic for slicing coins to show 10 per page
  fetchPageCoins = (pageNumber) => {
    const currentPage = Number(pageNumber.selected), { limit } = this.props;
    const start = currentPage ? limit - (((limit/LIMITER) - (currentPage)) * LIMITER) : 0;
    this.clicked = true;
    this.setState({
      coinsOnPage: this.props.coins.slice(start, start + LIMITER)
    });
  }

  render() {
    const { coins, loading, limit } = this.props;
    const coinsOnPage = this.state.coinsOnPage.length && this.clicked ? this.state.coinsOnPage : coins.slice(0, LIMITER);
    //to re-render coins list from 0     
    this.clicked = false;

    return (
      <div className="crypto-container">
        { loading && <Loader></Loader> }
        <div className={ (loading ? 'hide' : '') }>
          { 
            !loading && <ReactPaginate
            previousLabel={ '<' }
            nextLabel={ '>' }
            breakLabel={ '...' }
            forcePage={  this.state.coinsOnPage.length ? 0 : 0 }
            breakClassName={'break-me'}
            pageCount={ Math.ceil(coins.length / LIMITER) }
            pageRangeDisplayed={ 5 }
            onPageChange={ this.fetchPageCoins }
            containerClassName={ 'pagination' }
            subContainerClassName={ 'pages  pagination' }
            activeClassName={ 'active' }/>
          }
          <ul className={ 'cryptolist  ' + (loading ? 'hide' : '') }>
            <li className="cryptolist__heading">
              <span>Rank</span>
              <span>Name</span>
              <span>Price</span>
              <span>Price Change(24h)</span>
              <span>Market Cap</span>
              <span>Volume</span>
            </li>
            
            { coinsOnPage.map((coin) => {
                return (
                  <li key={ coin.id } className="cryptolist__item">
                    <span>{ coin.cmc_rank }</span>
                    <span>{ coin.name }</span>
                    <span>$ { getFormattedString(coin.quote.USD.price) }</span>
                    <span>{ coin.quote.USD.percent_change_24h } %</span>
                    <span>$ { getFormattedString(coin.quote.USD.market_cap) }</span>
                    <span>$ { getFormattedString(coin.quote.USD.volume_24h) }</span>
                  </li>
                ) 
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

// update props to re-render
const mapStateToProps = state => {
  const { coins, loading, limit } = state.reducer;
  return { coins, loading, limit };
};

const mapDispatchToProps = dispatch => ({
  fetchAction: (limit) => dispatch(fetchCoins(limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(CryptoList);
