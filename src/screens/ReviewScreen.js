import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ReviewScreen() {
  const [rating, setRating] = useState(5);
  const [outdoor, setOutdoor] = useState(null);
  const [price, setPrice] = useState("Mid");
  const [foodTypes, setFoodTypes] = useState(["Spanish", "Italian"]);
  const [review, setReview] = useState("");

  const toggleFood = (food) => {
    setFoodTypes((prev) =>
      prev.includes(food) ? prev.filter((f) => f !== food) : [...prev, food]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Assessment:</Text>

      {/* ⭐ Rating */}
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={32}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* 📝 Review text */}
      <Text style={styles.label}>Write your review:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your review..."
        multiline
        value={review}
        onChangeText={setReview}
      />

      {/* 🏞 Outdoor */}
      <View style={styles.section}>
        <Text style={styles.label}>Outdoor?</Text>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.optionBtn, outdoor === true && styles.optionSelected]}
            onPress={() => setOutdoor(true)}
          >
            <Text style={styles.optionText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionBtn, outdoor === false && styles.optionSelected]}
            onPress={() => setOutdoor(false)}
          >
            <Text style={styles.optionText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 📸 Images */}
      <View style={styles.imageRow}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" }}
          style={styles.image}
        />
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1541542684-4a312a1f2a24" }}
          style={styles.image}
        />
      </View>

      {/* 💰 Price */}
      <Text style={styles.label}>Price:</Text>
      <View style={styles.row}>
        {["Low", "Mid", "High"].map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.optionBtn, price === p && styles.optionSelected]}
            onPress={() => setPrice(p)}
          >
            <Text style={styles.optionText}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🍽 Food */}
      <Text style={styles.label}>Food:</Text>
      <View style={styles.foodContainer}>
        {["Spanish", "Italian", "German"].map((food) => (
          <TouchableOpacity
            key={food}
            style={[
              styles.foodTag,
              foodTypes.includes(food) && styles.foodSelected,
            ]}
            onPress={() => toggleFood(food)}
          >
            <Text
              style={[
                styles.foodText,
                foodTypes.includes(food) && styles.foodTextSelected,
              ]}
            >
              {food}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 💾 Save */}
      <TouchableOpacity style={styles.saveBtn}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  ratingContainer: { flexDirection: "row", marginBottom: 15 },
  label: { fontWeight: "500", marginTop: 10, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    height: 80,
    textAlignVertical: "top",
  },
  section: { marginTop: 15 },
  row: { flexDirection: "row", gap: 10 },
  optionBtn: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  optionSelected: { backgroundColor: "#007bff" },
  optionText: { color: "#000", fontWeight: "500" },
  imageRow: { flexDirection: "row", gap: 10, marginVertical: 10 },
  image: { width: 160, height: 100, borderRadius: 10 },
  foodContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  foodTag: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  foodSelected: { backgroundColor: "#007bff", borderColor: "#007bff" },
  foodText: { color: "#555" },
  foodTextSelected: { color: "#fff" },
  saveBtn: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
