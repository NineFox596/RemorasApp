import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEquipos } from '../hooks/useEquipos';
import type { EquiposStackParamList } from '../navigation/stacks/EquiposStack';

type NavProp = NativeStackNavigationProp<EquiposStackParamList, 'EquiposMain'>;

export default function EquiposScreen() {
  const { equipos, loading, error, reload } = useEquipos();
  const navigation = useNavigation<NavProp>();

  if (loading && equipos.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-500">Cargando equipos…</Text>
      </View>
    );
  }

  if (error && equipos.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-red-600 text-center">
          Ocurrió un error al cargar los equipos
        </Text>
        <Text className="text-gray-500 text-center mt-2">
          {error}
        </Text>
      </View>
    );
  }

  if (!equipos || equipos.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">No hay equipos registrados</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={equipos}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        refreshing={loading}
        onRefresh={reload}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('EquipoDetalle', { equipoId: item.id })
            }
          >
            <View className="mb-3 rounded-xl border border-gray-200 p-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold">
                  Equipo #{item.id}
                </Text>

                {item.tiene_problema && (
                  <View className="px-2 py-1 rounded-full bg-red-100">
                    <Text className="text-xs text-red-700">Con problemas</Text>
                  </View>
                )}
              </View>

              <Text className="text-gray-700 mt-1">
                Departamento: {item.departamento}
              </Text>

              <Text className="text-gray-500">
                Ubicación: {item.ubicacion}
              </Text>

              <Text className="text-gray-500 mt-1">
                Estado: {item.estado}
              </Text>

              {item.fecha_control && (
                <Text className="text-gray-400 text-xs mt-1">
                  Último control: {item.fecha_control}
                </Text>
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
