import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProblemasScreen from '../../screens/ProblemasScreen';
import ProblemaDetalleScreen from '../../screens/ProblemaDetalleScreen';

export type ProblemasStackParamList = {
  ProblemasMain: undefined;
  ProblemaDetalle: { problemaId: number };
};

const Stack = createNativeStackNavigator<ProblemasStackParamList>();

export default function ProblemasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProblemasMain"
        component={ProblemasScreen}
        options={{ title: 'Problemas' }}
      />
      <Stack.Screen
        name="ProblemaDetalle"
        component={ProblemaDetalleScreen}
        options={{ title: 'Detalle del problema' }}
      />
    </Stack.Navigator>
  );
}
