import { Button,Text,Image, View } from "react-native";

export const Saludo2= () =>{
    return(
        <View>
        <Text>Soy un componente Propio</Text>
        <Image source={require('../assets/wave.png')}/>
        <Button title="Hello 206"></Button>
        </View>
    )
}