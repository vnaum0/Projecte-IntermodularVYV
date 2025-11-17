import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MapaConBubble from './src/screens/MapaConBubble';
import DetalleRestaurante from './src/screens/DetalleRestauranteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Mapa">
        <Stack.Screen
          name="Mapa"
          component={MapaConBubble}
          options={{ title: 'Mapa de Restaurantes' }}
        />
        <Stack.Screen
          name="DetalleRestaurante"
          component={DetalleRestaurante}
          options={{ title: 'Detalle Restaurante' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
