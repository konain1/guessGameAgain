
import { View,Text,StyleSheet ,Dimensions} from "react-native"



function Title({children}){


   

    return (<>
    <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
    </View>
    </>)
}

export default Title

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
container:{
    marginVertical:deviceWidth < 380 ? 10: 15
},
text:{
    fontSize:deviceWidth < 380 ? 18 : 28,
    justifyContent:'center',
    alignItems:'center',
    textAlign:'center',
    color:'white'
}
})