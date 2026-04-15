import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import LoginScreen from '../components/LoginScreen';
import RegisterScreen from '../components/RegisterScreen';
import FormScreen from '../components/FormScreen';
import ListScreen from '../components/ListScreen';

import HomeScreen from '../src/screens/HomeScreen';
import ModalTabsNavigator from '../src/navigation/ModalTabsNavigator';
import ScrollTabsNavigator from '../src/navigation/ScrollTabsNavigator';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>

      <Drawer.Screen name="Home" component={HomeScreen} />

      <Drawer.Screen name="Novo Aluguel" component={FormScreen} />

      <Drawer.Screen name="Lista de Aluguéis" component={ListScreen} />

      <Drawer.Screen name="Modais" component={ModalTabsNavigator} />

      <Drawer.Screen name="Scroll" component={ScrollTabsNavigator} />

    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

      <Stack.Screen
        name="Home"
        component={MyDrawer}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}