import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EquiposScreen from '../../screens/EquiposScreen';
import EquipoDetalleScreen from '../../screens/EquipoDetalleScreen';

export type EquiposStackParamList = {
  EquiposMain: undefined;
  EquipoDetalle: { equipoId: number };
};

const Stack = createNativeStackNavigator<EquiposStackParamList>();

export default function EquiposStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EquiposMain"
        component={EquiposScreen}
        options={{ title: 'Equipos' }}
      />
      <Stack.Screen
        name="EquipoDetalle"
        component={EquipoDetalleScreen}
        options={{ title: 'Detalle del equipo' }}
      />
    </Stack.Navigator>
  );
}
