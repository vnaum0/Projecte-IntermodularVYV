import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../Utils/firebaseConfig';
import RestaurantInfo from '../components/RestaurantInfo';
import ReviewsList from '../components/ReviewsList';
import { useTheme } from '../context/ThemeContext';

export default function DetalleRestauranteScreen({ route, navigation }) {
  const { isDarkMode } = useTheme();
  const restaurantParam = route?.params?.restaurant;

  if (!restaurantParam) {
    return <Text style={{ padding: 16 }}>No se encontró el restaurante.</Text>;
  }

  const restaurant = restaurantParam;
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(restaurant.averageRating || 0);
  const [reviewsAmount, setReviewsAmount] = useState(restaurant.reviewsAmount || 0);

  useEffect(() => {
    if (!restaurant.id) return;
    const reviewsRef = collection(db, 'restaurants', restaurant.id, 'reviews');
    const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setReviews(data);
      const cantidad = data.length;
      const promedio = cantidad === 0 ? 0 : data.reduce((sum, r) => sum + (r.puntuacion || 0), 0) / cantidad;
      setReviewsAmount(cantidad);
      setAverageRating(promedio);
    });
    return () => unsubscribe();
  }, [restaurant.id]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
        <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
          <RestaurantInfo restaurant={restaurant} averageRating={averageRating} reviewsAmount={reviewsAmount} />
          <ReviewsList reviews={reviews} />

          <TouchableOpacity
            style={styles.newReviewButton}
            onPress={() => navigation.navigate('Review', { restaurant })}
          >
            <Text style={styles.buttonText}>Agregar Reseña</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 16 },
  newReviewButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});