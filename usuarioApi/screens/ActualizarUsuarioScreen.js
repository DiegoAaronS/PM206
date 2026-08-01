import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Pressable, StyleSheet, Alert, Platform, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const API_URL = "http://172.20.10.11:5000/v1/usuarios";

const AUTH_HEADER = "Basic YWRtaW46MTIzNA==";

export default function ActualizarUsuarioScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const respuesta = await fetch(`${API_URL}/${id}`);
        if (respuesta.ok) {
          const datos = await respuesta.json();
          const usuario = datos.usuario ?? datos;
          if (usuario && usuario.nombre !== undefined) {
            setNombre(usuario.nombre ?? "");
            setEdad(String(usuario.edad ?? ""));
            return;
          }
        }

        const respuestaLista = await fetch(API_URL);
        const datosLista = await respuestaLista.json();
        const encontrado = (datosLista.usuarios ?? []).find(
          (u) => String(u.id ?? u._id) === String(id)
        );
        if (encontrado) {
          setNombre(encontrado.nombre ?? "");
          setEdad(String(encontrado.edad ?? ""));
        }
      } catch (error) {
        console.log("Error API:", error);
        mostrarMensaje("Error", "No se pudo cargar el usuario");
      } finally {
        setCargando(false);
      }
    };
    cargarUsuario();
  }, [id]);

  const guardarCambios = async () => {
    const nombreLimpio = nombre.trim();
    const edadLimpia = edad.trim();

    if (nombreLimpio === "" || edadLimpia === "") {
      mostrarMensaje("Vacíos", "Completa el formulario");
      return;
    }

    const edadNumerica = Number(edadLimpia);
    if (Number.isNaN(edadNumerica)) {
      mostrarMensaje("Dato inválido", "La edad debe ser un número");
      return;
    }

    try {
      setGuardando(true);
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": AUTH_HEADER,
        },
        body: JSON.stringify({
          nombre: nombreLimpio,
          edad: edadNumerica,
        }),
      });

      if (!respuesta.ok) {
        throw new Error(`Error del servidor: ${respuesta.status}`);
      }

      mostrarMensaje("Éxito", "Usuario actualizado correctamente");
      router.back();
    } catch (error) {
      console.log("Error API:", error);
      mostrarMensaje("Error", "No se pudo actualizar el usuario");
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Actualizar Usuario</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          editable={!guardando}
        />

        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
          editable={!guardando}
        />

        <Pressable style={styles.boton} onPress={guardarCambios} disabled={guardando}>
          <Text style={styles.textoBoton}>
            {guardando ? "Guardando..." : "Guardar cambios"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 22,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 4,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
    fontSize: 16,
  },
  boton: {
    backgroundColor: '#FACC15',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 6,
  },
  textoBoton: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: 'bold',
  },
});