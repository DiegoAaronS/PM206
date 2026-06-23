/* Zona1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

/* Zona2: Main - Hogar de los componentes */
export default function SafeAreaScreen() {
  return (
    <View style={styles.container}>
      <Text>Aquí el screen de FlatList</Text>
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
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    paddingHorizontal: 20,
  },
});
