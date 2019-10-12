import React from 'react';
import './chartBoard.scss';
import { Bubble } from 'react-chartjs-2';
import { connect } from "react-redux";
import Loader from '../Loader';
import { chartOptions, getDataSet } from '../../shared/constants/chartConfig';

class ChartBoard extends React.Component {
  render() {
    const { coins, loading } = this.props, 
      chartData = {
        datasets: []
      };

    chartData.datasets = getDataSet(coins);
    return (
      <div>
        { loading && <Loader></Loader> }
        <div className={ loading ? 'hide' : '' }>
          <Bubble
            data={ chartData }
            options={ chartOptions }
            width={ 500 }
            height={ 400 }/>
        </div>      
      </div>
    )
  }
}

//update props to re-render
const mapStateToProps = state => {
  const { coins, loading } = state.reducer;
  return { coins, loading };
};

export default connect(
  mapStateToProps,
  null
)(ChartBoard);