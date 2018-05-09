/**
 * Created by rozer on 5/1/2018.
 */
import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    FlatList
} from 'react-native'
import { connect } from 'react-redux'
import { reciveDecks } from '../action'
import { white, darkBlue } from '../utils/colors'
import { getDecks } from '../utils/api'
import { AppLoading} from 'expo'

class Decks extends Component {

    state = {
        bounce: new Animated.Value(0.95),
        opacity: new Animated.Value(0)
    };

    async componentDidMount(){
        const { dispatch } = this.props;
        const { opacity, bounce } = this.state;
        await this.props.reciveDecks();
        Animated.timing(opacity, {toValue: 1, duration:1000}).start();
        Animated.sequence([
            Animated.timing(bounce, { duration: 1000, toValue: 1.01}),
            Animated.spring(bounce, { toValue:1, friction: 4})
        ]).start();
    }

    render() {
        const { deck } = this.props;
        const deckValue = Object.values(deck);
        const { bounce, opacity } = this.state;
        return (
            <View style={styles.container}>
                <FlatList
                    data={Object.values(deckValue[0])}
                    renderItem={({item: {questions, title}}) => {
                        return(
                            <View style={{alignItems:'center'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', {id: title})}>
                                    <Animated.View style={[styles.decks,{ opacity },{transform:[{scale: bounce}]} ]}>
                                        <Text style={{fontSize: 30, fontWeight: 'bold'}}>{title}</Text>
                                        <Text style={styles.card}>
                                            {questions.length} {questions.length > 1 ? 'cards' : 'card'}
                                        </Text>
                                    </Animated.View>
                                </TouchableOpacity>
                            </View>
                                    
                        )
                    }}
                    keyExtractor={item=> item.title}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkBlue
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

const mapDispatchToProps = (dispatch) =>({
    reciveDecks: () => getDecks().then(data => dispatch(reciveDecks(JSON.parse(data))))

});

export default connect(mapStateToProps,mapDispatchToProps)(Decks)
