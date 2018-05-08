/**
 * Created by rozer on 5/7/2018.
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';

class Result extends Component {
     render() {
         const { score, questions } = this.props;
         const markInPer = score > 0 ? (score*100)/questions : 0
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
                             <Text style={{color: '#00e0ff', fontWeight: 'bold', fontSize:20}}>
                                 { markInPer }%
                             </Text>
                         )
                     }
                 </AnimatedCircularProgress>
                 <View style={{marginLeft:150, flexDirection:'row'}}>
                     <Text style={{color: '#00e0ff', fontWeight: 'bold', fontSize:30}}>{score}</Text>
                     <Text style={{color: '#00e0ff', fontWeight: 'bold', fontSize:40}}>/</Text>
                     <Text style={{color: '#00e0ff', fontWeight: 'bold', fontSize:50}}>{questions}</Text>
                 </View>
                 
             </View>
         )
     }    
}

const styles = StyleSheet.create({
    result: {
        alignItems: 'center',
        marginTop: 100
    }
});

export default Result
