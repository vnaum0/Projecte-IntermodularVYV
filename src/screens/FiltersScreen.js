import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import StarRating from "../components/StarRating";

export default function FiltersScreen() {
  const navigation = useNavigation(); // ✅ para poder navegar
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

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingTop: 50,
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        {/* 🔙 Botón atrás */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Main Menu</Text>

        {/* ⚙️ Botón de ajustes */}
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons name="settings-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "#eee",
            borderRadius: 20,
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginHorizontal: 5,
          }}
        >
          <Text>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#eee",
            borderRadius: 20,
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginHorizontal: 5,
          }}
        >
          <Text>List</Text>
        </TouchableOpacity>
        <Ionicons
          name="filter"
          size={22}
          color="black"
          style={{ marginLeft: 10, marginTop: 5 }}
        />
      </View>

      {/* Qualification */}
      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Qualification</Text>
      <View style={{ marginBottom: 20 }}>
        <StarRating
          maxStars={5}
          rating={rating}
          onChangeRating={setRating}
          size={30}
          color="#FFD700"
          emptyColor="#CCCCCC"
        />
      </View>

      {/* Distance */}
      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Distance</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={distance}
        step={1}
        onValueChange={setDistance}
        minimumTrackTintColor="#7b5cff"
        maximumTrackTintColor="#ddd"
      />
      <Text style={{ textAlign: "center", marginBottom: 20 }}>
        {distance} km
      </Text>

      {/* Price */}
      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Price:</Text>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {["Low", "Mid", "Alto"].map((level) => (
          <TouchableOpacity
            key={level}
            style={{
              backgroundColor: price === level ? "#007bff" : "#eee",
              borderRadius: 20,
              paddingVertical: 8,
              paddingHorizontal: 20,
              marginHorizontal: 5,
            }}
            onPress={() => setPrice(level)}
          >
            <Text style={{ color: price === level ? "#fff" : "#000" }}>
              {level}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Exterior sits */}
      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Exterior sits:</Text>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {["Yes", "No"].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={{
              backgroundColor:
                exterior === (opt === "Yes") ? "#007bff" : "#eee",
              borderRadius: 20,
              paddingVertical: 8,
              paddingHorizontal: 20,
              marginHorizontal: 5,
            }}
            onPress={() => setExterior(opt === "Yes")}
          >
            <Text
              style={{
                color: exterior === (opt === "Yes") ? "#fff" : "#000",
              }}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* City */}
      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>City:</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Picker selectedValue={city} onValueChange={setCity}>
          <Picker.Item label="Manresa" value="Manresa" />
          <Picker.Item label="Barcelona" value="Barcelona" />
          <Picker.Item label="Madrid" value="Madrid" />
        </Picker>
      </View>

      {/* Food */}
      <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Food:</Text>
      <View
        style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 40 }}
      >
        {foodOptions.map((food) => {
          const selected = selectedFoods.includes(food);
          return (
            <TouchableOpacity
              key={food}
              onPress={() => toggleFood(food)}
              style={{
                backgroundColor: selected ? "#007bff" : "#eee",
                borderRadius: 20,
                paddingVertical: 8,
                paddingHorizontal: 15,
                margin: 5,
              }}
            >
              <Text style={{ color: selected ? "#fff" : "#000" }}>
                {food} {selected ? "✕" : ""}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
