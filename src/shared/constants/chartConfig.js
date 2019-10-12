export const chartOptions = {
  title: {
    display: true,
    text: 'Market Capitalization vs Volume (24h) vs Absolute Price Change (%)'
  },
  scales: {
    yAxes: [{ 
      scaleLabel: {
        display: true,
        labelString: 'Volume (24h) - 10^9 (in $)'
      },
      ticks: {
        beginAtZero: true,
        min: 0,
        userCallback: function(tick) {
          return tick / 10e9;
        }
      },
      labels: {
        show: true
      }
    }],
    xAxes: [{ 
      scaleLabel: {
        display: true,
        labelString: 'Market Capitalization - 10^10 (in $)'
      },
      ticks: {
        beginAtZero:true,
        min: 0,
        userCallback: function(tick) {
          return tick / 10e10;
        }
      },
      labels: {
        show: true
      }
    }]
  },
  legend: { 
    labels: {
      fontSize: 0,
      display: 'none'
    },
    display: false
  },
  maintainAspectRatio: false,
  hover: {
    mode: 'nearest',
    intersect: false
  },
  tooltips: {
    mode: 'nearest',
    intersect: false
  }
};

export const getDataSet = (coins) => {
  return coins.reduce((dataset, coin) => {
    const {
      percent_change_24h,
      market_cap,
      volume_24h
    } = coin.quote.USD;
    return [...dataset, {
          label: coin.name + ' (priceChange(z-axis): ' + Math.abs(percent_change_24h) + ')',
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          data: [{ x: market_cap, y: volume_24h, r: 5 }],
          pointHoverRadius: 10,
        }]
      }
    , []);
};
