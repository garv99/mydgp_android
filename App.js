import React from 'react';
import Routes from './src/routes/Routes';
import {Provider} from 'react-redux';
import Toast, {SuccessToast, ErrorToast} from 'react-native-toast-message';
import store from './store';

const toastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      text1Style={{
        fontSize: 14,
      }}
      text1NumberOfLines={4}
      text2NumberOfLines={4}
    />
  ),
  error: props => (
    <ErrorToast {...props} text1NumberOfLines={4} text2NumberOfLines={4} />
  ),
};

const App = () => {
  return (
    <Provider store={store}>
        <Routes />
        <Toast config={toastConfig} />
    </Provider>
  );
}

export default App;
