import React from 'react-native';
import moment from 'moment';
import Swipeout from 'react-native-swipeout';
const {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} = React;

export default class Header extends React.Component {
  render() {
    return (
      <View style={ styles.header }>
        <TouchableOpacity
          style={ styles.item }
          onPress={ this.props.addView }>
          <View style={ styles.button }>
            <Text style={{ color: 'white' }}>ADD</Text>
          </View>
        </TouchableOpacity>
        <View style={ styles.title }>
          <Text style={{ color: 'white' }}>Calendar</Text>
        </View>
        <TouchableOpacity
          style={ styles.item }
          onPress={ this.props.sync }>
          <View style={ styles.button }>
            <Text style={{ color: 'white' }}>SYNC</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#002635',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 40,
  },
  title: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
