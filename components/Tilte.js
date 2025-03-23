
import { View,Text,StyleSheet } from "react-native"
function Title({children}){
    return (<>
    <View style={styles.container}>
        <Text style={{fontSize:30}}>{children}</Text>
    </View>
    </>)
}

export default Title

const styles = StyleSheet.create({
container:{
    marginVertical:30
}
})