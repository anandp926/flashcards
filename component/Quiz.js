/**
 * Created by rozer on 5/5/2018.
 */
import React, { Component } from 'react'
import { 
    Alert, 
    View, 
    Text,
    Button, 
    TouchableOpacity, 
    StyleSheet,
    Animated
} from 'react-native'
import { connect } from 'react-redux'
import { white, darkBlue, red } from '../utils/colors'
import Result from './Result'
import { capitalize } from '../utils/helper'
import { 
    setLocalNotification, 
    clearNotification 
} from '../utils/Notification'

class Quiz extends Component {

    componentDidMount(){
        this.trans();
        clearNotification()
            .then(setLocalNotification)
    }
    
    state = {
        userScore: 0,
        next: 0,
        buttonStatus: false,
        result: false,
        answerButton: false,
        showAnswer: false,
        checkAnswerButton: true,
        backgroundColor: 'red',
        bounceValue: new Animated.Value(1)
    };

    nextQuestion = () => {
        this.setState({
            next: this.state.next + 1,
            buttonStatus: false,
            answerButton: false,
            showAnswer: false,
            checkAnswerButton: true,
            backgroundColor: 'red'
        });
        this.trans()
    };

    trans = () => {
        const { bounceValue } = this.state;
        Animated.sequence([
            Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
            Animated.spring(bounceValue, { toValue:1, friction: 4})
        ]).start()
    };
    
    viewResult = () => {
        this.setState({
            result: true
        });
    };
    
    showAnswer = () => {
        this.setState({
            showAnswer: true
        })
    };
    
    alertBox = () => {
        Alert.alert('Warning!','Please select an answer',)
    };
    
    startQuiz = () => {
        this.setState({
            userScore: 0,
            next: 0,
            buttonStatus: false,
            result: false,
            answerButton: false,
            showAnswer: false,
            checkAnswerButton: true,
            backgroundColor: 'red',
            bounceValue: new Animated.Value(1)
        });
    };
    
    goback = () => {
    this.props.navigation.goBack();
    };
    
    checkAnswer = (score) =>{
        const { id, deck } = this.props;
        const filterQuestion = Object.values(deck[0]).filter(deck => deck.title === id)
        if(capitalize(score) === capitalize(filterQuestion[0].questions[this.state.next].answer))
        {
            this.setState({
                buttonStatus: true,
                answerButton: true,
                checkAnswerButton: false,
                backgroundColor: 'green',
                userScore: this.state.userScore + 1
            })
        }else{
            this.setState({
                buttonStatus: true,
                answerButton: true,
                checkAnswerButton: false,
                backgroundColor: 'green',
                userScore: this.state.userScore + 0
            })
        }
    };
    
    render() {
        const { id, deck } = this.props;
        const filterQuestion = Object.values(deck[0]).filter(deck => deck.title === id);
        return(
            <View style={styles.container}>
                {
                    this.state.result
                        ?
                        <View style={styles.header}>
                            <Text style={{fontWeight:'bold', fontSize: 20}}>Your Score</Text>
                        </View>
                        :
                        <View style={styles.header}>
                            <View style={{marginRight:110}}>
                                <Text style={{fontWeight:'bold', fontSize: 18}}>
                                    {this.state.next+1}/{filterQuestion[0].questions.length}
                                </Text>
                            </View>
                            <View style={{marginLeft:110}}>
                                {
                                    (filterQuestion[0].questions.length - 1) !== this.state.next
                                        ?
                                        <TouchableOpacity style={[styles.nextButton,{backgroundColor:this.state.backgroundColor}]}
                                                          onPress={ this.state.buttonStatus ? this.nextQuestion : this.alertBox}
                                        >
                                        <Text style={{fontWeight:'bold', fontSize: 18, color: white}}>
                                            Next
                                        </Text>
                                    </TouchableOpacity>
                                        :
                                        <TouchableOpacity style={[styles.nextButton,{backgroundColor:this.state.backgroundColor}]}
                                                          onPress={ this.state.buttonStatus ? this.viewResult : this.alertBox}
                                        >
                                        <Text style={{fontWeight:'bold', fontSize: 18, color: white}}>
                                            Result
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                }
                {
                    this.state.result
                    ?
                        <View>
                            <Result 
                                score={this.state.userScore} 
                                questions={filterQuestion[0].questions.length}
                                startQuiz={this.startQuiz}
                                goBack={this.goback}
                            />
                        </View>
                    :
                        <Animated.View style={[styles.quesAns,{transform: [{scale: this.state.bounceValue}]}]}>
                            <Text style={[styles.ques,{color:white, textAlign: 'center', }]}>
                                {filterQuestion[0].questions[this.state.next].question}
                            </Text>
                            <View style={styles.bothButtons}>
                                <View style={{marginRight:30, width:80, height: 40}}>
                                    <Button disabled={this.state.answerButton} 
                                            color='green' title="true" 
                                            onPress={() => this.checkAnswer('true')}
                                    />
                                </View>
                                <View style={{marginLeft:30, width:80, height: 40}}>
                                    <Button disabled={this.state.answerButton} 
                                            color='red' title="false" 
                                            onPress={() => this.checkAnswer('false')}
                                    />
                                </View>
                            </View>
                        </Animated.View>
                }
                {
                    this.state.result
                    ?
                        <View></View>
                    :
                        <View style={{alignItems:'center'}}>
                            <Button 
                                disabled={this.state.checkAnswerButton} 
                                title="check answer" color="green" 
                                onPress={this.showAnswer}
                            />
                            {
                                this.state.showAnswer
                                    ?
                                    <View style={[styles.nextButton,{backgroundColor: white, marginTop:10}]}>
                                        <Text style={{fontWeight: 'bold', fontSize:16}}>
                                            {filterQuestion[0].questions[this.state.next].answer}
                                        </Text>
                                    </View>
                                    :
                                    <View></View>
                            }
                        </View>
                }
                
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:white,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.8
    },
    container: {
        flex: 1,
        backgroundColor: darkBlue,
        alignItems: 'center'
    },
    quesAns: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: 300,
        paddingTop: 30,
        paddingLeft:10,
        paddingRight:10,
        marginTop: 20
    },
    ques: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    bothButtons: {
        flexDirection: 'row',
        marginTop: 25
    },
    nextButton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#757575',
        width: 80,
        height: 40,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.8
    }
});

function mapStateToProps(deck,{navigation}) {
    const { id } = navigation.state.params;
    return{
        id,
        deck: Object.values(deck)
    }
}

export default connect(mapStateToProps)(Quiz)
