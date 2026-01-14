import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function SettingsButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Settings")}
      style={{
        width: 30,       // tightly wrap the icon
        height: 30,      // tightly wrap the icon
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="settings-outline" size={24} color="black" />
    </TouchableOpacity>
  );
}