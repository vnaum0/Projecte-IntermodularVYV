// SettingsScreen.js
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
  Modal,
  TextInput,
  Button,
  Animated,
} from "react-native";
import { useTheme } from "./context/ThemeContext";
import { Audio } from "expo-av";
import { Picker } from "@react-native-picker/picker";

// Habilitar animaciones Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SettingsScreen() {
  const [openSection, setOpenSection] = useState(null);
  const { isDarkMode, toggleTheme } = useTheme();

  // Estados generales
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationSound, setNotificationSound] = useState("Default");

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Animación de flechas
  const arrowAnim = useRef({}).current;

  const toggleSection = (section) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenSection((prev) => (prev === section ? null : section));
    if (!arrowAnim[section]) arrowAnim[section] = new Animated.Value(0);
    Animated.timing(arrowAnim[section], {
      toValue: openSection === section ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const openModal = (type) => {
    setModalType(type);
    setInputValue("");
    setModalVisible(true);
  };

  const handleConfirmChange = () => {
    if (modalType === "username") console.log("Nuevo username:", inputValue);
    if (modalType === "password") console.log("Nueva contraseña:", inputValue);
    if (modalType === "sound") console.log("Sonido seleccionado:", notificationSound);
    setModalVisible(false);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to permanently delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => console.log("Account deleted") },
      ]
    );
  };

  const handleShowAccountInfo = () => {
    setModalType("info");
    setModalVisible(true);
  };

  const theme = isDarkMode ? darkStyles : lightStyles;

  const accountInfo = { username: "JohnDoe", email: "john@example.com", joined: "2023-07-12" };

  const playSound = async (soundName) => {
    try {
      let soundFile;
      switch (soundName) {
        case "Chime":
          soundFile = require("./assets/sounds/chime.mp3");
          break;
        case "Pop":
          soundFile = require("./assets/sounds/pop.mp3");
          break;
        case "Bell":
          soundFile = require("./assets/sounds/bell.mp3");
          break;
        case "Silent":
          return;
        default:
          soundFile = require("./assets/sounds/default.mp3");
      }
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) sound.unloadAsync();
      });
    } catch (error) {
      console.log("Error al reproducir sonido:", error);
    }
  };

  const sections = [
    { key: "account", emoji: "🧍", title: "Account" },
    { key: "notifications", emoji: "🔔", title: "Notifications" },
    { key: "appearance", emoji: "🎨", title: "Appearance" },
    { key: "privacy", emoji: "🔐", title: "Privacy & Safety" },
    { key: "support", emoji: "💬", title: "Help & Support" },
  ];

  const renderArrow = (section) => {
    const rotate = arrowAnim[section]
      ? arrowAnim[section].interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] })
      : "0deg";
    return <Animated.Text style={{ transform: [{ rotate }], fontSize: 18 }}>{">"}</Animated.Text>;
  };

  return (
    <ScrollView style={theme.container}>
      <Text style={theme.title}>Settings</Text>

      {sections.map((section) => (
        <View key={section.key}>
          <TouchableOpacity style={theme.sectionHeader} onPress={() => toggleSection(section.key)}>
            <Text style={theme.sectionTitle}>
              {section.emoji} {section.title}
            </Text>
            {renderArrow(section.key)}
          </TouchableOpacity>

          {openSection === section.key && (
            <View style={theme.sectionContent}>
              {section.key === "account" && (
                <>
                  <TouchableOpacity style={theme.option} onPress={() => openModal("username")}>
                    <Text style={theme.optionText}>Change Username</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={theme.option} onPress={() => openModal("password")}>
                    <Text style={theme.optionText}>Change Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={theme.option} onPress={handleShowAccountInfo}>
                    <Text style={theme.optionText}>Account Info</Text>
                  </TouchableOpacity>
                </>
              )}
              {section.key === "notifications" && (
                <>
                  <TouchableOpacity style={theme.option} onPress={() => openModal("sound")}>
                    <Text style={theme.optionText}>Notification Sounds</Text>
                    <Text style={theme.smallText}>Current: {notificationSound}</Text>
                  </TouchableOpacity>
                  <View style={[theme.option, { flexDirection: "row", justifyContent: "space-between" }]}>
                    <Text style={theme.optionText}>Disable Notifications</Text>
                    <Switch value={!notificationsEnabled} onValueChange={() => setNotificationsEnabled(!notificationsEnabled)} />
                  </View>
                </>
              )}
              {section.key === "appearance" && (
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={theme.optionText}>Dark Mode</Text>
                  <Switch value={isDarkMode} onValueChange={toggleTheme} />
                </View>
              )}
              {section.key === "privacy" && (
                <>
                  <TouchableOpacity style={theme.option} onPress={handleDeleteAccount}>
                    <Text style={[theme.optionText, { color: "red" }]}>Delete Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={theme.option}>
                    <Text style={theme.optionText}>Disable Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={theme.option}>
                    <Text style={theme.optionText}>Two-Step Verification</Text>
                  </TouchableOpacity>
                </>
              )}
              {section.key === "support" && (
                <TouchableOpacity style={theme.option}>
                  <Text style={theme.optionText}>Client Support</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      ))}

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={[styles.modalBox, { backgroundColor: isDarkMode ? "#1e1e1e" : "#fff" }]}>
            {(modalType === "username" || modalType === "password") && (
              <>
                <Text style={[styles.modalTitle, { color: isDarkMode ? "#fff" : "#000" }]}>
                  {modalType === "username" ? "Change Username" : "Change Password"}
                </Text>
                <TextInput
                  style={[styles.input, { color: isDarkMode ? "#fff" : "#000" }]}
                  placeholder={modalType === "username" ? "New username" : "New password"}
                  placeholderTextColor="#888"
                  secureTextEntry={modalType === "password"}
                  value={inputValue}
                  onChangeText={setInputValue}
                />
              </>
            )}
            {modalType === "info" && (
              <>
                <Text style={[styles.modalTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Account Information</Text>
                <Text style={theme.optionText}>👤 Username: JohnDoe</Text>
                <Text style={theme.optionText}>📧 Email: john@example.com</Text>
                <Text style={theme.optionText}>📅 Joined: 2023-07-12</Text>
              </>
            )}
            {modalType === "sound" && (
              <>
                <Text style={[styles.modalTitle, { color: isDarkMode ? "#fff" : "#000" }]}>Select Notification Sound</Text>
                <Picker
                  selectedValue={notificationSound}
                  onValueChange={(value) => {
                    setNotificationSound(value);
                    playSound(value);
                  }}
                  style={{ color: isDarkMode ? "#fff" : "#000" }}
                >
                  <Picker.Item label="Default" value="Default" />
                  <Picker.Item label="Chime" value="Chime" />
                  <Picker.Item label="Pop" value="Pop" />
                  <Picker.Item label="Bell" value="Bell" />
                  <Picker.Item label="Silent" value="Silent" />
                </Picker>
              </>
            )}
            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 15 }}>
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
              <View style={{ width: 10 }} />
              {modalType !== "info" && <Button title="Confirm" onPress={handleConfirmChange} />}
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// Estilos
const baseStyles = { sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" }, smallText: { fontSize: 12, opacity: 0.6 }, iconColor: "#4ea8de" };

const lightStyles = StyleSheet.create({
  ...baseStyles,
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#000" },
  sectionTitle: { fontSize: 20, fontWeight: "600", color: "#007bff" },
  sectionContent: { backgroundColor: "#f2f2f2", borderRadius: 12, padding: 12, marginTop: 5 },
  option: { paddingVertical: 12 },
  optionText: { fontSize: 16, color: "#000" },
  smallText: baseStyles.smallText,
  iconColor: "#007bff",
});

const darkStyles = StyleSheet.create({
  ...baseStyles,
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "600", color: "#4ea8de" },
  sectionContent: { backgroundColor: "#1e1e1e", borderRadius: 12, padding: 12, marginTop: 5 },
  option: { paddingVertical: 12 },
  optionText: { fontSize: 16, color: "#fff" },
  smallText: baseStyles.smallText,
  iconColor: "#4ea8de",
});

const styles = StyleSheet.create({
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.4)" },
  modalBox: { width: "85%", borderRadius: 14, padding: 20, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 10, elevation: 10 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderRadius: 8, padding: 10, marginTop: 10, borderColor: "#ccc" },
});
