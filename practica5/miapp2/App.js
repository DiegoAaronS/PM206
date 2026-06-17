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
      
      <Perfil estiloE={styles.tarjetaRoja} nombre= "Sámano Hernández Diego Aarón" carrera= "Ingeniería en Sistemas Computacionales" materia= "Programación Móvil" cuatrimestre= "9no Cuatrimestre"></Perfil>
      
      <Perfil
      estiloE={styles.tarjetaVerde} 
      nombre= "Camila Abigail" 
      carrera= "Psicología" 
      materia= "Notas" 
      cuatrimestre= "6to Cuatrimestre">
      </Perfil>

      <Perfil estiloE={styles.tarjetaRoja} nombre= "Diego Aarón2" carrera= "Ingeniería en Sistemas Computacionales" materia= "Programación Móvil" cuatrimestre= "9no Cuatrimestre"></Perfil>

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
  tarjetaRoja: {backgroundColor: '#FF6B6B'},
  tarjetaVerde: {backgroundColor: '#6BCB77'},
});
