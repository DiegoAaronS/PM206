/* Zona1: Importaciones de componentes y archivos */
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState } from 'react';
import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import PressableScreen from './PressableScreen';
import TextInputScreen from './TextInputScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import ImageBackgroungScreen from './ImageBackgroungScreen';
import FlatlistScreen from './FlatListScreen';
import ModalScreen from './ModalScreen';

/* Zona2: Main - Hogar de los componentes */
export default function MenuScreen() {
    const [screen, setScreen] = useState('menu');

    switch (screen) {
        case 'tarjetas':
            return <TarjetasScreen />;
        case 'safeArea':
            return <SafeAreaScreen />;
        case 'pressable':
            return <PressableScreen />;
        case 'textInput':
            return <TextInputScreen />;
        case 'activityIndicator':
            return <ActivityIndicatorScreen />;
        case 'imageBackground':
            return <ImageBackgroungScreen />;
        case 'flatList':
            return <FlatlistScreen />;
        case 'modal':
            return <ModalScreen />;
        case 'menu':
            default:
             return (
                <View style={styles.container}>
      
                    <Text>Menú de Practicas</Text>
                    <Button title="Tarjetas" onPress={() => setScreen('tarjetas')} />
                    <Button title="SafeAreaView" onPress={() => setScreen('safeArea')} />
                    <Button title="Pressable" onPress={() => setScreen('pressable')} />   
                    <Button title="TextInput" onPress={() => setScreen('textInput')} />     
                    <Button title="ActivityIndicator" onPress={() => setScreen('activityIndicator')} />
                    <Button title="ImageBackground" onPress={() => setScreen('imageBackground')} />
                    <Button title="FlatList" onPress={() => setScreen('flatList')} />
                    <Button title="Modal" onPress={() => setScreen('modal')} />

                    <StatusBar style="auto" />

                </View>
            );
    }
}

/* Zona3: Estilos y posicionamiento */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#39e8ff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});