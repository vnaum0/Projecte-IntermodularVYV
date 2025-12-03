// LoginScreen.js
import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ActivityIndicator,Alert,} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../Utils/firebaseConfig';
import { useTheme } from '../context/ThemeContext'; 

export default function LoginScreen({ navigation }) {
  const { isDarkMode } = useTheme(); 
  const theme = isDarkMode ? darkStyles : lightStyles;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setUsernameError('');
    setPasswordError('');

    if (!username) setUsernameError('Username is required');
    if (!password) setPasswordError('Password is required');
    if (!username || !password) return;

    setLoading(true);

    try {
      const q = query(collection(db, 'users'), where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setUsernameError('Username does not exist');
        setLoading(false);
        return;
      }

      const userData = querySnapshot.docs[0].data();
      const email = userData.email;

      await signInWithEmailAndPassword(auth, email, password);

      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('MainMenu');
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        setPasswordError('Incorrect password');
      } else {
        Alert.alert('Error', 'Login failed. Please try again.');
      }
    }

    setLoading(false);
  };

  return (
    <View style={theme.container}>
      <Text style={theme.title}>Login</Text>

      <TextInput
        style={theme.input}
        placeholder="Username"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={username}
        onChangeText={setUsername}
      />
      {usernameError ? <Text style={theme.error}>{usernameError}</Text> : null}

      <TextInput
        style={theme.input}
        placeholder="Password"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? <Text style={theme.error}>{passwordError}</Text> : null}

      <TouchableOpacity
        style={theme.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={theme.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={theme.registerButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={theme.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

/* 🎨 Tema claro */
const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    color: '#000',
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007BFF',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#007BFF',
    fontSize: 18,
  },
});

/* 🌙 Tema oscuro */
const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#1e1e1e',
  },
  error: {
    color: '#ff6b6b',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#4ea8de',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerButton: {
    backgroundColor: '#1e1e1e',
    borderWidth: 1,
    borderColor: '#4ea8de',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#4ea8de',
    fontSize: 18,
  },
});
