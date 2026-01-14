import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext"; // si usas tema

export default function ReviewScreen() {
  const { isDarkMode } = useTheme(); // detectar modo oscuro
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

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={isDarkMode ? "light-content" : "dark-content"}
        />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={[themeStyles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
            <Text style={themeStyles.title}>Your Assessment:</Text>

            {/* ⭐ Rating */}
            <View style={themeStyles.ratingContainer}>
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
            <Text style={themeStyles.label}>Write your review:</Text>
            <TextInput
              style={[themeStyles.input, { backgroundColor: isDarkMode ? "#1e1e1e" : "#fff", color: isDarkMode ? "#fff" : "#000", borderColor: isDarkMode ? "#444" : "#ccc" }]}
              placeholder="Type your review..."
              placeholderTextColor={isDarkMode ? "#888" : "#aaa"}
              multiline
              value={review}
              onChangeText={setReview}
            />

            {/* 🏞 Outdoor */}
            <View style={themeStyles.section}>
              <Text style={themeStyles.label}>Outdoor?</Text>
              <View style={themeStyles.row}>
                <TouchableOpacity
                  style={[themeStyles.optionBtn, outdoor === true && themeStyles.optionSelected]}
                  onPress={() => setOutdoor(true)}
                >
                  <Text style={themeStyles.optionText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[themeStyles.optionBtn, outdoor === false && themeStyles.optionSelected]}
                  onPress={() => setOutdoor(false)}
                >
                  <Text style={themeStyles.optionText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 📸 Images */}
            <View style={themeStyles.imageRow}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5" }}
                style={themeStyles.image}
              />
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1541542684-4a312a1f2a24" }}
                style={themeStyles.image}
              />
            </View>

            {/* 💰 Price */}
            <Text style={themeStyles.label}>Price:</Text>
            <View style={themeStyles.row}>
              {["Low", "Mid", "High"].map((p) => (
                <TouchableOpacity
                  key={p}
                  style={[themeStyles.optionBtn, price === p && themeStyles.optionSelected]}
                  onPress={() => setPrice(p)}
                >
                  <Text style={themeStyles.optionText}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 🍽 Food */}
            <Text style={themeStyles.label}>Food:</Text>
            <View style={themeStyles.foodContainer}>
              {["Spanish", "Italian", "German"].map((food) => (
                <TouchableOpacity
                  key={food}
                  style={[
                    themeStyles.foodTag,
                    foodTypes.includes(food) && themeStyles.foodSelected,
                  ]}
                  onPress={() => toggleFood(food)}
                >
                  <Text
                    style={[
                      themeStyles.foodText,
                      foodTypes.includes(food) && themeStyles.foodTextSelected,
                    ]}
                  >
                    {food}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* 💾 Save */}
            <TouchableOpacity style={themeStyles.saveBtn}>
              <Text style={themeStyles.saveText}>Save</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const baseStyles = {
  section: { marginTop: 15 },
  row: { flexDirection: "row", gap: 10 },
  foodContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
};

const lightStyles = StyleSheet.create({
  ...baseStyles,
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#000" },
  ratingContainer: { flexDirection: "row", marginBottom: 15 },
  label: { fontWeight: "500", marginTop: 10, marginBottom: 6, color: "#000" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, height: 80, textAlignVertical: "top" },
  optionBtn: { backgroundColor: "#f1f1f1", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  optionSelected: { backgroundColor: "#007bff" },
  optionText: { color: "#000", fontWeight: "500" },
  imageRow: { flexDirection: "row", gap: 10, marginVertical: 10 },
  image: { width: 160, height: 100, borderRadius: 10 },
  foodTag: { borderWidth: 1, borderColor: "#ccc", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  foodSelected: { backgroundColor: "#007bff", borderColor: "#007bff" },
  foodText: { color: "#555" },
  foodTextSelected: { color: "#fff" },
  saveBtn: { marginTop: 20, backgroundColor: "#007bff", paddingVertical: 12, borderRadius: 25, alignItems: "center" },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

const darkStyles = StyleSheet.create({
  ...baseStyles,
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "600", marginBottom: 10, color: "#fff" },
  ratingContainer: { flexDirection: "row", marginBottom: 15 },
  label: { fontWeight: "500", marginTop: 10, marginBottom: 6, color: "#fff" },
  input: { borderWidth: 1, borderColor: "#444", borderRadius: 10, padding: 10, height: 80, textAlignVertical: "top", color: "#fff", backgroundColor: "#1e1e1e" },
  optionBtn: { backgroundColor: "#2a2a2a", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  optionSelected: { backgroundColor: "#007bff" },
  optionText: { color: "#fff", fontWeight: "500" },
  imageRow: { flexDirection: "row", gap: 10, marginVertical: 10 },
  image: { width: 160, height: 100, borderRadius: 10 },
  foodTag: { borderWidth: 1, borderColor: "#555", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  foodSelected: { backgroundColor: "#007bff", borderColor: "#007bff" },
  foodText: { color: "#ccc" },
  foodTextSelected: { color: "#fff" },
  saveBtn: { marginTop: 20, backgroundColor: "#007bff", paddingVertical: 12, borderRadius: 25, alignItems: "center" },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
});
