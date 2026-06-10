/* Zona1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Saludo } from './components/Saludo';
import { Saludo2 } from './components/Saludo2';
import { Perfil } from './components/Perfil';

/* Zona2: Main - Hogar de los componentes */
export default function App() {
  return (
    <View style={styles.container}>
      <Text>------Componente Nativo------</Text>
      <Image source={require('./assets/wave.png')}/>
      <Text>Hello World RN!</Text>
      <Text>------Componente Simple------</Text>
      <Saludo></Saludo>
      <Text>------Componente Compuesto------</Text>
      <Saludo2></Saludo2>
      <Text>------Mi Perfil------</Text>
      <Perfil></Perfil>
      <StatusBar style="auto" />
    </View>
  );
}

/* Zona3: Estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
