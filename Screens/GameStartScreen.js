import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView
} from 'react-native'
import PrimaryButton from '../components/PrimaryButtons'
import Title from '../components/Tilte'
import { useState } from 'react'

function GameStartScreen ({ onNumberSelected, setGameIsOver }) {
  // Renamed props

  const [enteredValue, setEnteredValue] = useState('') // Renamed state
  const { height, width } = useWindowDimensions()

  function resetInputHandler () {
    // Renamed function
    setEnteredValue('')
  }

  function confirmInputHandler () {
    // Renamed function
    const chosenNumber = parseInt(enteredValue)

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      )
      return
    }

    onNumberSelected(chosenNumber) // Updated prop usage
    setGameIsOver(false)
  }

  function inputValueChangedHandler (enteredText) {
    // Renamed function
    setEnteredValue(enteredText)
  }

  const justifyCustom = height < 300 ? 'center' : 'center'
  const marginTopDistance = height < 300 ? 20 : 100
  const btnWidth = width < 400 ? '80%' : '50%'
  console.log(height)
  const content = <></>

  return (
      
      <KeyboardAvoidingView style={styles.screen} behavior='padding'>
      <View>

     
    <ScrollView >

      
        <View style={[styles.container, { justifyContent: justifyCustom }]}>
          <View style={[styles.cardView, { marginBottom: marginTopDistance }]}>
            <Title>GuessGame__</Title>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.textInput}
                placeholder='Enter a Number' // Improved placeholder
                keyboardType='number-pad' // More specific keyboard type
                maxLength={2}
                onChangeText={inputValueChangedHandler} // Updated function name
                value={enteredValue} // Updated state name
              />
            </View>

            <View style={[styles.btnContainer, { width: btnWidth }]}>
              <View style={styles.btn}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
              <View style={styles.btn}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
            </View>
          </View>
        </View>
    </ScrollView>
    </View>
      </KeyboardAvoidingView>
  )
}

export default GameStartScreen

const styles = StyleSheet.create({
  screen: {
    flex:1,
    justifyContent:'center',
    backgroundColor: '#165743',
    
  
  },
  container: {
    flex: 1,
  
    width: '100%'
  },
  cardView: {
    alignItems: 'center'
  },
  textInputView: {
    width: '100%',
    alignItems: 'center'
  },
  textInput: {
    borderWidth: 1,
    width: '60%',
    padding: 12,
    borderRadius: 12,
    borderBottomWidth: 1,
    color: 'white',
    borderColor: 'white'
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
    width: '50%'
  },
  btn: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center'
  }
})
