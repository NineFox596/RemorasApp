import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useComponentes } from '../hooks/useComponentes';
import { useAsignarComponente } from '../hooks/useAsignarComponente';
import type { EquiposStackParamList } from '../navigation/stacks/EquiposStack';

type RouteProps = RouteProp<
  EquiposStackParamList,
  'AsignarComponente'
>;

type NavigationProp = NativeStackNavigationProp<
  EquiposStackParamList,
  'AsignarComponente'
>;

export default function AsignarComponenteScreen({
  route,
}: {
  route: RouteProps;
}) {
  const { equipoId } = route.params;
  const navigation = useNavigation<NavigationProp>();

  const { componentes, loading, error, reload } = useComponentes();

  const [componenteId, setComponenteId] = useState<number | null>(null);
  const [cantidad, setCantidad] = useState('1');

  const {
    asignar,
    loading: saving,
    error: actionError,
  } = useAsignarComponente(
    componenteId
      ? {
          equipoId,
          componenteId,
          cantidad: Number(cantidad),
        }
      : null
  );

  // Cargar componentes al entrar
  useEffect(() => {
    reload();
  }, [reload]);

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
        <Text className="text-red-600 text-center">
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-semibold mb-3">
        Selecciona un componente
      </Text>

      <FlatList
        data={componentes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Pressable
            className={`p-3 mb-2 rounded-lg border ${
              componenteId === item.id
                ? 'border-black'
                : 'border-gray-300'
            }`}
            onPress={() => setComponenteId(item.id)}
          >
            <Text className="font-medium">{item.nombre}</Text>
            <Text className="text-gray-500 text-sm">
              {item.tipo}
            </Text>
          </Pressable>
        )}
      />

      <TextInput
        className="border rounded p-2 mt-4"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
        placeholder="Cantidad"
      />

      {actionError && (
        <Text className="text-red-600 mt-2">
          {actionError}
        </Text>
      )}

      <Pressable
        className={`mt-4 p-4 rounded-xl items-center ${
          saving ? 'bg-gray-400' : 'bg-black'
        }`}
        disabled={!componenteId || saving}
        onPress={async () => {
          await asignar();
          navigation.goBack();
        }}
      >
        {saving ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold">
            Asignar componente
          </Text>
        )}
      </Pressable>
    </View>
  );
}
