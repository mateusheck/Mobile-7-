import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScrollViewScreen from '../screens/scroll/ScrollViewScreen';
import FlatListScreen from '../screens/scroll/FlatListScreen';
import SectionListScreen from '../screens/scroll/SectionListScreen';

const Tab = createBottomTabNavigator();
export default function ScrollTabsNavigator(){
  return (
    <Tab.Navigator>
      
      <Tab.Screen name="ScrollView" component={ScrollViewScreen} />
      
      <Tab.Screen name="FlatList" component={FlatListScreen} />
      
      <Tab.Screen name="SectionList" component={SectionListScreen} />

    </Tab.Navigator>
  );
}