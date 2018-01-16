import React, { Component } from 'react';
import StockChartArea from '../stockAreaChart';
import StockPieChart from '../stockPieChart';

class CurrentStock extends Component {
  render() {
    return (
      <div>
        {!this.props.currentStock && <h3>Please Select a stock</h3>}

        {this.props.isFetchingStock && <h3>Please Wait</h3>}

        {this.props.currentStock &&
          !this.props.isFetchingStock && (
            <div>
              <h2>{this.props.currentStock.companyName}</h2>
              <StockChartArea data={this.props.currentStock.chart['3m']} />
              <StockPieChart data={this.props.currentStock.stats} />
            </div>
          )}
      </div>
    );
  }
}

export default CurrentStock;
