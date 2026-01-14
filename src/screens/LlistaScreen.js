import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Utils/firebaseConfig";
import RestaurantCard from "../components/RestaurantCard";
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

export default function Llista() {
  const { isDarkMode } = useTheme();
  const [restaurants, setRestaurants] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const ref = collection(db, "restaurants");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRestaurants(data);
    });
    return () => unsubscribe();
  }, []);

  const handlePress = (restaurant) => {
    navigation.navigate("DetalleRestaurante", { restaurant });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
        <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <FlatList
          contentContainerStyle={{ padding: 10 }}
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <RestaurantCard
                id={item.id}
                nomRestaurant={item.nomRestaurant}
                city={item.direccio}
                imatgePrincipal={item.imatgePrincipal}
              />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
});