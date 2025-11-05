import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

export default function CenterMapButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.centerButton} onPress={onPress}>
      <Text style={styles.icon}>📍</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  icon: { color: "white", fontWeight: "bold", fontSize: 18 },
});
