import { StyleSheet, Text, View } from 'react-native'

function Number ({ children,style }) {
  console.log('child', children)
  return (
    <>
      <View>
        <Text style={[{fontSize:style},styles.text]}>{children}</Text>
      </View>
    </>
  )
}

export default Number

const styles = StyleSheet.create({
  text:{
    color:'lightyellow',
    fontWeight:'bold'
  }
})
