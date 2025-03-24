import { useEffect, useState } from "react"
import { View,Text, StyleSheet, Alert, FlatList } from "react-native"
import PrimaryButton from "../components/PrimaryButtons"
import AntDesign from '@expo/vector-icons/AntDesign';


function randomNumberFn(min,max,selectedByUser){
    let randomNum = Math.floor(Math.random() * (max-min)+min )
    // console.log(min,max,randomNum)

    if(randomNum == selectedByUser){
        return randomNumberFn(minBoundary,maxBoundary,randomNum)
    }else{
        return randomNum
    }
}

let minBoundary = 1;
let maxBoundary = 100;


function GameScreen({userSelectedNumber,onGameOver}){

    const initialRandomNumber = randomNumberFn(1,100,userSelectedNumber)
    const [currentGuessNumber,setCurrentGuessNumber]=useState(initialRandomNumber)
    const [currentLogs,setCurrentLogs]=useState([])

    

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
        minBoundary = currentGuessNumber +1
    }else{
        maxBoundary = currentGuessNumber -1
    }

    const newRandomNumber = randomNumberFn(minBoundary,maxBoundary,currentGuessNumber)
    console.log(minBoundary, maxBoundary)
    setCurrentGuessNumber(newRandomNumber)

    setCurrentLogs((prev)=>[newRandomNumber,...prev])

    }

    useEffect(()=>{
        if(userSelectedNumber == currentGuessNumber){
            console.log('called')
            onGameOver(currentLogs.length)
            minBoundary = 1,
            maxBoundary = 100
        }
    },[currentGuessNumber])

        return(
            <>
            <View style={styles.container}>
            <View style={styles.guessView}>

                <Text style={styles.text}>Guessed Number {currentGuessNumber} </Text>
            </View>
                <View style={styles.btnContainer}>

                <View style={styles.iconsText}>
                    <PrimaryButton onPress={NextGuessNumber.bind(this,'greater')} > <AntDesign name="plus" size={24} color="black" /> </PrimaryButton>
                </View>
                <View style={styles.iconsText}>
                    <PrimaryButton onPress={NextGuessNumber.bind(this,'smaller')} > <AntDesign name="minus" size={24} color="black" /> </PrimaryButton>
                </View>
                </View>
                <View style={styles.logView}>
                    <FlatList data={currentLogs}      renderItem={({item}) => <Text >{item}</Text>}
                         keyExtractor={item => item} />
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
    guessView:{
        padding:10,
        margin:100,
        borderWidth:1,
        width:'100%',
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
    },
    logView:{
        width:'100%',
        backgroundColor:'lightgreen',
        borderWidth:1,
        marginVertical:100
    }

})