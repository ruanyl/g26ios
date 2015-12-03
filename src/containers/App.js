import React from 'react-native';
import { connect } from 'react-redux/native';
import Footer from '../components/Footer';
import Day from '../components/Day';
import Month from '../components/Month';
import All from '../components/All';
import Edit from '../components/Edit';
import Add from '../components/Add';
import Header from '../components/Header';
import {
  dayViewAction,
  monthViewAction,
  allViewAction,
  openAddViewAction,
  closeAddViewAction,
  closeEditViewAction,
  syncToDbAction,
} from '../actions/uiActions';
import {
  saveAction,
  updateAction,
} from '../actions/addActions';
const {
  StyleSheet,
  View,
  ScrollView,
} = React;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(dayViewAction());
  }

  getView() {
    const { ui } = this.props;
    if(ui.view === 'day') {
      return <Day />;
    } else if(ui.view === 'month') {
      return <Month />;
    } else if(ui.view === 'all') {
      return <All />;
    }
  }

  render() {
    const { ui } = this.props;
    return (
      <View style={ styles.container }>
        <Add
          visible={ ui.showAdd }
          onSave={ (event) => this.props.dispatch(saveAction(event)) }
          onClose={ () => this.props.dispatch(closeAddViewAction()) }
        />
        <Edit
          visible={ !ui.showAdd && ui.showEdit }
          onUpdate={ (event) => this.props.dispatch(updateAction(event)) }
          onClose={ () => this.props.dispatch(closeEditViewAction()) }
        />
        <Header
          sync={ () => this.props.dispatch(syncToDbAction()) }
          addView={ () => this.props.dispatch(openAddViewAction()) }
        />
        <ScrollView style={styles.content }>
          { this.getView() }
        </ScrollView>
        <Footer
          dayView={ () => this.props.dispatch(dayViewAction()) }
          monthView={ () => this.props.dispatch(monthViewAction()) }
          allView={ () => this.props.dispatch(allViewAction()) }
          currentView={ ui.view }
        />
      </View>
    );
  }
}

function select(state) {
  return {
    ui: state.uiState,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    backgroundColor: '#eee',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(select)(App);
