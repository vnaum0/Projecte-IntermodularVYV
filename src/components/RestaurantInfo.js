import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import StarRating from './StarRatingShow';

export default function RestaurantInfo({ restaurant, averageRating, reviewsAmount }) {
  const images = restaurant.imatgePrincipal ? [restaurant.imatgePrincipal] : [];

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{restaurant.nomRestaurant}</Text>

      {/* Valoración */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Valoración: </Text>
        <StarRating rating={averageRating} size={20} />
        <Text style={styles.ratingText}>
          ({averageRating.toFixed(1)}/5), {reviewsAmount} valoraciones
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Dirección:</Text>
      <Text style={styles.text}>{restaurant.direccio || 'No disponible'}</Text>

      {/* Mapa */}
      {restaurant.coordinate && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: restaurant.coordinate.latitude,
            longitude: restaurant.coordinate.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: restaurant.coordinate.latitude,
              longitude: restaurant.coordinate.longitude,
            }}
            title={restaurant.nomRestaurant}
          />
        </MapView>
      )}

      <Text style={styles.sectionTitle}>Horario:</Text>
      <Text style={styles.text}>Lunes 8:00 - 18:00</Text>
      <Text style={styles.text}>Viernes 8:00 - 18:00</Text>

      <Text style={styles.sectionTitle}>Teléfono:</Text>
      <Text style={styles.text}>{restaurant.phone || 'No disponible'}</Text>

      <Text style={styles.sectionTitle}>Precio:</Text>
      <Text style={styles.text}>{restaurant.price || 'No disponible'}</Text>

      {images.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Imágenes:</Text>
          <ScrollView horizontal style={styles.imageScroll}>
            {images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.image} />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: { padding: 16, backgroundColor: '#f8f8f8', borderRadius: 8, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' },
  ratingText: { fontSize: 16, marginRight: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 12 },
  text: { fontSize: 14, marginBottom: 4 },
  imageScroll: { marginTop: 8, marginBottom: 16 },
  image: { width: 120, height: 80, borderRadius: 8, marginRight: 8 },
  map: { height: 200, marginTop: 8, borderRadius: 8, alignSelf: 'stretch' },
});
