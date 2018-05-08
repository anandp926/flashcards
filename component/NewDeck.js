/**
 * Created by rozer on 5/1/2018.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { white, darkBlue, yellow } from '../utils/colors'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../action'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native'

class NewDeck extends Component {

    constructor(){
        super();
        this.state = {title: ''};
    }

    submit() {
        const { dispatch } = this.props;
        dispatch(saveDeckTitle(this.state.title));
        addDeck(this.state.title)
    };
    
    render() {
        return(
            <View style={styles.container}>
                <View style={styles.deckForm}>
                    <Text 
                        style={{color:white, fontWeight:'bold', fontSize: 25, textAlign: 'center'}}
                    >
                        What is the title of your new deck?
                    </Text>
                    <View style={{marginTop:20}}>
                        <TextInput 
                            style={styles.inputText} 
                            underlineColorAndroid='transparent' 
                            onChangeText={(title) => this.setState({title: title})} 
                        />
                    </View>
                    <TouchableOpacity 
                        style={styles.submitButton} 
                        onPress={this.submit.bind(this)}
                    >
                        <Text style={{fontWeight: 'bold', color:yellow,fontSize: 20}}>SUBMIT</Text>
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
        justifyContent: 'center'
    },
    deckForm: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#757575',
        borderWidth: 2,
        borderRadius: 20,
        height: 350,
        width: 320,
        padding: 5
    },
    inputText: {
        height: 50,
        borderWidth: 2,
        borderColor: yellow,
        borderRadius: 10,
        marginBottom: 20,
        width: 290,
        padding: 5,
        backgroundColor:white
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: darkBlue,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#73FF73',
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

export default connect()(NewDeck)
