/**
 * Created by rozer on 5/7/2018.
 */
import React, { Component } from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Animated,
    TouchableOpacity
} from 'react-native'
import {white} from '../utils/colors'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

class Result extends Component {
    
    state = {
        rotateValue: new Animated.Value(0),
        bounceValue: new Animated.Value(0)
    };
    
    componentDidMount(){
        this.flip()
    };
    
    flip = () => {
        const { rotateValue,bounceValue } = this.state;
        Animated.timing(rotateValue, { duration: 800, toValue: 1}).start();
        Animated.sequence([
            Animated.timing(bounceValue, { duration: 1000, toValue: 2}),
            Animated.spring(bounceValue, { toValue:1, friction: 4})
        ]).start()
    };
    
    
     render() {
         const spin = this.state.rotateValue.interpolate({
             inputRange: [0, 1],
             outputRange: ['0deg', '360deg']
         });
         const { score, questions } = this.props;
         const markInPer = score > 0 ? Math.round(((score*100)/questions)*100)/100 : 0
         return(
             <View style={styles.result}>
                 <AnimatedCircularProgress
                     size={200}
                     width={15}
                     fill={markInPer}
                     tintColor="#00e0ff"
                     backgroundColor="#3d5875">
                     {
                         (fill) => (
                             <Animated.Text style={{color: '#00e0ff', fontWeight: 'bold', fontSize:20, transform: [{rotateY:spin}]}}>
                                 { markInPer }%
                             </Animated.Text>
                         )
                     }
                 </AnimatedCircularProgress>
                 <Animated.View style={{marginLeft:150, flexDirection:'row', transform: [{scale:this.state.bounceValue}]}}>
                     <Animated.Text 
                         style={{color: '#00e0ff', fontWeight: 'bold', fontSize:30,transform: [{rotate: spin}]}}
                     >
                         {score}
                     </Animated.Text>
                     <Text style={{color: '#00e0ff', fontWeight: 'bold', fontSize:40}}>/</Text>
                     <Animated.Text 
                         style={{color: '#00e0ff', fontWeight: 'bold', fontSize:50, transform: [{rotateX: spin}]}}
                     >
                         {questions}
                     </Animated.Text>
                 </Animated.View>
                 <TouchableOpacity style={styles.restartQuiz} onPress={this.props.startQuiz}>
                     <Text style={{fontWeight:'bold', fontSize: 18, color: white}}>Restart Quiz</Text>
                 </TouchableOpacity>
                 <TouchableOpacity style={[styles.restartQuiz, {width: 100, height: 50, marginTop:10}]} onPress={this.props.goBack}>
                     <Text style={{fontWeight:'bold', fontSize: 18, color: white}}>Go Back</Text>
                 </TouchableOpacity>
             </View>
         )
     }    
}

const styles = StyleSheet.create({
    result: {
        alignItems: 'center',
        marginTop: 100
    },
    restartQuiz: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#757575',
        width: 130,
        height: 50,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.8
    }
});

export default Result
