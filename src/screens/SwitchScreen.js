import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import SettingsButton from "../components/SettingsButton";
import FilterButton from "../components/FilterButton";
import MapConBubble from './MapConBubble';
import Llista from './LlistaScreen';
import { useTheme } from '../context/ThemeContext';

export default function SwitchScreen({ navigation }) {
  const { isDarkMode } = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? "#121212" : "#fff" }]}>
        <StatusBar translucent backgroundColor="transparent" barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <SegmentedControlTab
                values={['Map', 'List']}
                selectedIndex={selectedIndex}
                onTabPress={setSelectedIndex}
                borderRadius={20}
                tabsContainerStyle={styles.tabsContainer}
                tabStyle={{ borderColor: 'transparent', backgroundColor: 'transparent'}}
                activeTabStyle={{ backgroundColor: '#FFFFFF', borderRadius: 18 }}
                tabTextStyle={{ color: '#000', fontWeight: '500' }}
                activeTabTextStyle={{ color: '#000', fontWeight: '600' }}
              />
              <View style={styles.buttonsWrapper}>
                <FilterButton />
                <SettingsButton />
              </View>
            </View>

            {/* Contenido */}
            <View style={styles.content}>
              {selectedIndex === 0 ? <MapConBubble /> : <Llista />}
              <TouchableOpacity
                style={styles.newRestaurantButton}
                onPress={() => navigation.navigate('NewRestaurant')}
              >
                <Text style={styles.buttonText}>Agregar Nuevo Restaurante</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  tabsContainer: {
    width: 200,
    backgroundColor: '#E6E6E6',
    borderRadius: 20,
    padding: 6,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  content: { flex: 1, justifyContent: 'flex-start' },
  newRestaurantButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 10,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});