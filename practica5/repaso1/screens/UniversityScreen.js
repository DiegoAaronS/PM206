import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Alert,
  StyleSheet,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';

export default function UniversityScreen() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');
  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deportes, setDeportes] = useState(false);

  const mostrarAlerta = (titulo, mensaje) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}: ${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const handleSubmit = () => {
    if (Platform.OS !== 'web') Keyboard.dismiss();

    if (!nombre.trim() || !carrera.trim() || !semestre.trim()) {
      mostrarAlerta('Error', 'No se permiten campos vacíos');
      return;
    }

    const semestreNum = parseInt(semestre, 10);
    if (isNaN(semestreNum)) {
      mostrarAlerta('Error', 'El semestre debe ser un número');
      return;
    }

    const mensaje =
      `Nombre: ${nombre}\n` +
      `Carrera: ${carrera}\n` +
      `Semestre: ${semestreNum}\n` +
      `Taller: ${taller ? 'Sí' : 'No'}\n` +
      `Constancia: ${constancia ? 'Sí' : 'No'}\n` +
      `Deportes: ${deportes ? 'Sí' : 'No'}`;

    mostrarAlerta('Registro exitoso', mensaje);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Evento Universitario</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Escribe tu nombre"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Carrera</Text>
        <TextInput
          style={styles.input}
          value={carrera}
          onChangeText={setCarrera}
          placeholder="Ej. Ingeniería en Sistemas"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Semestre</Text>
        <TextInput
          style={styles.input}
          value={semestre}
          onChangeText={setSemestre}
          placeholder="Número de semestre"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>¿Asistirá al taller?</Text>
        <View style={styles.switchRow}>
          <Switch
            value={taller}
            onValueChange={setTaller}
            trackColor={{ false: '#d1d1d1', true: '#4CAF50' }}
          />
          <Text style={styles.switchText}>{taller ? 'Sí' : 'No'}</Text>
        </View>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>¿Requiere constancia?</Text>
        <View style={styles.switchRow}>
          <Switch
            value={constancia}
            onValueChange={setConstancia}
            trackColor={{ false: '#d1d1d1', true: '#4CAF50' }}
          />
          <Text style={styles.switchText}>{constancia ? 'Sí' : 'No'}</Text>
        </View>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>¿Participará en actividades deportivas?</Text>
        <View style={styles.switchRow}>
          <Switch
            value={deportes}
            onValueChange={setDeportes}
            trackColor={{ false: '#d1d1d1', true: '#4CAF50' }}
          />
          <Text style={styles.switchText}>{deportes ? 'Sí' : 'No'}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Enviar Registro" onPress={handleSubmit} color="#2196F3" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  switchContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    minWidth: 30,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
});