import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ModalSlideScreen from '../screens/modals/ModalSlideScreen';
import ModalFadeScreen from '../screens/modals/ModalFadeScreen';
import ModalNoneScreen from '../screens/modals/ModalNoneScreen';

const Tab = createBottomTabNavigator();

export default function ModalTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="Slide" component={ModalSlideScreen} />
      <Tab.Screen name="Fade" component={ModalFadeScreen} />
      <Tab.Screen name="None" component={ModalNoneScreen} />
    </Tab.Navigator>
  );
}