import React, { useState } from 'react';
import { View } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Mapa from './src/screens/Mapa';
import Llista from './src/screens/Llista';

const Stack = createNativeStackNavigator();

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleIndexChange = (index, navigation) => {
    setSelectedIndex(index);
    navigation.navigate(index === 0 ? "Mapa" : "Llista");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerTitle: () => (
            <View style={{ width: 200 }}>
              <SegmentedControlTab
                values={['Map', 'List']}
                selectedIndex={selectedIndex}
                onTabPress={(index) => handleIndexChange(index, navigation)}
                borderRadius={20}
                tabsContainerStyle={{ marginTop: 8 }}
              />
            </View>
          ),
        })}
      >
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Llista" component={Llista} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}