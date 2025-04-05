import React, { useEffect } from 'react';
import { OneSignal, LogLevel } from 'react-native-onesignal';

import AppNavigator from './navigation';

export default function App() {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    OneSignal.initialize('b4ea2016-3636-4a96-a550-e20e60be8147');

    OneSignal.Notifications.requestPermission(true);
    

    OneSignal.Notifications.addEventListener('click', (event) => {
      console.log('Notificação clicada:', event);
    });
  }, []);

  return <AppNavigator />;
}
