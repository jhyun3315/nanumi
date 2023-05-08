import messaging from '@react-native-firebase/messaging';
import AsynStorage from '@react-native-async-storage/async-storage';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
};

async function getFCMToken() {
  let fcmtoken = await AsynStorage.getItem('fcmtoken');
  console.log(fcmtoken, 'oldtoken');
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        await AsynStorage.setItem('fcmtoken', fcmtoken);
      } else {
      }
    } catch (error) {
      console.log(error, ' error in fcmtoken');
    }
  }
}

export const NotificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification cause app to open from quit stae',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('notification on frorground state...', remoteMessage);
  });
};
