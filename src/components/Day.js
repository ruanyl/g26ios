import React from 'react-native';
import { connect } from 'react-redux/native';
import Event from './Event';
import { deleteEventAction, editEventAction } from '../actions/uiActions';
import moment from 'moment';
const {
  StyleSheet,
  Text,
  View,
  ScrollView,
} = React;

class Day extends React.Component {
  constructor() {
    super();
    this.menuItems = [
      { payload: '1', text: 'Low' },
      { payload: '2', text: 'Medium' },
      { payload: '3', text: 'High' },
    ];
  }

  _handleEventDelete(id) {
    this.props.dispatch(deleteEventAction(id));
  }

  _handleEventEdit(event) {
    this.props.dispatch(editEventAction(event));
  }

  getDayData() {
    let dayData = {
      today: [],
      tomorrow: [],
      dayAfterTomorrow: []
    };
    this.props.uiState.data.forEach(function(current) {
      if(moment(current.start).isAfter(moment().startOf('day')) &&
        moment(current.start).isBefore(moment().endOf('day'))) {
          dayData.today.push(current);
      } else if(moment(current.start).isAfter(moment().startOf('day').add(1, 'd')) &&
        moment(current.start).isBefore(moment().endOf('day').add(1, 'd'))) {
          dayData.tomorrow.push(current);
      } else if(moment(current.start).isAfter(moment().startOf('day').add(2, 'd')) &&
        moment(current.start).isBefore(moment().endOf('day').add(2, 'd'))) {
          dayData.dayAfterTomorrow.push(current);
      }
    });
    return dayData;
  }

  render() {
    const dayData = this.getDayData();
    return (
      <View style={{ backgroundColor: '#eee' }}>
        <View style={ styles.block }>
          <View style={ styles.dividerWrap }>
            <Text style={ styles.divider }>TODAY</Text>
          </View>
          {dayData.today.map((item) => {
            return <Event
              key={item._id}
              {...item}
              handleEventDelete={this._handleEventDelete.bind(this)}
              handleEventEdit={this._handleEventEdit.bind(this)}
            />;
          })}
        </View>
        <View style={ styles.block }>
          <View style={ styles.dividerWrap }>
            <Text style={ styles.divider }>TOMOTTOW</Text>
          </View>
          {dayData.tomorrow.map((item) => {
            return <Event
              key={item._id}
              {...item}
              handleEventDelete={this._handleEventDelete.bind(this)}
              handleEventEdit={this._handleEventEdit.bind(this)}
            />;
          })}
        </View>
        <View style={ styles.block }>
          <View style={ styles.dividerWrap }>
            <Text style={ styles.divider }>DAY AFTER TOMORROW</Text>
          </View>
          {dayData.dayAfterTomorrow.map((item) => {
            return <Event
              key={item._id}
              {...item}
              handleEventDelete={this._handleEventDelete.bind(this)}
              handleEventEdit={this._handleEventEdit.bind(this)}
            />;
          })}
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  divider: {
    fontSize: 13,
    fontWeight: 'bold',
    padding: 8,
    color: '#333'
  },
  dividerWrap: {
    marginLeft: 10,
    marginRight: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  block: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
});

export default connect(state => ({
  uiState: state.uiState
}))(Day);
