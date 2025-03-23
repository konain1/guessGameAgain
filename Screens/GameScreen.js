import { useEffect, useState } from "react"
import { View,Text, StyleSheet, Alert } from "react-native"
import PrimaryButton from "../components/PrimaryButtons"
import AntDesign from '@expo/vector-icons/AntDesign';

function randomNumberFn(min,max,selectedByUser){
    let randomNum = Math.floor(Math.random() * (max-min)+min )
    console.log(min,max,randomNum)

    if(randomNum == selectedByUser){
        return randomNumberFn(minBoundary,maxBoundary,randomNum)
    }
    return randomNum
}

let minBoundary = 1;
let maxBoundary = 100;


function GameScreen({userSelectedNumber,onGameOver}){

    const initialRandomNumber = randomNumberFn(1,100,userSelectedNumber)
    const [currentGuessNumber,setCurrentGuessNumber]=useState(initialRandomNumber)

  function NextGuessNumber(direction){

    if((direction == 'greater' && userSelectedNumber < currentGuessNumber) ||
        (direction == 'smaller' && userSelectedNumber > currentGuessNumber)){
        Alert.alert(
            'Wrong Direction',
            '',
            [{ text: 'change Direction', style: 'destructive'}]
          );
        return ;
    }

    if(direction == 'greater'){
        minBoundary = currentGuessNumber
    }else{
        maxBoundary = currentGuessNumber + 1
    }

    const newRandomNumber = randomNumberFn(minBoundary,maxBoundary,currentGuessNumber)
    setCurrentGuessNumber(newRandomNumber)

    }

    useEffect(()=>{
        if(userSelectedNumber == currentGuessNumber){
            console.log('called')
            onGameOver()
        }
    },[currentGuessNumber])

        return(
            <>
            <View style={styles.container}>
                <Text style={styles.text}>Guessed Number {currentGuessNumber} </Text>
                <View style={styles.btnContainer}>

                <View style={styles.iconsText}>
                    <PrimaryButton onPress={NextGuessNumber.bind(this,'greater')} ><AntDesign name="upcircleo" size={24} color="black" /></PrimaryButton>
                </View>
                <View style={styles.iconsText}>
                    <PrimaryButton onPress={NextGuessNumber.bind(this,'smaller')} ><AntDesign name="downcircleo" size={24} color="black" /></PrimaryButton>
                </View>
             

                </View>
            </View>
            </>
        )

}

export default GameScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#7b72fc',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:30,
        color:'white'
    },
    btnContainer:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    iconsText:{
        flex:1
    }
})