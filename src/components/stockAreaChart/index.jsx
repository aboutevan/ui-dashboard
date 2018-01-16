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

class StockChartArea extends Component {
  render() {
    return (
      <AreaChart
        width={900}
        height={400}
        data={this.props.data}
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
          stroke="#0088FE"
          fill="#0088FE"
          dot={null}
          stackId="1"
        />
        <Area
          type="monotone"
          dataKey="high"
          stroke="#00C49F"
          fill="#00C49F"
          stackId="1"
        />
      </AreaChart>
    );
  }
}

export default StockChartArea;
