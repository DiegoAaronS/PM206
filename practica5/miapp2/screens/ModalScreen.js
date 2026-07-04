import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  Pressable,
} from 'react-native';

export default function ModalBottomSheetScreen() {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [modalNormalVisible, setModalNormalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ejemplo de Modal y BottomSheet</Text>

      {/* Botón para abrir Modal normal (centrado) */}
      <View style={styles.buttonSpacing}>
        <Button
          title="Abrir Modal Normal"
          onPress={() => setModalNormalVisible(true)}
        />
      </View>

      {/* Botón para abrir BottomSheet (simulado con Modal) */}
      <View style={styles.buttonSpacing}>
        <Button
          title="Abrir BottomSheet"
          onPress={() => setBottomSheetVisible(true)}
        />
      </View>

      {/* ========= MODAL NORMAL (centrado) ========= */}
      <Modal
        animationType="fade"       // o "slide"
        transparent={true}
        visible={modalNormalVisible}
        onRequestClose={() => setModalNormalVisible(false)}
      >
        <View style={styles.centeredOverlay}>
          <View style={styles.modalNormal}>
            <Text style={styles.modalTitle}>Modal Normal</Text>
            <Text style={styles.modalText}>
              Este es un modal centrado, típico para alertas o formularios.
            </Text>
            <Pressable
              style={styles.botonCerrar}
              onPress={() => setModalNormalVisible(false)}
            >
              <Text style={styles.textoBoton}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ========= BOTTOMSHEET (simulado con Modal) ========= */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={bottomSheetVisible}
        onRequestClose={() => setBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetOverlay}>
          <View style={styles.bottomSheet}>
            <Text style={styles.texto}>¡Hola! Este es un BottomSheet.</Text>
            <Pressable
              style={styles.boton}
              onPress={() => setBottomSheetVisible(false)}
            >
              <Text style={styles.textoBoton}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonSpacing: {
    marginVertical: 8,
    width: '60%',
  },

  // ----- Estilos para Modal normal (centrado) -----
  centeredOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalNormal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  // ----- Estilos para BottomSheet (simulado) -----
  bottomSheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',   // importante para que salga desde abajo
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  texto: {
    fontSize: 20,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },
  botonCerrar: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});