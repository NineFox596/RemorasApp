import { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
// expo install @react-native-picker/picker


import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';
import { useUsuarios } from '../hooks/useUsuarios';

export default function NuevoEquipoScreen({
  setVista,
}: {
  setVista: (v: Vista) => void;
}) {
  const { usuarios } = useUsuarios();

  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [departamentoId, setDepartamentoId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!usuarioId || !departamentoId) {
      alert('Selecciona usuario y departamento');
      return;
    }

    const nuevoEquipo = {
      usuario_id: usuarioId,
      departamento_id: departamentoId,
      fecha_control: new Date().toISOString(),
    };

    console.log('POST /equipos', nuevoEquipo);

    // 👉 aquí va el POST real después
    alert('Equipo creado correctamente');
    setVista('equipos');
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
            const usuario = usuarios.find(u => u.id === value);
            if (usuario) {
              setDepartamentoId(usuario.departamento_id);
            }
          }}
        >
          <Picker.Item label="Selecciona un usuario" value={null} />
          {usuarios.map(u => (
            <Picker.Item
              key={u.id}
              label={u.nombre}
              value={u.id}
            />
          ))}
        </Picker>
      </View>

      {/* DEPARTAMENTO (AUTOMÁTICO) */}
      <Text style={commonStyles.label}>Departamento</Text>
      <View style={commonStyles.card}>
        <Text style={commonStyles.textMuted}>
          {usuarios.find(u => u.id === usuarioId)?.departamento ?? '—'}
        </Text>
      </View>

      <TouchableOpacity
        style={commonStyles.successButton}
        onPress={handleSubmit}
      >
        <Text style={commonStyles.successButtonText}>
          Guardar equipo
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
