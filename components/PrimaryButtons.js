import { Pressable, View, Text, StyleSheet, useWindowDimensions } from 'react-native';

function PrimaryButton({ onPress, children }) {
  console.log('children', children);

  const {height,width} = useWindowDimensions()

  const fontSizeCustome = height < 300 ? 18 : 12 

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.customBtn, styles.pressedButton] : styles.customBtn
      }
    >
      <Text style={[styles.buttonText,{fontSize:fontSizeCustome}]}>{children}</Text>
    </Pressable>
  );
}

export default PrimaryButton;


const styles = StyleSheet.create({
  customBtn: {
    borderWidth: 1,
    padding: 2,
    margin:2,
    borderRadius: 12,
    shadowOffset: { width: 3, height: 10 },
    shadowColor: '#000',
    shadowOpacity: 0.75,
    shadowRadius: 10,
    backgroundColor: '#388dd8',
  },
  buttonText: { //renamed customText
    textAlign: 'center',
    padding:10,
  },
  pressedButton: { //renamed touchable
    backgroundColor: '#346087',
    opacity: 0.55,
  },
});