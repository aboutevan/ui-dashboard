import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actions } from '../../reducers/reducers_stocksList';
import { actions as currentStockActions } from '../../reducers/reducers_currentStock';

const { requestData } = actions;
const { setCurrentStock, requestCurrentStock } = currentStockActions;

class StocksListContainer extends React.Component {
  static propTypes: {
    children: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.children(this.props)}</div>;
  }
}

// const StocksListContainer = wrappedComponent => props => {
//   return (
//     <div>
//       {props.children()}
//     </div>
//     )
// };

const mapStateToProps = state => ({
  isFetching: state.stocksList.isFetching,
  didReset: state.stocksList.didReset,
  entities: state.stocksList.entities,
  currentStock: state.currentStock.currentStock
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestData,
      setCurrentStock,
      requestCurrentStock
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  StocksListContainer
);
