import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useProblemas } from '../hooks/useProblemas';
import { solucionarProblema } from '../api/problemas';

type RouteParams = {
  problemaId: number;
};

export default function ProblemaDetalleScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { problemaId } = route.params as RouteParams;

  const { problemas, loading, error, reload } = useProblemas();
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

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

  const problema = problemas.find((p) => p.id === problemaId);

  if (!problema) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-500">Problema no encontrado</Text>
      </View>
    );
  }

  const esPendiente = !problema.reparado;

  const resolver = async () => {
    try {
      setSaving(true);
      setActionError(null);
      await solucionarProblema(problema.id);
      await reload();
      navigation.goBack();
    } catch (e: any) {
      setActionError(e.message ?? 'No se pudo resolver el problema');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      {/* Encabezado */}
      <View className="mb-4">
        <Text className="text-2xl font-semibold">
          Problema #{problema.id}
        </Text>

        {esPendiente ? (
          <View className="mt-2 p-3 rounded-lg bg-red-50">
            <Text className="text-red-700 font-medium">
              🔴 Problema pendiente
            </Text>
            <Text className="text-red-600 text-sm mt-1">
              Este problema aún no ha sido solucionado y puede afectar la operación.
            </Text>
          </View>
        ) : (
          <View className="mt-2 p-3 rounded-lg bg-green-50">
            <Text className="text-green-700 font-medium">
              🟢 Problema resuelto
            </Text>
            <Text className="text-green-600 text-sm mt-1">
              Este problema ya fue solucionado correctamente.
            </Text>
          </View>
        )}
      </View>

      {/* Descripción */}
      <View className="mb-6">
        <Text className="text-gray-500 text-sm mb-1">Descripción</Text>
        <Text className="text-gray-800">
          {problema.descripcion}
        </Text>
      </View>

      {/* Fechas */}
      <View className="mb-6">
        {problema.fecha_informado && (
          <Text className="text-gray-400 text-xs">
            Reportado el {problema.fecha_informado}
          </Text>
        )}

        {problema.fecha_solucion && (
          <Text className="text-gray-400 text-xs mt-1">
            Resuelto el {problema.fecha_solucion}
          </Text>
        )}
      </View>

      {actionError && (
        <Text className="text-red-600 text-sm mb-2">
          {actionError}
        </Text>
      )}

      {/* Acción */}
      {esPendiente ? (
        <Pressable
          className={`mt-auto rounded-xl p-4 items-center ${
            saving ? 'bg-gray-400' : 'bg-black'
          }`}
          disabled={saving}
          onPress={resolver}
        >
          {saving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold">
              Marcar como resuelto
            </Text>
          )}
        </Pressable>
      ) : (
        <View className="mt-auto p-4 items-center">
          <Text className="text-gray-400 text-sm">
            No hay acciones disponibles para este problema.
          </Text>
        </View>
      )}
    </View>
  );
}
