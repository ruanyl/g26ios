/*
import React, {Component} from 'react';
import Toolbar from '../components/Toolbar';
import Add from '../components/Add';
import Day from '../components/Day';
import Month from '../components/Month';
import {connect} from 'react-redux';
import {dayViewAction, monthViewAction, toggleAddViewAction, syncToDbAction, allViewAction} from '../actions/uiActions';
const GoogleApi = require('google-client-api');

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

var CLIENT_ID = '957450400131-vqf3qkdtpp5gah1rt51ssnltll5am365.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar"];

class App extends Component {

  componentDidMount() {
    this.props.dispatch(dayViewAction());
  }

  handleDayView() {
    this.props.dispatch(dayViewAction());
  }

  handleMonthView() {
    this.props.dispatch(monthViewAction());
  }

  handleAllView() {
    this.props.dispatch(allViewAction());
  }

  handleAddView() {
    this.props.dispatch(toggleAddViewAction());
  }

  handleSync() {
    GoogleApi((gapi) => {
      this.gapi = gapi;
      gapi.auth.authorize(
        {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
        this.handleAuthResult.bind(this)
      );
    });
  }

  handleAuthResult(authResult) {
    if (authResult && !authResult.error) {
      this.loadCalendarApi();
    } else {
      console.error(authResult.error || "Failed to authorize application");
    }
  }

  loadCalendarApi() {
    this.gapi.client.load('calendar', 'v3', this.listUpcomingEvents.bind(this));
  }

  listUpcomingEvents() {
    const request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    });
    request.execute((res) => {
      const events = res.items;
      this.props.dispatch(syncToDbAction(events));
    });
  }

  getView() {
    const {ui} = this.props;
    if(ui.view === 'day') {
      return <Day />;
    } else if(ui.view === 'month') {
      return <Month />;
    }
  }

  render() {
    const {ui} = this.props;
    return (
      <div className='main'>
        <Toolbar
          dayView={this.handleDayView.bind(this)}
          monthView={this.handleMonthView.bind(this)}
          allView={this.handleAllView.bind(this)}
          sync={this.handleSync.bind(this)}
          addView={this.handleAddView.bind(this)} />
        { this.getView() }
        <Add showAdd={ui.showAdd} />
      </div>
    );
  }

}

function select(state) {
  return {
    ui: state.uiState
  };
}
*/
import React from 'react-native';
import { connect } from 'react-redux/native';
import Footer from '../components/Footer';
import Day from '../components/Day';
import {
  dayViewAction,
  monthViewAction,
  allViewAction
} from '../actions/uiActions';
const {
  StyleSheet,
  Text,
  View,
  ScrollView,
} = React;

class App extends React.Component {
  handleDayView() {
    this.props.dispatch(dayViewAction());
  }

  handleMonthView() {
    this.props.dispatch(monthViewAction());
  }

  handleAllView() {
    this.props.dispatch(allViewAction());
  }

  getView() {
    const {ui} = this.props;
    if(ui.view === 'day') {
      return <Day />;
    } else if(ui.view === 'month') {
      return <Month />;
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView>
          { this.getView() }
        </ScrollView>
        <Footer
          dayView={this.handleDayView.bind(this)}
          monthView={this.handleMonthView.bind(this)}
          allView={this.handleAllView.bind(this)}
        />
      </View>
    );
  }
};

function select(state) {
  return {
    ui: state.uiState
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
