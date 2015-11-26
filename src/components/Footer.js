import React from 'react-native';
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} = React;

class Footer extends React.Component {
  render() {
    return (
      <View style={ styles.container }>
        <TouchableOpacity
          style={ styles.item }
          onPress={ this.props.dayView }>
          <View>
            <Text style={ styles.textHighlight }>DAY</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={ styles.item }
          onPress={ this.props.monthView }>
          <View>
            <Text style={ styles.text }>Month</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={ styles.item }
          onPress={ this.props.allView }>
          <View>
            <Text style={ styles.text }>ALL</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    height: 45,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#666',
    fontSize: 11,
  },
  textHighlight: {
    textAlign: 'center',
    color: '#2185C5',
    fontSize: 11,
  },
});

module.exports = Footer;
