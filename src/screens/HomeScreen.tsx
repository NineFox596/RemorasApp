import { View, Text, ActivityIndicator } from 'react-native';
import { useEquipos } from '../hooks/useEquipos';
import { useProblemas } from '../hooks/useProblemas';

function StatCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <View className="flex-1 rounded-xl border border-gray-200 p-4 bg-white">
      <Text className="text-gray-500 text-sm">{title}</Text>
      <Text className="text-2xl font-semibold mt-1">{value}</Text>
      {subtitle && (
        <Text className="text-gray-400 text-xs mt-1">{subtitle}</Text>
      )}
    </View>
  );
}

export default function HomeScreen() {
  const {
    equipos,
    loading: loadingEquipos,
    error: errorEquipos,
  } = useEquipos();

  const {
    problemas,
    loading: loadingProblemas,
    error: errorProblemas,
  } = useProblemas();

  const loading = loadingEquipos || loadingProblemas;
  const error = errorEquipos || errorProblemas;

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-gray-500">Cargando resumen…</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        <Text className="text-red-600 text-center mb-2">
          Ocurrió un error al cargar el resumen
        </Text>
        <Text className="text-gray-500 text-center">
          {error}
        </Text>
      </View>
    );
  }

  const totalEquipos = equipos.length;
  const equiposConProblemas = equipos.filter(e => e.tiene_problema).length;

  const totalProblemas = problemas.length;
  const problemasPendientes = problemas.filter(p => !p.reparado).length;

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-2xl font-semibold mb-4">Resumen</Text>

      <View className="flex-row gap-3 mb-3">
        <StatCard
          title="Equipos"
          value={totalEquipos}
          subtitle="Total registrados"
        />
        <StatCard
          title="Con problemas"
          value={equiposConProblemas}
          subtitle="Equipos afectados"
        />
      </View>

      <View className="flex-row gap-3">
        <StatCard
          title="Problemas"
          value={totalProblemas}
          subtitle="Total reportados"
        />
        <StatCard
          title="Pendientes"
          value={problemasPendientes}
          subtitle="Sin resolver"
        />
      </View>
    </View>
  );
}
