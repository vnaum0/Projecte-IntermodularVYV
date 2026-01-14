import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import MainMenuScreen from "./MainMenuScreen";
import ReviewScreen from "./src/screens/ReviewScreen";
import SwitchScreen from "./src/screens/SwitchScreen";
import LlistaScreen from "./src/screens/LlistaScreen";
import NewRestaurant from './src/screens/NewRestaurant';
import MapConBubble from "./src/screens/MapConBubble";
import FiltersScreen from "./src/screens/FiltersScreen";
import DetalleRestauranteScreen from "./src/screens/DetalleRestauranteScreen";
import { ThemeProvider } from "./src/context/ThemeContext";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Review" component={ReviewScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Filters" component={FiltersScreen} />
          <Stack.Screen name="NewRestaurant" component={NewRestaurant} />
          <Stack.Screen name="DetalleRestaurante" component={DetalleRestauranteScreen} />
          <Stack.Screen name="Switch" component={SwitchScreen} />
          <Stack.Screen name="Llista" component={LlistaScreen} />
          <Stack.Screen name="MapConBubble" component={MapConBubble} />

        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}