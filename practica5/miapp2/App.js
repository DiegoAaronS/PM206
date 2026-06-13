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
      
      <Text>------Mi Perfil------</Text>
      <Perfil nombre= "Sámano Hernández Diego Aarón" carrera= "Ingeniería en Sistemas Computacionales" materia= "Programación Móvil" cuatrimestre= "9no Cuatrimestre"></Perfil>
      <Text>----------------------------------------------------------------------------------------------------------------</Text>
      <Text>----------------------------------------------------------------------------------------------------------------</Text>
      <Perfil 
      nombre= "Bjork" 
      carrera= "Música" 
      materia= "Notas" 
      cuatrimestre= "6to Cuatrimestre">
      </Perfil>

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
