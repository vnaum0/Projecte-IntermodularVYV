import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Utils/Firebase";

export default function RestaurantCard({ id, nomRestaurant, city, imatgePrincipal }) {
    const [averageRating, setAverageRating] = useState(0);
    const [reviewsAmount, setReviewsAmount] = useState(0);

    useEffect(() => {
        if (!id) return;

        const reviewsRef = collection(db, "restaurants", id, "reviews");

        const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
            const reviewsData = snapshot.docs.map(doc => doc.data());
            const cantidad = reviewsData.length;
            const promedio = cantidad === 0 ? 0 : reviewsData.reduce((sum, r) => sum + r.puntuacion, 0) / cantidad;

            setAverageRating(promedio);
            setReviewsAmount(cantidad);
        });

        return () => unsubscribe();
    }, [id]);

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(averageRating);
        const halfStar = averageRating - fullStars >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesome key={i} name="star" size={18} color="#FFD700" />);
        }
        if (halfStar) {
            stars.push(<FontAwesome key="half" name="star-half-full" size={18} color="#FFD700" />);
        }
        while (stars.length < 5) {
            stars.push(<FontAwesome key={'empty' + stars.length} name="star-o" size={18} color="#FFD700" />);
        }
        return <View style={{ flexDirection: "row" }}>{stars}</View>;
    };

    return (
        <View style={styles.card}>
            <Image source={{ uri: imatgePrincipal }} style={styles.image} onError={(e) => console.log("Error cargando imagen:", e.nativeEvent.error)} />
            <View style={styles.info}>
                <Text style={styles.name}>{nomRestaurant}</Text>
                <Text style={styles.reviewsText}>Reviews: {averageRating.toFixed(1)}/5 ({reviewsAmount})</Text>
                {renderStars()}
                <Text style={styles.city}>City: {city}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        margin: 10,
        padding: 10,
        borderWidth: 1.2,
        borderColor: "#ccc"
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 10,
        marginRight: 10
    },
    info: { flex: 1, justifyContent: "center" },
    name: { fontSize: 18, fontWeight: "bold" },
    reviewsText: { fontSize: 14, marginTop: 4 },
    city: { fontSize: 14, marginTop: 6, color: "#555" }
});