import { StatusBar } from "expo-status-bar";

import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Modal,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Platform,
} from "react-native";

import * as LocalAuthentication from "expo-local-authentication";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(true);

  async function authenticate() {
    const hasPassword = await LocalAuthentication.isEnrolledAsync();
    if (!hasPassword) return;
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      alert("Autenticação realizada com sucesso");
    } else {
      alert("A autenticação falhou. Por favor, digite sua senha!");
    }
    if (Platform.OS === "android") {
      // setIsModalVisible(false);
      console.log(success);
    }
  }

  Platform.OS === "ios" && authenticate();

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.email}
        placeholder="Email"
        placeholderTextColor="#333"
      />
      <TextInput
        style={styles.senha}
        placeholder="Senha"
        placeholderTextColor="#333"
      />
      <TouchableOpacity style={styles.button} onPress={() => authenticate()}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {Platform.OS === "android" && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onShow={authenticate}
        >
          <View style={styles.modal}>
            <Text style={styles.authText}>
              Autentique-se utilizando sua digital
            </Text>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                LocalAuthentication.cancelAuthenticate();
                setIsModalVisible(false);
              }}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  email: {
    width: "80%",
    borderWidth: 1,
    borderColor: "rgb(34, 34, 34)",
    borderRadius: 5,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    marginBottom: 0,
    padding: 20,
  },
  senha: {
    width: "80%",
    borderWidth: 1,
    borderTopColor: "transparent",
    borderColor: "rgb(34, 34, 34)",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    marginBottom: 10,
    padding: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    borderColor: "transparent",
    fontSize: 18,
  },
  button: {
    width: "80%",
    borderWidth: 2,
    borderColor: "#d70665",
    backgroundColor: "#d70665",
    borderRadius: 8,
    marginBottom: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderColor: "#ddd",
    borderWidth: 3,
  },
  cancelButton: { borderColor: "#333" },
  cancelText: {
    color: "#d70665",
    fontSize: 24,
  },
  authText: {
    color: "#333",
    fontSize: 16,
  },
});
