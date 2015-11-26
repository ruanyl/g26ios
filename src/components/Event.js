import React from 'react-native';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';
const {
  StyleSheet,
  Text,
  View
} = React;

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.event = {
      _id: this.props._id,
      title: this.props.title,
      content: this.props.content,
      priority: this.props.priority,
      start: this.props.start,
      end: this.props.end
    };
    this.priorityMapping = {
      '1': 'Low',
      '2': 'Medium',
      '3': 'High'
    };
  }

  _handleEventEdit() {
    this.props.handleEventEdit(this.event);
  }

  _handleEventDelete() {
    this.props.handleEventDelete(this.props._id);
  }

  getRight() {
    const right = [
      {
        text: 'Edit',
        onPress: this._handleEventEdit.bind(this)
      },
      {
        text: 'Delete',
        backgroundColor: '#F10706',
        onPress: this._handleEventDelete.bind(this)
      }
    ];

    return right;
  }

  render() {
    return (
      <Swipeout
        right={ this.getRight() }
        autoClose={ true }
        >
        <View>
          <Text>{this.props.title}</Text>
          <Text>{this.props.content}</Text>
          <Text>{moment(this.props.start).format('MM/DD H:m')} to {moment(this.props.end).format('MM/DD H:m')}</Text>
        </View>
      </Swipeout>
    );
  }

}
