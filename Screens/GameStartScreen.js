import { View, TextInput, StyleSheet, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButtons';
import Title from '../components/Tilte';
import { useState } from 'react';

function GameStartScreen({ onNumberSelected,setGameIsOver }) { // Renamed props

  const [enteredValue, setEnteredValue] = useState(''); // Renamed state

  function resetInputHandler() { // Renamed function
    setEnteredValue('');
  }

  function confirmInputHandler() { // Renamed function
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }

    onNumberSelected(chosenNumber); // Updated prop usage
    setGameIsOver(false)
  }

  function inputValueChangedHandler(enteredText) { // Renamed function
    setEnteredValue(enteredText);
  }

  return (
    <View style={styles.container}>
      <Title>GuessGame__</Title>
      <View style={styles.textInputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter a Number" // Improved placeholder
          keyboardType="number-pad" // More specific keyboard type
          maxLength={2}
          onChangeText={inputValueChangedHandler} // Updated function name
          value={enteredValue} // Updated state name
        />
      </View>

      <View style={styles.btnContainer}>
        <View style={styles.btn}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
        <View style={styles.btn}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default GameStartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#474280',
    width: '100%',
    alignItems: 'center',
  },
  textInputView: {
    width: '100%',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    width: '90%',
    padding: 12,
    borderRadius: 12,
    borderBottomWidth: 1,
    color: 'white',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
  },
  btn: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
});