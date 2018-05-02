import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { TabNavigator } from 'react-navigation'
import Decks from './component/Decks'
import NewDeck from './component/NewDeck'
import { Constants } from 'expo'
import Deck from './component/Deck'

function FlashCardStatusBar() {
    return(
        <View>
            <StatusBar/>
        </View>
    )
}

const Tabs = TabNavigator({
    Decks: {
        screen: Decks
    },
    NewDeck: {
        screen: NewDeck
    }
});

export default class App extends React.Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <FlashCardStatusBar/>
                <Tabs/>
            </View>
        );
    }
}

