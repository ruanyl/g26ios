import thunkMiddleware from 'redux-thunk';

import React from 'react-native';
import App from './containers/App';
import {applyMiddleware, createStore, compose} from 'redux';
import { Provider } from 'react-redux/native';
import reducers from './reducers/reducers';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware),
)(createStore);

const store = createStoreWithMiddleware(reducers);

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}
