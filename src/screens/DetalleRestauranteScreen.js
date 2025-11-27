import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../Utils/Firebase';
import RestaurantInfo from '../components/RestaurantInfo';
import ReviewsList from '../components/ReviewsList';

export default function DetalleRestauranteScreen({ route }) {
  const { restaurant } = route.params;
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(restaurant.averageRating || 0);
  const [reviewsAmount, setReviewsAmount] = useState(restaurant.reviewsAmount || 0);

  useEffect(() => {
    const reviewsRef = collection(db, 'restaurants', restaurant.id, 'reviews');
    const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setReviews(data);

      const cantidad = data.length;
      const promedio = cantidad === 0 ? 0 : data.reduce((sum, r) => sum + r.puntuacion, 0) / cantidad;

      setReviewsAmount(cantidad);
      setAverageRating(promedio);
    });

    return () => unsubscribe();
  }, [restaurant.id]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <RestaurantInfo restaurant={restaurant} averageRating={averageRating} reviewsAmount={reviewsAmount} />
      <ReviewsList reviews={reviews} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 16 },
});
