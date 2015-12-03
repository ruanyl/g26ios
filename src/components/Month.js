import React from 'react-native';
import { connect } from 'react-redux/native';
import Event from './Event';
import { deleteEventAction, editEventAction } from '../actions/uiActions';
const {
  StyleSheet,
  Text,
  View,
} = React;

class Month extends React.Component {
  _handleEventDelete(id) {
    this.props.dispatch(deleteEventAction(id));
  }

  _handleEventEdit(event) {
    this.props.dispatch(editEventAction(event));
  }

  render() {
    const { ui } = this.props;
    return (
      <View style={{ backgroundColor: '#eee' }}>
        <View style={ styles.dividerWrap }>
          <Text style={ styles.divider }>Event of This Month</Text>
        </View>
        { ui.data.map((item) => {
          return <Event
            key={item._id}
            {...item}
            handleEventDelete={this._handleEventDelete.bind(this)}
            handleEventEdit={this._handleEventEdit.bind(this)}
          />;
        }) }
      </View>
    );
  }
}

var styles = StyleSheet.create({
  divider: {
    fontSize: 13,
    fontWeight: 'bold',
    padding: 8,
    color: '#333',
  },
  dividerWrap: {
    marginTop: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
});

export default connect(state => ({
  ui: state.uiState,
}))(Month);
