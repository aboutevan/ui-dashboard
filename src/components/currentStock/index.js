import React, { Component } from 'react';
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  Legend
} from 'recharts';

const data = [
  {
    label: 'Oct 5, 2017',
    close: 61.55,
    high: 59.84
  },
  {
    label: 'Oct 6, 2017',
    close: 1.55,
    high: 5.84
  },
  {
    label: 'Oct 7, 2017',
    close: 651.55,
    high: 7.84
  }
];

class CurrentStock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charts: {}
    };
  }

  // mapChartsToData(data) {
  //   const charts = data.map(chart => (

  //     ))
  //   this.setState({
  //     charts: charts,
  //   })
  // }

  render() {
    return (
      <div>
        {this.props.currentStock.chart && (
          <div>
            <div>{this.props.isFetchingStock ? 'true' : 'false'}</div>
            <div>{this.props.currentStock.symbol}</div>
            <div>{this.props.currentStock.name}</div>
            <div>{this.props.currentStock.id}</div>
            <AreaChart
              width={900}
              height={400}
              data={this.props.currentStock.chart['1m']}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="close"
                stroke="#ff7300"
                fill="#ff7300"
                dot={null}
                stackId="1"
              />
              <Area
                type="monotone"
                dataKey="high"
                stroke="#387908"
                fill="#387908"
                stackId="1"
              />
            </AreaChart>
          </div>
        )}
      </div>
    );
  }
}

export default CurrentStock;
