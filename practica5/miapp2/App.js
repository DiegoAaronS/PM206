/* Zona1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MenuScreen from './screens/MenuScreen';

/* Zona2: Main - Hogar de los componentes */
export default function App() {
  return (
    <View style={styles.container}>
      <MenuScreen/>
      <StatusBar style="auto" />

    </View>
  );
}

/* Zona3: Estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});