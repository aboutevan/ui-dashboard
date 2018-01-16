import React, { Component } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

class StockPieChart extends Component {
  render() {
    const { profitMargin } = this.props.data;
    const colors = ['#0088FE', '#00C49F'];
    const data = [
      {
        name: 'Profit Margin',
        value: profitMargin
      },
      {
        name: 'Other label',
        value: 100 - profitMargin
      }
    ];

    return (
      <div>
        <h3 className="text-right">Profit Margin: {profitMargin}%</h3>

        <ResponsiveContainer height={350}>
          <PieChart>
            <Pie
              cx={500}
              cy={200}
              innerRadius={100}
              outerRadius={130}
              fill={'#82ca9d'}
              data={data}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={colors[index]}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default StockPieChart;
