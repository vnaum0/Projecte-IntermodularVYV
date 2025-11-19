import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Utils/Firebase";
import { FontAwesome } from '@expo/vector-icons';

export default function RestaurantBubble({ data }) {
  const [averageRating, setAverageRating] = useState(0);
  const [reviewsAmount, setReviewsAmount] = useState(0);

  // Calcular media y cantidad de reviews
  useEffect(() => {
    if (!data?.id) return;

    const reviewsRef = collection(db, "restaurants", data.id, "reviews");

    const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => doc.data());
      const cantidad = reviewsData.length;
      const promedio = cantidad === 0 ? 0 : reviewsData.reduce((sum, r) => sum + r.puntuacion, 0) / cantidad;

      setAverageRating(promedio);
      setReviewsAmount(cantidad);
    });

    return () => unsubscribe();
  }, [data?.id]);

  // Función para mostrar estrellas con FontAwesome
  const renderStars = (rating, size = 14, color = "#FFD700") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesome key={i} name="star" size={size} color={color} />);
    }
    if (halfStar) {
      stars.push(<FontAwesome key="half" name="star-half-empty" size={size} color={color} />);
    }
    while (stars.length < 5) {
      stars.push(<FontAwesome key={'empty' + stars.length} name="star-o" size={size} color={color} />);
    }

    return <View style={{ flexDirection: "row" }}>{stars}</View>;
  };

  if (!data) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: data.imatgePrincipal }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{data.nomRestaurant}</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
          <Text style={styles.reviews}>
            Reviews: ({averageRating.toFixed(1)}/5), {reviewsAmount} Reviews
          </Text>
          {renderStars(averageRating)}
        </View>

        <Text style={styles.city}>Address: {data.direccio || 'No disponible'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 6,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },
  reviews: {
    fontSize: 12,
    color: "#555",
    marginRight: 6,
  },
  city: {
    fontSize: 12,
    color: "#777",
  },
});
