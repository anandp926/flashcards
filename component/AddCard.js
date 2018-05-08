/**
 * Created by rozer on 5/5/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native'
import { yellow, darkBlue, white } from '../utils/colors'
import { addCardToDeck } from '../utils/api'
import { addCard }from '../action'

class AddCard extends Component {
    
    state = {
        question: '',
        answer: ''
    };
    
    submitCard = () => {
        const { dispatch } = this.props;
        const { title } = this.props.navigation.state.params;
        const card = {
            question: this.state.question,
            answer: this.state.answer
        };
        dispatch(addCardToDeck(title, card))
        addCard(title,card)
    };
    
    render() {
        return(
            <View style={styles.container}>
                <View style={{marginTop:25, marginBottom:30}}>
                    <Text style={{fontSize:30, fontWeight: 'bold', color: white}}>Make New Card</Text>
                </View>
                <View>
                    <TextInput 
                        style={styles.inputText} 
                        underlineColorAndroid= 'transparent' 
                        placeholder="Question"
                        onChangeText={(question) => this.setState({question: question})}
                    />
                    <TextInput 
                        style={styles.inputText} 
                        underlineColorAndroid= 'transparent' 
                        placeholder="Answer: true || false"
                        onChangeText={(answer) => this.setState({answer: answer})}
                    />
                </View>
                <TouchableOpacity 
                    style={styles.submitButton}
                    onPress={this.submitCard.bind(this)}
                >
                    <Text style={{fontWeight: 'bold', color:yellow,fontSize: 20}}>Submit</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkBlue,
        alignItems: 'center'
    },
    inputText: {
        height: 60,
        borderWidth: 2,
        borderColor: '#73FF73',
        borderRadius: 10,
        marginBottom: 20,
        width: 320,
        padding: 5,
        backgroundColor:white
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: darkBlue,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#757575',
        width: 130,
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

export default connect()(AddCard)
