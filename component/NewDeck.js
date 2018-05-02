/**
 * Created by rozer on 5/1/2018.
 */
import React, { Component } from 'react'
import { white } from '../utils/colors'
import *as api from '../utils/api'
import { StyleSheet, Text,View, TextInput, Button } from 'react-native'

class NewDeck extends Component {

    constructor(){
        super();
        this.state = {title: ''};
    }

    submit() {
        api.saveDeckTitle(deckTitle=this.state.title);
        console.log(api.getDecks());
    };
    
    render() {
        return(
            <View style={styles.container}>
                <Text>What is the title of your new deck?</Text>
                <TextInput  onChangeText={(title) => this.setState({title: title})} />
                <Button title='Submit' onPress={this.submit.bind(this)} />
            </View>
    )
    }
}

const styles = StyleSheet.create({
    container: {
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

export default NewDeck
