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
import { crearEquipo } from '../api/equipos';

export default function NuevoEquipoScreen({
  setVista,
}: {
  setVista: (v: Vista) => void;
}) {
  const { usuarios } = useUsuarios();

  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [departamentoId, setDepartamentoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!usuarioId || !departamentoId) {
      Alert.alert('Error', 'Selecciona usuario y departamento');
      return;
    }

    const nuevoEquipo = {
      usuario_id: usuarioId,
      departamento_id: departamentoId,
      fecha_control: new Date().toISOString(),
    };

    try {
      setLoading(true);

      await crearEquipo(nuevoEquipo);

      Alert.alert('OK', 'Equipo creado correctamente', [
        { text: 'Aceptar', onPress: () => setVista('equipos') },
      ]);
    } catch (err: any) {
      console.error('Error al crear equipo:', err);
      Alert.alert('Error', 'No se pudo crear el equipo');
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

      <Text style={commonStyles.title}>Nuevo Equipo</Text>

      {/* USUARIO */}
      <Text style={commonStyles.label}>Usuario</Text>
      <View style={commonStyles.input}>
        <Picker
          selectedValue={usuarioId}
          onValueChange={(value) => {
            setUsuarioId(value);
            const usuario = usuarios.find((u) => u.id === value);
            if (usuario) {
              setDepartamentoId(usuario.departamento_id);
            }
          }}
          enabled={!loading}
        >
          <Picker.Item label="Selecciona un usuario" value={null} />
          {usuarios.map((u) => (
            <Picker.Item key={u.id} label={u.nombre} value={u.id} />
          ))}
        </Picker>
      </View>

      {/* DEPARTAMENTO (AUTOMÁTICO) */}
      <Text style={commonStyles.label}>Departamento</Text>
      <View style={commonStyles.card}>
        <Text style={commonStyles.textMuted}>
          {usuarios.find((u) => u.id === usuarioId)?.departamento ?? '—'}
        </Text>
      </View>

      {/* BOTÓN GUARDAR */}
      <TouchableOpacity
        style={[
          commonStyles.successButton,
          loading && { opacity: 0.6 },
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={commonStyles.successButtonText}>
          {loading ? 'Guardando...' : 'Guardar equipo'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
