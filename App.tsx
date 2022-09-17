import { useRef, useEffect } from 'react'
import { StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold , Inter_900Black } from '@expo-google-fonts/inter';
import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import { Background } from './src/components/Background';
import './src/services/notificationConfig';
import { getPushNotificationToken } from './src/services/getNotificationToken';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';



export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  });

  const getNotificationListener = useRef<Subscription>();
  const responsetNotificationListener = useRef<Subscription>();

  useEffect(()=> {
    getPushNotificationToken();
  });

  useEffect(()=>{
    getNotificationListener.current = Notifications.addNotificationReceivedListener(Notification => {
      console.log(Notification);
    });

    responsetNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response =>{
      console.log(response);
    })

    return () => {
      if(getNotificationListener.current && responsetNotificationListener.current){
        Notifications.removeNotificationSubscription(getNotificationListener.current);
        Notifications.removeNotificationSubscription(responsetNotificationListener.current);
      }
    }

  },[])

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
