import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import StarRating from "../components/StarRating";
import SettingsButton from "../components/SettingsButton";
import { useTheme } from "../context/ThemeContext";

export default function FiltersScreen() {
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState(5);
  const [distance, setDistance] = useState(50);
  const [price, setPrice] = useState(null);
  const [exterior, setExterior] = useState(null);
  const [city, setCity] = useState("Manresa");
  const [selectedFoods, setSelectedFoods] = useState(["Mexican", "Japanese"]);

  const foodOptions = [
    "Mexican",
    "Japanese",
    "German",
    "Chinese",
    "Spanish",
    "Italian",
    "British",
    "Moroccan",
  ];

  const toggleFood = (food) => {
    setSelectedFoods((prev) =>
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
          <ScrollView
            contentContainerStyle={[themeStyles.container, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}
          >
            {/* Header */}
            <SettingsButton title="Filters" showBack />

            {/* Qualification */}
            <Text style={themeStyles.label}>Qualification</Text>
            <StarRating
              maxStars={5}
              rating={rating}
              onChangeRating={setRating}
              size={30}
              color="#FFD700"
              emptyColor={isDarkMode ? "#555" : "#CCC"}
            />

            {/* Distance */}
            <Text style={themeStyles.label}>Distance</Text>
            <Slider
              minimumValue={0}
              maximumValue={100}
              value={distance}
              step={1}
              onValueChange={setDistance}
              minimumTrackTintColor="#7b5cff"
              maximumTrackTintColor={isDarkMode ? "#555" : "#ddd"}
            />
            <Text style={[themeStyles.valueText]}>{distance} km</Text>

            {/* Price */}
            <Text style={themeStyles.label}>Price:</Text>
            <View style={themeStyles.row}>
              {["Low", "Mid", "High"].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    themeStyles.optionBtn,
                    price === level && themeStyles.optionSelected,
                  ]}
                  onPress={() => setPrice(level)}
                >
                  <Text style={themeStyles.optionText(level === price)}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Exterior */}
            <Text style={themeStyles.label}>Exterior sits:</Text>
            <View style={themeStyles.row}>
              {["Yes", "No"].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    themeStyles.optionBtn,
                    exterior === (opt === "Yes") && themeStyles.optionSelected,
                  ]}
                  onPress={() => setExterior(opt === "Yes")}
                >
                  <Text style={themeStyles.optionText(exterior === (opt === "Yes"))}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* City */}
            <Text style={themeStyles.label}>City:</Text>
            <View style={[themeStyles.pickerContainer, { borderColor: isDarkMode ? "#555" : "#ccc" }]}>
              <Picker
                selectedValue={city}
                onValueChange={setCity}
                style={{ color: isDarkMode ? "#fff" : "#000" }}
              >
                <Picker.Item label="Manresa" value="Manresa" />
                <Picker.Item label="Barcelona" value="Barcelona" />
                <Picker.Item label="Madrid" value="Madrid" />
              </Picker>
            </View>

            {/* Food */}
            <Text style={themeStyles.label}>Food:</Text>
            <View style={themeStyles.foodContainer}>
              {foodOptions.map((food) => {
                const selected = selectedFoods.includes(food);
                return (
                  <TouchableOpacity
                    key={food}
                    onPress={() => toggleFood(food)}
                    style={[
                      themeStyles.foodBtn,
                      selected && themeStyles.foodSelected,
                    ]}
                  >
                    <Text style={themeStyles.foodText(selected)}>
                      {food} {selected ? "✕" : ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const baseStyles = {
  row: { flexDirection: "row", marginBottom: 20, flexWrap: "wrap" },
  foodContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 40 },
};

const lightStyles = StyleSheet.create({
  ...baseStyles,
  container: { paddingHorizontal: 20, paddingBottom: 50 },
  label: { fontWeight: "bold", marginBottom: 8, color: "#000", marginTop: 20 },
  valueText: { textAlign: "center", marginBottom: 20, color: "#000" },
  row: { flexDirection: "row", marginBottom: 20, flexWrap: "wrap" },
  optionBtn: {
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  optionSelected: { backgroundColor: "#007bff" },
  optionText: (selected = false) => ({
    color: selected ? "#fff" : "#000",
  }),
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  foodBtn: {
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  foodSelected: { backgroundColor: "#007bff" },
  foodText: (selected = false) => ({ color: selected ? "#fff" : "#000" }),
});

const darkStyles = StyleSheet.create({
  ...baseStyles,
  container: { paddingHorizontal: 20, paddingBottom: 50 },
  label: { fontWeight: "bold", marginBottom: 8, color: "#fff", marginTop: 20 },
  valueText: { textAlign: "center", marginBottom: 20, color: "#fff" },
  row: { flexDirection: "row", marginBottom: 20, flexWrap: "wrap" },
  optionBtn: {
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  optionSelected: { backgroundColor: "#007bff" },
  optionText: (selected = false) => ({
    color: selected ? "#fff" : "#fff",
  }),
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  foodBtn: {
    backgroundColor: "#2a2a2a",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  foodSelected: { backgroundColor: "#007bff" },
  foodText: (selected = false) => ({ color: selected ? "#fff" : "#fff" }),
});

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
});