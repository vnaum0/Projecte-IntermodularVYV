import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Utils/firebaseConfig";
import RestaurantBubble from "../components/RestaurantBubble";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function MapConBubble() {
  const navigation = useNavigation();
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCentered, setMapCentered] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const mapRef = useRef(null);

  // Obtener ubicación del usuario
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permiso de ubicación denegado");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Highest, distanceInterval: 5 },
        (loc) => {
          setUserLocation({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      );
    })();
  }, []);

  // Cargar restaurantes de Firebase
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const snapshot = await getDocs(collection(db, "restaurants"));
        const data = snapshot.docs
          .map((doc) => {
            const docData = doc.data();
            if (
              !docData.coordinate ||
              typeof docData.coordinate.latitude !== "number" ||
              typeof docData.coordinate.longitude !== "number"
            ) {
              console.warn(`Restaurante ${docData.nomRestaurant} sin coordenadas válidas`);
              return null;
            }
            return { id: doc.id, ...docData };
          })
          .filter(Boolean);
        setMarkers(data);
      } catch (error) {
        console.error("Error al leer restaurantes:", error);
      }
    };
    fetchRestaurants();
  }, []);

  // Centrar mapa automáticamente al inicio
  useEffect(() => {
    if (mapRef.current && userLocation && !initialized) {
      mapRef.current.animateCamera(
        { center: userLocation, zoom: 15 },
        { duration: 500 }
      );
      setInitialized(true);
    }
  }, [userLocation, initialized]);

  const handleRegionChangeComplete = (region) => {
    if (!userLocation) return;
    const distance = Math.sqrt(
      Math.pow(region.latitude - userLocation.latitude, 2) +
      Math.pow(region.longitude - userLocation.longitude, 2)
    );
    setMapCentered(distance < 0.001);
  };

  const centerOnUser = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.animateCamera(
        { center: userLocation, zoom: 15 },
        { duration: 500 }
      );
    }
  };

  const handlePopupPress = () => {
    if (selectedMarker) {
      navigation.navigate("DetalleRestaurante", { restaurant: selectedMarker });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {userLocation && (
          <Marker coordinate={userLocation} pinColor="blue" title="Tú estás aquí" />
        )}

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.coordinate.latitude,
              longitude: marker.coordinate.longitude,
            }}
            onPress={() => setSelectedMarker(marker)}
          />
        ))}
      </MapView>

      {!mapCentered && userLocation && (
        <TouchableOpacity style={styles.centerButton} onPress={centerOnUser}>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>📍</Text>
        </TouchableOpacity>
      )}

      {selectedMarker && (
        <TouchableOpacity style={styles.bubbleContainer} onPress={handlePopupPress}>
          <RestaurantBubble data={selectedMarker} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  bubbleContainer: {
    position: "absolute",
    bottom: 120,
    left: width / 6,
    width: (2 * width) / 3,
    alignItems: "center",
  },
  centerButton: {
    position: "absolute",
    bottom: 250,
    right: 20,
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 30,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
