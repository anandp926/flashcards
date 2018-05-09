/**
 * Created by rozer on 5/10/2018.
 */
import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'FlashCard:notifications';

export function clearNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
    return {
        title: 'Daily learn',
        body: "don't forget to learn new Deck today!",
        ios: {
            sound: true
        },
        android: {
            sound:true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if(data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({status}) => {
                        if(status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()
                            
                            let tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            tomorrow.setHours(10)
                            tomorrow.setMinutes(0)
                            
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: tomorrow,
                                    repeat: 'day'
                                }
                            )
                            
                            AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
                        }
                    })
            }
        })
}
