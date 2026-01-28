import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EquiposScreen from '../../screens/EquiposScreen';
import EquipoDetalleScreen from '../../screens/EquipoDetalleScreen';
import AsignarComponenteScreen from '../../screens/AsignarComponenteScreen';

export type EquiposStackParamList = {
  EquiposMain: undefined;
  EquipoDetalle: { equipoId: number };
  AsignarComponente: { equipoId: number };
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
      <Stack.Screen
        name="AsignarComponente"
        component={AsignarComponenteScreen}
        options={{ title: 'Asignar componente' }}
      />
    </Stack.Navigator>
  );
}
