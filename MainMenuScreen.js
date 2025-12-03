import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function MainMenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Ir a Filtros"
        onPress={() => navigation.navigate('Filters')}
      />

      <Button
        title="Ir a Reseñas"
        onPress={() => navigation.navigate('Review')}
      />

      <Button
        title="Nuevo Restaurante"
        onPress={() => navigation.navigate('NewRestaurant')}
      />

      <Button
        title="Ir a Switch (Lista/Mapa)"
        onPress={() => navigation.navigate('Switch')}
      />

      <Button
        title="Detalles de restaurante"
        onPress={() => navigation.navigate('DetalleRestaurante', { restaurant })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
    padding: 20,
  },
});