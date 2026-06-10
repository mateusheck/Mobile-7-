import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Questao4 from './screens/Questao4';
import Questao5 from './screens/Questao5';
import QuestaoStack from './screens/QuestaoStack';
import QuestaoTabs from './screens/QuestaoTabs';
import QuestaoDrawer from './screens/QuestaoDrawer';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Questão 4" component={Questao4} />
        <Drawer.Screen name="Questão 5" component={Questao5} />
        <Drawer.Screen name="Navegação Stack" component={QuestaoStack} />
        <Drawer.Screen name="Navegação Tabs" component={QuestaoTabs} />
        <Drawer.Screen name="Navegação Drawer" component={QuestaoDrawer} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}