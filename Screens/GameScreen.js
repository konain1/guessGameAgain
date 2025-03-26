import { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions
} from 'react-native'
import PrimaryButton from '../components/PrimaryButtons'
import AntDesign from '@expo/vector-icons/AntDesign'
import Number from '../components/Number'

function randomNumberFn (min, max, selectedByUser) {
  let randomNum = Math.floor(Math.random() * (max - min) + min)
  // console.log(min,max,randomNum)

  if (randomNum == selectedByUser) {
    return randomNumberFn(minBoundary, maxBoundary, randomNum)
  } else {
    return randomNum
  }
}

let minBoundary = 1
let maxBoundary = 100

function GameScreen ({ userSelectedNumber, onGameOver }) {
  const initialRandomNumber = randomNumberFn(1, 100, userSelectedNumber)
  const [currentGuessNumber, setCurrentGuessNumber] =
    useState(initialRandomNumber)
  const [currentLogs, setCurrentLogs] = useState([])
  const { width } = useWindowDimensions()

  function NextGuessNumber (direction) {
    if (
      (direction == 'greater' && userSelectedNumber < currentGuessNumber) ||
      (direction == 'smaller' && userSelectedNumber > currentGuessNumber)
    ) {
      Alert.alert('Wrong Direction', '', [
        { text: 'change Direction', style: 'destructive' }
      ])
      return
    }

    if (direction == 'greater') {
      minBoundary = currentGuessNumber + 1
    } else {
      maxBoundary = currentGuessNumber - 1
    }

    const newRandomNumber = randomNumberFn(
      minBoundary,
      maxBoundary,
      currentGuessNumber
    )
    console.log(minBoundary, maxBoundary)
    setCurrentGuessNumber(newRandomNumber)

    setCurrentLogs(prev => [newRandomNumber, ...prev])
  }

  useEffect(() => {
    if (userSelectedNumber == currentGuessNumber) {
      console.log('called')
      onGameOver(currentLogs.length)
      ;(minBoundary = 1), (maxBoundary = 100)
    }
  }, [currentGuessNumber])
  const btnWidth = width < 400 ? '80%' : '50%'
  const marginView = width < 400 ? 100 : 10
  const textFontSize = width < 400 ? 40 : 32

 let content = (
    <>
      <View style={[styles.guessView, { margin: marginView }]}>
        <Text style={[styles.text, { fontSize: textFontSize }]}>
          Guessed Number{' '}
        </Text>
        <Number style={textFontSize}>{currentGuessNumber}</Number>
      </View>
      <View style={[styles.btnContainer, { width: btnWidth }]}>
        <View style={styles.iconsText}>
          <PrimaryButton onPress={NextGuessNumber.bind(this, 'greater')}>
            {' '}
            <AntDesign name='plus' size={24} color='black' />{' '}
          </PrimaryButton>
        </View>
        <View style={styles.iconsText}>
          <PrimaryButton onPress={NextGuessNumber.bind(this, 'smaller')}>
            {' '}
            <AntDesign name='minus' size={24} color='black' />{' '}
          </PrimaryButton>
        </View>
      </View>
    </>
  )

  if (width > 500) {
    content = (
      <>
     <View style={[styles.guessView, { margin: marginView }]}>
        <Text style={[styles.text, { fontSize: textFontSize }]}>
          Guessed Number{' '}
        </Text>
        <View style={styles.wideViewContainer}>
      
        <View style={styles.iconsText}>
          <PrimaryButton onPress={NextGuessNumber.bind(this, 'greater')}>
            {' '}
            <AntDesign name='plus' size={24} color='black' />{' '}
          </PrimaryButton>
        </View>
        <View style={styles.wideNumberview}>

        <Number style={textFontSize}>{currentGuessNumber}</Number>
        </View>
       

        <View style={styles.iconsText}>
          <PrimaryButton onPress={NextGuessNumber.bind(this, 'smaller')}>
            {' '}
            <AntDesign name='minus' size={24} color='black' />{' '}
          </PrimaryButton>
        </View>
       
     
      </View>
      </View>
      </>
    )
  }
  return (
    <>
      <View style={styles.container}>
        {content}

        <View style={styles.logView}>
          <FlatList
            data={currentLogs}
            style={styles.flatlist}
            renderItem={({ item }) => (
              <Text style={styles.flatlistText}>{item} </Text>
            )}
            keyExtractor={item => item}
          />
        </View>
      </View>
    </>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7b72fc',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  guessView: {
    padding: 10,
    width: '100%',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    color: 'white'
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconsText: {
    flex: 1
  },
  logView: {
    width: '80%',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'black',
    marginTop: 10,
    overflow: 'hidden',
    height: 100
  },
  flatlist: {
    width: '70%',
    textAlign: 'center',
    overflow: 'hidden'
  },
  flatlistText: {
    textAlign: 'center',
    backgroundColor: 'orange',
    borderRadius: 12,
    marginVertical: 5
  },
  wideViewContainer:{
    flexDirection:'row',
    width:'50%',
    justifyContent:'space-evenly',
    alignItems:'center',
    padding:10
 
    
  },
  wideNumberview:{
    paddingHorizontal:10
  }
})
