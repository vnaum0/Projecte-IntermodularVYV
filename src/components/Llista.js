import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Utils/Firebase";
import RestaurantCard from "./RestaurantCard";

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
        <View>
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