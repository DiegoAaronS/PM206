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
import { View, Text, Button } from 'react-native';
import React,{useState} from 'react';

export const Perfil = ({nombre,carrera,materia,cuatrimestre}) => {
    const [mostrar,setMostrar]= useState(false)
    return (
        <View>
            <Text>Nombre:</Text>
            <Text>{nombre}</Text>
            { mostrar &&
            <>
            <Text>Carrera:</Text>
            <Text>{carrera}</Text>
            <Text>Materia:</Text>
            <Text>{materia}</Text>
            <Text>Cuatrimestre:</Text>
            <Text>{cuatrimestre}</Text>
            </>
             }
            <Button title='Mostrar Perfil'
            onPress={()=> setMostrar(!mostrar)}
            />
        </View>
    )
}