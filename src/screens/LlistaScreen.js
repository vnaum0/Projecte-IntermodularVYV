import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Utils/firebaseConfig";
import RestaurantCard from "../components/RestaurantCard"; // Asegúrate de que la ruta sea correcta

export default function Llista() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        const ref = collection(db, "restaurants");
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRestaurants(data);
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={restaurants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <RestaurantCard
                        id={item.id}
                        nomRestaurant={item.nomRestaurant}
                        city={item.direccio}
                        imatgePrincipal={item.imatgePrincipal}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  }
});
