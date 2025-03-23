import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import GameStartScreen from './Screens/GameStartScreen';
import GameScreen from './Screens/GameScreen';
import { useEffect, useState } from 'react';
import GameOverScreen from './Screens/GameOverScreen';

export default function App() {
  const [userSelectedNumber, setUserSelectedNumber] = useState(null); // Renamed state
  const [gameIsOver,setGameIsOver]=useState(false)

  let screen = <GameStartScreen  onNumberSelected={setUserSelectedNumber} />


  if(userSelectedNumber){
    screen = <GameScreen onGameOver={GameOverFn} userSelectedNumber={userSelectedNumber}/>
  }
  function GameOverFn(){
    console.log('gameover screen')
    setGameIsOver(true)
  }
  if(userSelectedNumber && gameIsOver){
    screen = <GameOverScreen />
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