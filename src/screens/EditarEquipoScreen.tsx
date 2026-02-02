import { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';

import { useUsuarios } from '../hooks/useUsuarios';
import { actualizarEquipo } from '../api/equipos';
import { Equipo } from '../types/api';

type Props = {
  setVista: (v: Vista) => void;
  equipo: Equipo;
};

export default function EditarEquipoScreen({
  setVista,
  equipo,
}: Props) {
  const { usuarios } = useUsuarios();

  const [usuarioId, setUsuarioId] = useState<number>(
    equipo.usuario?.id ?? 0
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!usuarioId) {
      Alert.alert('Error', 'Selecciona un usuario');
      return;
    }

    const usuarioSeleccionado = usuarios.find(
      u => u.id === usuarioId
    );

    if (!usuarioSeleccionado) {
      Alert.alert('Error', 'Usuario inválido');
      return;
    }

    try {
      setLoading(true);

      await actualizarEquipo(equipo.id, {
        estado: equipo.estado,
        usuario_id: usuarioId,
        departamento_id: usuarioSeleccionado.departamento_id,
      });

      Alert.alert('OK', 'Equipo actualizado correctamente');
      setVista('equipos');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo actualizar el equipo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={commonStyles.screen}
      contentContainerStyle={commonStyles.scrollContent}
    >
      <BackButton onPress={() => setVista('equipos')} />

      <Text style={commonStyles.title}>
        Editar Equipo #{equipo.id}
      </Text>

      {/* USUARIO */}
      <Text style={commonStyles.label}>Usuario</Text>
      <View style={commonStyles.input}>
        <Picker
          selectedValue={usuarioId}
          onValueChange={(value) => setUsuarioId(value)}
        >
          {usuarios.map(u => (
            <Picker.Item
              key={u.id}
              label={u.nombre}
              value={u.id}
            />
          ))}
        </Picker>
      </View>

      {/* DEPARTAMENTO AUTOMÁTICO */}
      <Text style={commonStyles.label}>Departamento</Text>
      <View style={commonStyles.card}>
        <Text style={commonStyles.textMuted}>
          {
            usuarios.find(u => u.id === usuarioId)?.departamento ??
            '—'
          }
        </Text>
      </View>

      <TouchableOpacity
        style={[
          commonStyles.successButton,
          loading && { opacity: 0.6 },
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={commonStyles.successButtonText}>
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
