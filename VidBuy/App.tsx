
import AppNavigator from './navigation/index';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import Constants from "expo-constants";
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize("b4ea2016-3636-4a96-a550-e20e60be8147");
    
    OneSignal.Notifications.requestPermission(true);
    
  }, []);
  return (
    <AppNavigator></AppNavigator>
  );
}
