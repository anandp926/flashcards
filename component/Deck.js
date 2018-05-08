/**
 * Created by rozer on 5/1/2018.
 */
import React, { Component } from 'react'
import { View, Alert, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { darkBlue, white, yellow } from '../utils/colors'
import { capitalize } from '../utils/helper'

class Deck extends Component {

    static navigationOptions = ({ navigation }) =>{
        const { id } = navigation.state.params;
        return {
            title: capitalize(id)
        }
    };

    alertBox = () => {
        Alert.alert('Warning','Sorry! Card is not available for this Deck.',)
    };
    
    render() {
        const {id, deck} = this.props;
        const filterDeck = Object.values(deck[0]).filter((deck) => deck.title === id);
        return(
            <View style={styles.container}>
                <View style={styles.decks}>
                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>{this.props.navigation.state.params.id}</Text>
                    <Text style={styles.card}>
                        {filterDeck[0].questions.length} {filterDeck[0].questions.length > 1 ? 'cards' : 'card'}
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCard',{title:id})}>
                        <View style={styles.bothButton}>
                            <Text style={{fontWeight: 'bold', color:'#e0dede',fontSize: 20}}>Add Card</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={filterDeck[0].questions.length > 0  
                        ? () => this.props.navigation.navigate('Quiz',{id:id}) : this.alertBox
                        }
                    >
                        <View style={styles.bothButton}>
                            <Text style={{fontWeight: 'bold', color:yellow,fontSize: 20}}>Start Quiz</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkBlue,
        alignItems: 'center',
    },
    decks: {
        alignItems: 'center',
        backgroundColor: white,
        justifyContent: 'center',
        borderRadius: 300/4,
        borderWidth: 3,
        borderColor: '#73FF73',
        height: 100,
        width: 300,
        marginTop:35,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.8
    },
    card: {
        fontSize: 16,
        color: '#757575',
        fontWeight: 'bold'
    },
    buttons: {
        flex: 1,
        justifyContent: 'center',
    },
    bothButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: darkBlue,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#757575',
        width: 200,
        height: 60,
        marginBottom: 10,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.8
    }
});

function mapStateToProps(deck,{navigation}){
    const { id } = navigation.state.params
    return{
        id,
        deck: Object.values(deck)
    }
}

export default connect(mapStateToProps)(Deck)
