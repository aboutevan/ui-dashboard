import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actions } from '../../reducers/reducers_stocksList';

const { requestData } = actions;

class StocksListContainer extends React.Component {
  static propTypes: {
    children: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
  }

  render() {
    console.log('From container: ', this.props.entities);
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
  entities: state.stocksList.entities
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestData
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  StocksListContainer
);
