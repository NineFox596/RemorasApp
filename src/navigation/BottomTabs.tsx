import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStack from './stacks/HomeStack';
import EquiposStack from './stacks/EquiposStack';
import ProblemasStack from './stacks/ProblemasStack';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Equipos"
        component={EquiposStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Problemas"
        component={ProblemasStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
