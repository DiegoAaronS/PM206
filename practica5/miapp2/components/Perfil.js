/* PERFIL usando Props */
// import { View, Text } from 'react-native';

// export const Perfil = (props) => {

//     return (
//         <View>
//             <Text>Nombre:</Text>
//             <Text>{props.nombre}</Text>
            
//             <Text>Carrera:</Text>
//             <Text>{props.carrera}</Text>
            
//             <Text>Materia:</Text>
//             <Text>{props.materia}</Text>
            
//             <Text>Cuatrimestre:</Text>
//             <Text>{props.cuatrimestre}</Text>
//         </View>
//     )
// }

/* PERFIL usando Desestructuración */
import { View, Text, Button, StyleSheet } from 'react-native';
import React, {useState} from 'react';

export const Perfil = ({nombre,carrera,materia,cuatrimestre,estiloE}) => {
    const [mostrar,setMostrar]= useState(false)
    return (
        <View style={[estilos.tarjeta, estiloE]}>
            <Text>Nombre:</Text>
            <Text style={estilos.nombre}>{nombre}</Text>
            { mostrar &&
            <>
            <Text>Carrera:</Text>
            <Text style={estilos.carrera}>{carrera}</Text>
            <Text>Materia:</Text>
            <Text style={estilos.otroTexto}>{materia}</Text>
            <Text>Cuatrimestre:</Text>
            <Text style={estilos.otroTexto}>{cuatrimestre}</Text>
            </>
             }
            <Button title={mostrar ? 'Ocultar perfil' : 'Mostrar Perfil'}
            onPress={()=> setMostrar(!mostrar)}
            />
        </View>
    )
}

const estilos = StyleSheet.create({
    nombre: {
        fontSize: 24,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    carrera: {
        fontSize: 18,
        color: 'blue',
    },
    otroTexto: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    tarjeta: {
        borderWidth: 3,
        borderRadius: 10,
        margin: 20,
        padding: 25,
        width: 300,
    },
})