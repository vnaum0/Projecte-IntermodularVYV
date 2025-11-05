import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import StarRating from './StarRating';

export default function RestaurantCard({ name, city, rating, reviews, imageUrl, onChangeRating }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.city}>{city}</Text>

        <View style={styles.ratingContainer}>
          <StarRating rating={rating} onChangeRating={onChangeRating} />
          <Text style={styles.ratingText}>{rating}/5</Text>
        </View>

        <Text style={styles.reviews}>{reviews} reseñas</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    width: '90%',
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  info: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
  },
  city: {
    color: '#555',
    marginBottom: 4,
  },
  reviews: {
    marginTop: 4,
    color: '#777',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  }
});