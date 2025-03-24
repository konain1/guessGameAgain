import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import GameStartScreen from './Screens/GameStartScreen';
import GameScreen from './Screens/GameScreen';
import { useEffect, useState } from 'react';
import GameOverScreen from './Screens/GameOverScreen';

export default function App() {
  const [userSelectedNumber, setUserSelectedNumber] = useState(null); // Renamed state
  const [gameIsOver,setGameIsOver]=useState(true)
  const [guessLogs,setGuessLogs]=useState()

  let screen = <GameStartScreen setGameIsOver={setGameIsOver}  onNumberSelected={setUserSelectedNumber} />


  if(userSelectedNumber){
    screen = <GameScreen onGameOver={GameOverFn} userSelectedNumber={userSelectedNumber}/>
  }
  function GameOverFn(log){
    console.log('gameover screen')
    setGameIsOver(true)
    setGuessLogs(log)
  }
  if(userSelectedNumber && gameIsOver){
    screen = <GameOverScreen setUserSelectedNumber={setUserSelectedNumber} logs={guessLogs} setGameIsOver={setGameIsOver}  selectedNumber={userSelectedNumber} />
  }
  useEffect(()=>{
    console.log('gameover screen useeffect')
  },[GameOverFn])

  
  return (
    <View style={styles.container}>
    {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dadada',
    alignItems: 'center',
    justifyContent: 'center',
  },
});