import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import thunk from 'redux-thunk'
import Decks from './component/Decks'
import NewDeck from './component/NewDeck'
import Deck from './component/Deck'
import AddCard from './component/AddCard'
import Quiz from './component/Quiz'
import reducers from './reducer'
import { setLocalNotification } from './utils/Notification'
import './ReactotronConfig'
import {white, lightBlue, darkBlue} from './utils/colors'

const store = createStore(reducers, applyMiddleware(thunk));

function FlashCardStatusBar({backgroundColor, ...props}) {
    return(
        <View style={{backgroundColor, height:Constants.statusBarHeight}}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor }) => <Ionicons name='ios-paper-outline' size={30} color={tintColor} />
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'New Deck',
            tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
        }
    }
},
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: white,
            style: {
                height: 56,
                backgroundColor: lightBlue,
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    }
);

const MainNavigation = StackNavigator({
    Hone: {
        screen: Tabs
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: lightBlue
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: lightBlue
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Add Card',
            headerTintColor: white,
            headerStyle: {
                backgroundColor: lightBlue
            }
        }
    }
});

export default class App extends React.Component {

    componentDidMount(){
        setLocalNotification()
    };
    
    render() {
        return (
            <Provider store={store}>
                <View style={{flex: 1}}>
                    <FlashCardStatusBar backgroundColor={darkBlue} barStyle="light-content"/>
                    <MainNavigation/>
                </View>
            </Provider>

        );
    }
}

