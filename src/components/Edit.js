import React from 'react-native';
import { connect } from 'react-redux/native';
import {
  saveAction,
  updateAction,
} from '../actions/addActions';
import moment from 'moment';
const {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  DatePickerIOS,
  TextInput,
} = React;

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: props.editData._id,
      showStart: false,
      showEnd: false,
      title: props.editData.title,
      content: props.editData.content,
      priority: props.editData.priority,
      start: props.editData.start,
      end: props.editData.end,
    };
  }

  componentWillReceiveProps(nextPorps) {
    this.setState({
      _id: nextPorps.editData._id,
      title: nextPorps.editData.title,
      content: nextPorps.editData.content,
      priority: nextPorps.editData.priority,
      start: new Date(nextPorps.editData.start),
      end: new Date(nextPorps.editData.end),
    });
  }

  _handleSaveEvent() {
    let { _id, title, content, priority, start, end } = this.state;
    this.props.onUpdate({
      _id,
      title,
      content,
      priority,
      start,
      end,
    });
    this.setState({
      showStart: false,
      showEnd: false,
    });
  }

  _handleCloseAddView() {
    this.setState({
      showStart: false,
      showEnd: false,
    });
    this.props.onClose();
  }

  render() {
    let { editData } = this.props;
    return (
      <Modal
        visible={ this.props.visible }
        animated={ true }>
        <View style={ styles.header }>
          <Text style={{ color: 'white' }}>
            Edit an Event
          </Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={ () => this.setState({ showStart: !this.state.showStart }) }
            style={ styles.inputRow }>
            <Text>Choose Start Time</Text>
          </TouchableOpacity>
          { this.state.showStart ?
              <DatePickerIOS
                date={ this.state.start }
                mode='datetime'
                onDateChange={ (date) => this.setState({ start: date }) }
              /> : false
          }
          <TouchableOpacity
            onPress={ () => this.setState({ showEnd: !this.state.showEnd }) }
            style={ styles.inputRow }>
            <Text>Choose End Time</Text>
          </TouchableOpacity>
          { this.state.showEnd ?
            <DatePickerIOS
              date={ this.state.end }
              mode='datetime'
              onDateChange={ (date) => this.setState({ end: date }) }
            /> : false
          }
          <View style={{ borderBottomWidth: 1, borderColor: '#eee' }}>
            <TextInput
              style={ styles.inputText }
              value={ this.state.title }
              placeholder="Input title here"
              onChangeText={ (text) => this.setState({ title: text }) }
            />
          </View>
          <View style={{ borderBottomWidth: 1, borderColor: '#eee' }}>
            <TextInput
              style={ styles.inputText }
              value={ this.state.content }
              placeholder="Input Content here"
              onChangeText={ (text) => this.setState({ content: text }) }
            />
          </View>
          <TouchableOpacity
            onPress={ () => this._handleSaveEvent() }>
            <View style={ [styles.button, styles.buttonSave] }>
              <Text style={{ color: 'white' }}>Update</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => this._handleCloseAddView() }>
            <View style={ [styles.button, styles.buttonClose] }>
              <Text style={{ color: 'white' }}>Close</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    );
  }
}

var styles = StyleSheet.create({
  button: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    height: 30,
  },
  buttonClose: {
    backgroundColor: 'grey',
  },
  buttonSave: {
    backgroundColor: 'green',
  },
  header: {
    height: 45,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#002635',
  },
  inputRow: {
    flexDirection: 'row',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  inputText: {
    height: 30,
    paddingLeft: 15,
  }
});

function select(state) {
  return {
    editData: state.addData,
  };
}
export default connect(select)(Edit);
