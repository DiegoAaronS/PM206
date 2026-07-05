import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
  Keyboard,
  Platform,
} from 'react-native';

export default function BookScreen() {
  const [mostrarSplash, setMostrarSplash] = useState(true);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const agregarLibro = () => {
    if (Platform.OS !== 'web') Keyboard.dismiss();

    if (!titulo.trim() || !autor.trim() || !genero.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    setCargando(true);
    setTimeout(() => {
      const nuevoLibro = {
        id: Date.now().toString(),
        titulo: titulo.trim(),
        autor: autor.trim(),
        genero: genero.trim(),
      };
      setLibros([...libros, nuevoLibro]);
      setTitulo('');
      setAutor('');
      setGenero('');
      setCargando(false);
      Alert.alert('Éxito', 'Libro agregado correctamente');
    }, 4000);
  };

  if (mostrarSplash) {
    return (
        <View style={styles.splashOverlay}>
          <Text style={styles.splashTitle}>repa2</Text>
        </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/Dorm_Room_Yasuhiro_Hagakure.webp')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>Catálogo de Libros</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Título del libro"
            placeholderTextColor="#aaa"
            value={titulo}
            onChangeText={setTitulo}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor"
            placeholderTextColor="#aaa"
            value={autor}
            onChangeText={setAutor}
          />
          <TextInput
            style={styles.input}
            placeholder="Género"
            placeholderTextColor="#aaa"
            value={genero}
            onChangeText={setGenero}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={agregarLibro}
            disabled={cargando}
          >
            {cargando ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Agregar libro</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Total de libros: {libros.length}</Text>
          
            <FlatList
              data={libros}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemTitle}>{item.titulo}</Text>
                  <Text style={styles.itemDetail}>Autor: {item.autor}</Text>
                  <Text style={styles.itemDetail}>Género: {item.genero}</Text>
                </View>
              )}
              contentContainerStyle={styles.listContent}
            />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  splashOverlay: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
  },
  splashTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  itemDetail: {
    fontSize: 14,
    color: '#34495E',
    marginTop: 2,
  },
});