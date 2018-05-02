/**
 * Created by rozer on 5/1/2018.
 */
import React, { Component } from 'react'
import { StyleSheet, Text,View } from 'react-native'
import { white } from '../utils/colors'
import { getDecks } from '../utils/api'

class Decks extends Component {

    state = {
        deck: []
    };
    
    componentDidMount(){
        getDecks().then(deck => {
            this.setState({
                deck:deck
            })
        })
    }

    render() {
        console.log(this.state.deck)
        return (
            <View>
                <View style={styles.decks}>
                    <Text>Decks Title</Text>
                    <Text>Number of cards inside deck</Text>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    decks: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        }
    }
});

export default Decks
