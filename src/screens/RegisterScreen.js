// RegisterScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "../Utils/firebaseConfig";
import { useTheme } from "../context/ThemeContext"; // 👈 Importamos el contexto

export default function RegisterScreen({ navigation }) {
  const { isDarkMode } = useTheme(); // 👈 Obtenemos el estado global
  const theme = isDarkMode ? darkStyles : lightStyles; // 👈 Seleccionamos estilos según el modo

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    general: "",
  });

  const clearErrors = () =>
    setErrors({
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
      general: "",
    });

  const handleRegister = async () => {
    clearErrors();
    let newErrors = {};

    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!repeatPassword) newErrors.repeatPassword = "Repeat your password";
    if (password && repeatPassword && password !== repeatPassword) {
      newErrors.repeatPassword = "Passwords do not match";
    }

    setLoading(true);

    try {
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        newErrors.username = "Username already exists";
      }

      if (email) {
        const emailMethods = await fetchSignInMethodsForEmail(auth, email);
        if (emailMethods.length > 0) {
          newErrors.email = "Email already in use";
        }
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...newErrors }));
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), { username, email });

      setLoading(false);
      navigation.navigate("Login");
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        general: "Registration failed. Please try again.",
      }));
      setLoading(false);
    }
  };

  return (
    <View style={theme.container}>
      <Text style={theme.title}>Register</Text>

      <TextInput
        placeholder="Username"
        placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
        style={theme.input}
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setErrors((prev) => ({ ...prev, username: "" }));
        }}
      />
      {errors.username ? <Text style={theme.error}>{errors.username}</Text> : null}

      <TextInput
        placeholder="Email"
        placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
        style={theme.input}
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrors((prev) => ({ ...prev, email: "" }));
        }}
        autoCapitalize="none"
      />
      {errors.email ? <Text style={theme.error}>{errors.email}</Text> : null}

      <TextInput
        placeholder="Password"
        placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
        style={theme.input}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors((prev) => ({ ...prev, password: "" }));
        }}
        secureTextEntry
      />
      {errors.password ? <Text style={theme.error}>{errors.password}</Text> : null}

      <TextInput
        placeholder="Repeat Password"
        placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
        style={theme.input}
        value={repeatPassword}
        onChangeText={(text) => {
          setRepeatPassword(text);
          setErrors((prev) => ({ ...prev, repeatPassword: "" }));
        }}
        secureTextEntry
      />
      {errors.repeatPassword ? (
        <Text style={theme.error}>{errors.repeatPassword}</Text>
      ) : null}

      {errors.general ? <Text style={theme.error}>{errors.general}</Text> : null}

      <TouchableOpacity style={theme.button} onPress={handleRegister}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={theme.buttonText}>Register</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={theme.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

/* 🎨 Tema claro */
const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
    color: "#000",
    backgroundColor: "#f9f9f9",
  },
  error: {
    color: "red",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  link: {
    color: "#007bff",
    marginTop: 15,
  },
});

/* 🌙 Tema oscuro */
const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
    color: "#fff",
    backgroundColor: "#1e1e1e",
  },
  error: {
    color: "#ff6b6b",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  button: {
    backgroundColor: "#4ea8de",
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  link: {
    color: "#4ea8de",
    marginTop: 15,
  },
});
