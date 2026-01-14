import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import StarRating from './StarRating';

export default function RestaurantInfo({ restaurant = {}, averageRating = 0, reviewsAmount = 0 }) {
  // Desestructuramos con valores por defecto
  const {
    nomRestaurant = 'Sin nombre',
    direccio = 'No disponible',
    phone = 'No disponible',
    price = 'No disponible',
    imatgePrincipal,
    coordinate,
  } = restaurant;

  const images = imatgePrincipal ? [imatgePrincipal] : [];

  return (
    <View style={styles.infoContainer}>
      {/* Nombre del restaurante */}
      <Text style={styles.name}>{nomRestaurant}</Text>

      {/* Valoración */}
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>Valoración: </Text>
        <StarRating rating={averageRating || 0} size={20} />
        <Text style={styles.ratingText}>
          ({(averageRating || 0).toFixed(1)}/5), {reviewsAmount || 0} valoraciones
        </Text>
      </View>

      {/* Dirección */}
      <Text style={styles.sectionTitle}>Dirección:</Text>
      <Text style={styles.text}>{direccio}</Text>

      {/* Mapa */}
      {coordinate && coordinate.latitude && coordinate.longitude && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
            }}
            title={nomRestaurant}
          />
        </MapView>
      )}

      {/* Horario */}
      <Text style={styles.sectionTitle}>Horario:</Text>
      <Text style={styles.text}>Lunes 8:00 - 18:00</Text>
      <Text style={styles.text}>Viernes 8:00 - 18:00</Text>

      {/* Teléfono */}
      <Text style={styles.sectionTitle}>Teléfono:</Text>
      <Text style={styles.text}>{phone}</Text>

      {/* Precio */}
      <Text style={styles.sectionTitle}>Precio:</Text>
      <Text style={styles.text}>{price}</Text>

      {/* Imágenes */}
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
  infoContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginBottom: 16,
  },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  ratingText: { fontSize: 16, marginRight: 4 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 12 },
  text: { fontSize: 14, marginBottom: 4 },
  imageScroll: { marginTop: 8, marginBottom: 16 },
  image: { width: 120, height: 80, borderRadius: 8, marginRight: 8 },
  map: { height: 200, marginTop: 8, borderRadius: 8, alignSelf: 'stretch' },
});