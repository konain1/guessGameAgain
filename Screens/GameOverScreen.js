import {
  Pressable,
  Text,
  View,
  StyleSheet,
  ImageBackground
} from 'react-native'
import PrimaryButton from '../components/PrimaryButtons'
import { LinearGradient } from 'expo-linear-gradient'

function GameOverScreen ({
  logs,
  selectedNumber,
  setGameIsOver,
  setUserSelectedNumber
}) {
  const gameStartHandler = () => {
    setGameIsOver(false)
    setUserSelectedNumber(null)
  }

  return (
    <>
      <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={['rgba(0,0,0,0.8)', 'transparent']}
          style={styles.background}
        >
          <ImageBackground
            source={require('../assets/images/ii.png')} 
               resizeMode='cover'
               imageStyle={styles.backgroundImg}

            style={styles.image}
          >
            <Text>Inside</Text>

            <Text>GameOver!!!</Text>
            <View>
              <Text>
                you have taken {logs} rounds to guess {selectedNumber}{' '}
              </Text>
            </View>
            <PrimaryButton onPress={gameStartHandler}>
              <Text>NewGameStart</Text>
            </PrimaryButton>
          </ImageBackground>
        </LinearGradient>
      </View>
    </>
  )
}

export default GameOverScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
  },
  background: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    width:'100%',
    alignItems:'center'
  },
  backgroundImg:{
    opacity:0.15
  }
})
