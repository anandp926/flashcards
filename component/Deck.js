/**
 * Created by rozer on 5/1/2018.
 */
import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

class Deck extends Component {
    render() {
        return(
            <View>
                <Text>Deck Title</Text>
                <Text>Number of card</Text>
                <Button title='Add Card'/>
                <Button title='Start Quiz'/>
            </View>
        )
    }
}

export default Deck
