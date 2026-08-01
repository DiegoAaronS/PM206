import React, { useState, useCallback } from 'react';
import { SafeAreaView, View, Text, Pressable, StyleSheet, Modal, ActivityIndicator, Alert, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const API_URL = "http://172.20.10.11:5000/v1/usuarios";

const AUTH_HEADER = "Basic YWRtaW46MTIzNA==";

export default function DetalleUsuarioScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const mostrarMensaje = (titulo, mensaje) => {
    if (Platform.OS === "web") {
      window.alert(`${titulo}\n${mensaje}`);
    } else {
      Alert.alert(titulo, mensaje);
    }
  };

  const obtenerUsuario = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch(`${API_URL}/${id}`);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        const encontrado = datos.usuario ?? datos;
        console.log("GET /usuarios/:id respondió:", encontrado);
        if (encontrado && encontrado.nombre !== undefined) {
          setUsuario(encontrado);
          return;
        }
      } else {
        console.log(`GET /usuarios/${id} devolvió status ${respuesta.status}, usando fallback`);
      }

      const respuestaLista = await fetch(API_URL);
      const datosLista = await respuestaLista.json();
      const encontradoEnLista = (datosLista.usuarios ?? []).find(
        (u) => String(u.id ?? u._id) === String(id)
      );
      console.log("Fallback en listado, encontrado:", encontradoEnLista);
      setUsuario(encontradoEnLista ?? null);

    } catch (error) {
      console.log("Error API:", error);
      mostrarMensaje("Error", "No se pudo cargar el usuario");
    } finally {
      setCargando(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      obtenerUsuario();
    }, [id])
  );

  const eliminarUsuario = async () => {
    try {
      setEliminando(true);
      const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { "Authorization": AUTH_HEADER },
      });

      if (!respuesta.ok) {
        throw new Error(`Error del servidor: ${respuesta.status}`);
      }

      setModalVisible(false);
      mostrarMensaje("Éxito", "Usuario eliminado exitosamente");
      router.back();
    } catch (error) {
      console.log("Error API:", error);
      mostrarMensaje("Error", "No se pudo eliminar el usuario");
    } finally {
      setEliminando(false);
    }
  };

  if (cargando) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2563EB" />
      </SafeAreaView>
    );
  }

  if (!usuario) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.info}>No se encontró el usuario</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Detalles del Usuario</Text>

        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.valor}>{usuario.nombre}</Text>

        <View style={styles.linea} />

        <Text style={styles.label}>Edad</Text>
        <Text style={styles.valor}>{usuario.edad} años</Text>

        <Pressable
          style={styles.botonActualizar}
          onPress={() => router.push(`/actualizar/${id}`)}
        >
          <Text style={styles.textoBoton}>Actualizar</Text>
        </Pressable>

        <Pressable
          style={styles.botonEliminar}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textoBoton}>Eliminar</Text>
        </Pressable>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Confirmar eliminación</Text>
            <Text style={styles.modalTexto}>
              ¿Estás seguro de que deseas eliminar al usuario {usuario.nombre}?
            </Text>

            <View style={styles.modalBotones}>
              <Pressable
                style={styles.botonCancelar}
                onPress={() => setModalVisible(false)}
                disabled={eliminando}
              >
                <Text style={styles.textoCancelar}>Cancelar</Text>
              </Pressable>

              <Pressable
                style={styles.botonConfirmar}
                onPress={eliminarUsuario}
                disabled={eliminando}
              >
                <Text style={styles.textoBoton}>
                  {eliminando ? "Eliminando..." : "Sí, eliminar"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    padding: 20,
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
  },
  valor: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 2,
  },
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 14,
  },
  botonActualizar: {
    backgroundColor: '#FACC15',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  botonEliminar: {
    backgroundColor: '#DC2626',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 22,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalTexto: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botonCancelar: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  botonConfirmar: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  textoCancelar: {
    color: '#374151',
    fontSize: 15,
    fontWeight: '600',
  },
});