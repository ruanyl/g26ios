import React from 'react-native';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';
const {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
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

  _onItemClick() {
    console.log(this.event);
  }

  render() {
    return (
      <Swipeout
        right={ this.getRight() }
        autoClose={ true }
        backgroundColor='#fff'
        >
        <TouchableOpacity
          style={ styles.listWrap }
          onPress={ this._onItemClick.bind(this) }>
          <View style={ styles.item }>
            <Text style={ styles.itemTitle }>{this.props.title}</Text>
            <Text style={ styles.itemContent }>{this.props.content}</Text>
            <Text style={ styles.itemTime }>{moment(this.props.start).format('MM/DD H:m')} to {moment(this.props.end).format('MM/DD H:m')}</Text>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }

}

var styles = StyleSheet.create({
  listWrap: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 13,
    color: '#666',
    fontWeight: 'bold',
    paddingBottom: 3,
  },
  itemContent: {
    fontSize: 12,
    color: '#999',
  },
  itemTime: {
    fontSize: 12,
    color: '#9c9c9c',
  },
});
