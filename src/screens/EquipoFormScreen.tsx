import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useEquipos } from '../hooks/useEquipos';
import { useEquipoForm } from '../hooks/useEquipoForm';
import type { EquiposStackParamList } from '../navigation/stacks/EquiposStack';

type RouteProps = RouteProp<
  EquiposStackParamList,
  'EquipoForm'
>;

type NavigationProp = NativeStackNavigationProp<
  EquiposStackParamList,
  'EquipoForm'
>;

export default function EquipoFormScreen({
  route,
}: {
  route: RouteProps;
}) {
  const navigation = useNavigation<NavigationProp>();
  const { equipoId } = route.params ?? {};

  const { equipos } = useEquipos();
  const equipo = equipoId
    ? equipos.find((e) => e.id === equipoId)
    : undefined;

  const [departamento, setDepartamento] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [estado, setEstado] = useState('');

  // Precargar datos si es edición
  useEffect(() => {
    if (equipo) {
      setDepartamento(equipo.departamento);
      setUbicacion(equipo.ubicacion);
      setEstado(equipo.estado);
    }
  }, [equipo]);

  const payload =
    departamento && ubicacion && estado
      ? { departamento, ubicacion, estado }
      : undefined;

  const {
    guardar,
    loading,
    error,
    isEdit,
  } = useEquipoForm(equipoId, payload);

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-semibold mb-4">
        {isEdit ? 'Editar equipo' : 'Crear equipo'}
      </Text>

      <TextInput
        className="border rounded p-2 mb-3"
        placeholder="Departamento"
        value={departamento}
        onChangeText={setDepartamento}
      />

      <TextInput
        className="border rounded p-2 mb-3"
        placeholder="Ubicación"
        value={ubicacion}
        onChangeText={setUbicacion}
      />

      <TextInput
        className="border rounded p-2 mb-4"
        placeholder="Estado"
        value={estado}
        onChangeText={setEstado}
      />

      {error && (
        <Text className="text-red-600 mb-3">
          {error}
        </Text>
      )}

      <Pressable
        className={`p-4 rounded-xl items-center ${
          loading ? 'bg-gray-400' : 'bg-black'
        }`}
        disabled={!payload || loading}
        onPress={async () => {
          await guardar();
          navigation.goBack();
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold">
            {isEdit ? 'Guardar cambios' : 'Crear equipo'}
          </Text>
        )}
      </Pressable>
    </View>
  );
}
