import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StarRating from './StarRating';

export default function ReviewsList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <Text style={styles.noReviews}>No hay reviews todavía.</Text>;
  }

  // Formato dd/mm/yyyy
  const formatFecha = (firebaseFecha) => {
    if (!firebaseFecha) return "";

    // Si es Timestamp de Firestore
    const dateObj = firebaseFecha.toDate
      ? firebaseFecha.toDate()
      : new Date(firebaseFecha);

    const dia = String(dateObj.getDate()).padStart(2, "0");
    const mes = String(dateObj.getMonth() + 1).padStart(2, "0");
    const anyo = dateObj.getFullYear();

    return `${dia}/${mes}/${anyo}`;
  };

  return (
    <View style={styles.reviewsContainer}>
      <Text style={styles.sectionTitle}>Reseñas:</Text>

      {reviews.map((review, index) => (
        <View key={index} style={styles.reviewCard}>

          {/* Nombre + fecha */}
          <View style={styles.headerRow}>
            <Text style={styles.reviewAuthor}>{review.nombreUsuario}</Text>
            <Text style={styles.reviewDate}>{formatFecha(review.fecha)}</Text>
          </View>

          <Text style={styles.reviewText}>{review.comentario}</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <StarRating rating={review.puntuacion} size={14} />
            <Text style={styles.reviewRating}> ({review.puntuacion}/5)</Text>
          </View>

        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  reviewsContainer: { 
    padding: 16, 
    backgroundColor: '#e0f7fa', 
    borderRadius: 8 
  },

  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 8 
  },

  reviewCard: {
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#c0c0c0',
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // nombre izq — fecha der
    marginBottom: 4,
  },

  reviewAuthor: { 
    fontWeight: 'bold' 
  },

  reviewDate: { 
    fontSize: 12, 
    color: '#555',
    textAlign: 'right'
  },

  reviewText: { 
    fontSize: 14, 
    marginBottom: 4 
  },

  reviewRating: { 
    fontSize: 12, 
    color: '#555', 
    marginLeft: 4 
  },

  noReviews: { 
    fontSize: 14, 
    padding: 16 
  },
});
