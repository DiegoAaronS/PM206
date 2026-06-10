import { View, Text, StyleSheet } from 'react-native';

export const Perfil = () => {
    const nombre = "Sámano Hernández Diego Aarón";
    const carrera = "Ingeniería en Sistemas Computacionales";
    const materia = "Programación Móvil";
    const cuatrimestre = "9no Cuatrimestre";

    return (
        <View>
            <Text>Nombre:</Text>
            <Text>{nombre}</Text>
            
            <Text>Carrera:</Text>
            <Text>{carrera}</Text>
            
            <Text>Materia:</Text>
            <Text>{materia}</Text>
            
            <Text>Cuatrimestre:</Text>
            <Text>{cuatrimestre}</Text>
        </View>
    )
}