import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function FilterButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Filters")}
      style={{
        width: 30,       // tightly wrap the icon
        height: 30,      // tightly wrap the icon
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="funnel-outline" size={24} color="black" />
    </TouchableOpacity>
  );
}