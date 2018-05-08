/**
 * Created by rozer on 5/1/2018.
 */
import React, { Component } from 'react'
import { StyleSheet, Text,View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { reciveDecks } from '../action'
import { white, darkBlue } from '../utils/colors'
import { getDecks } from '../utils/api'

class Decks extends Component {

    async componentDidMount(){
        const { dispatch } = this.props;
       await getDecks().then((decks) => dispatch(reciveDecks(JSON.parse(decks))))
    }

    render() {
        const { deck } = this.props;
        const deckValue = Object.values(deck);

        return (
            <View style={styles.container}>
                {
                    Object.values(deckValue[0]).map((decks)=>{
                        return(
                            <TouchableOpacity key={decks.title} onPress={() => this.props.navigation.navigate('Deck', {id: decks.title})}>
                                <View style={styles.decks}>
                                    <Text style={{fontSize: 30, fontWeight: 'bold'}}>{decks.title}</Text>
                                    <Text style={styles.card}>
                                        {decks.questions.length} {decks.questions.length > 1 ? 'cards' : 'card'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkBlue,
        alignItems:'center'
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
        marginTop:20,
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
    }
});

function mapStateToProps (deck) {
    return {
        deck
    }
}

export default connect(mapStateToProps)(Decks)
