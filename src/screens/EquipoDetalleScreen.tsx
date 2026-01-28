import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useEquipos } from '../hooks/useEquipos';
import { useComponentesPorEquipo } from '../hooks/useComponentesPorEquipo';
import { useEliminarEquipo } from '../hooks/useEliminarEquipo';
import type { EquiposStackParamList } from '../navigation/stacks/EquiposStack';

type RouteParams = {
  equipoId: number;
};

export default function EquipoDetalleScreen() {
  const route = useRoute();
  const { equipoId } = route.params as RouteParams;

  const navigation =
    useNavigation<NativeStackNavigationProp<EquiposStackParamList>>();

  const { equipos, loading, error } = useEquipos();

  const {
    componentes,
    loading: loadingComponentes,
    error: errorComponentes,
  } = useComponentesPorEquipo(equipoId);

  const {
    eliminar,
    loading: deleting,
    error: deleteError,
  } = useEliminarEquipo(equipoId);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-red-600 text-center">{error}</Text>
      </View>
    );
  }

  const equipo = equipos.find((e) => e.id === equipoId);

  if (!equipo) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Equipo no encontrado</Text>
      </View>
    );
  }

  const confirmarEliminacion = () => {
    Alert.alert(
      'Eliminar equipo',
      'Esta acción no se puede deshacer. ¿Deseas continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            await eliminar();
            navigation.navigate('EquiposMain');
          },
        },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-white p-4">
      {/* Datos del equipo */}
      <Text className="text-2xl font-semibold mb-2">
        Equipo #{equipo.id}
      </Text>

      <Text className="text-gray-700 mt-2">
        Departamento: {equipo.departamento}
      </Text>

      <Text className="text-gray-500 mt-1">
        Ubicación: {equipo.ubicacion}
      </Text>

      <Text className="text-gray-500 mt-1">
        Estado: {equipo.estado}
      </Text>

      {/* Acciones */}
      <View className="mt-6 gap-3">
        {/* Acción principal */}
        <Button
          title="Asignar componente"
          onPress={() =>
            navigation.navigate('AsignarComponente', { equipoId })
          }
        />

        {/* Acción secundaria */}
        <Button
          title="Editar equipo"
          onPress={() =>
            navigation.navigate('EquipoForm', { equipoId })
          }
        />

        {/* Acción destructiva */}
        <Button
          title={deleting ? 'Eliminando…' : 'Eliminar equipo'}
          color="red"
          onPress={confirmarEliminacion}
          disabled={deleting}
        />

        {deleteError && (
          <Text className="text-red-600 text-sm text-center">
            {deleteError}
          </Text>
        )}
      </View>

      {/* Componentes */}
      <View className="mt-6">
        <Text className="text-lg font-semibold mb-2">
          Componentes
        </Text>

        {loadingComponentes && (
          <Text className="text-gray-500">
            Cargando componentes…
          </Text>
        )}

        {errorComponentes && (
          <Text className="text-red-600">
            {errorComponentes}
          </Text>
        )}

        {!loadingComponentes && componentes.length === 0 && (
          <Text className="text-gray-500">
            Este equipo no tiene componentes asignados
          </Text>
        )}

        {componentes.map((c) => (
          <View
            key={`${c.equipo_id}-${c.componente_id}`}
            className="mb-2 rounded-lg border border-gray-200 p-3"
          >
            <Text className="font-medium">{c.nombre}</Text>
            <Text className="text-gray-500 text-sm">{c.tipo}</Text>
            <Text className="text-gray-400 text-xs">
              Cantidad: {c.cantidad}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
