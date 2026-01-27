import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useProblemas } from '../hooks/useProblemas';
import type { ProblemasStackParamList } from '../navigation/stacks/ProblemasStack';

type NavProp = NativeStackNavigationProp<
  ProblemasStackParamList,
  'ProblemasMain'
>;

export default function ProblemasScreen() {
  const { problemas, loading, error, reload } = useProblemas();
  const navigation = useNavigation<NavProp>();

  if (loading && problemas.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-500">Cargando problemas…</Text>
      </View>
    );
  }

  if (error && problemas.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-red-600 text-center mb-3">
          Ocurrió un error al cargar los problemas
        </Text>
        <Text className="text-gray-500 text-center mb-4">
          {error}
        </Text>
        <Pressable
          onPress={reload}
          className="px-4 py-2 rounded-lg bg-black"
        >
          <Text className="text-white">Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  if (!problemas || problemas.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">No hay problemas registrados</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={problemas}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 16 }}
        refreshing={loading}
        onRefresh={reload}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.navigate('ProblemaDetalle', {
                problemaId: item.id,
              })
            }
          >
            <View className="mb-3 rounded-xl border border-gray-200 p-4">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold">
                  Problema #{item.id}
                </Text>

                {item.reparado ? (
                  <View className="px-2 py-1 rounded-full bg-green-100">
                    <Text className="text-xs text-green-700">Resuelto</Text>
                  </View>
                ) : (
                  <View className="px-2 py-1 rounded-full bg-red-100">
                    <Text className="text-xs text-red-700">Pendiente</Text>
                  </View>
                )}
              </View>

              <Text className="text-gray-700 mt-2">
                {item.descripcion}
              </Text>

              {item.fecha_informado && (
                <Text className="text-gray-400 text-xs mt-2">
                  Informado: {item.fecha_informado}
                </Text>
              )}

              {item.fecha_solucion && (
                <Text className="text-gray-400 text-xs">
                  Solucionado: {item.fecha_solucion}
                </Text>
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
