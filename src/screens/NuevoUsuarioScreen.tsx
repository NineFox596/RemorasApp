import { useState } from 'react';
import {
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';
import { crearUsuario } from '../api/usuarios';

type Props = {
  setVista: (v: Vista) => void;
};

export default function NuevoUsuarioScreen({ setVista }: Props) {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;

    if (!nombre.trim() || !rut.trim() || !departamento.trim()) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      setLoading(true);

      await crearUsuario({
        nombre: nombre.trim(),
        rut: rut.trim(),
        departamento_id: Number(departamento), // suponiendo que tu backend espera un número
      });

      Alert.alert('OK', 'Usuario creado correctamente', [
        { text: 'Aceptar', onPress: () => setVista('usuarios') },
      ]);
    } catch (err: any) {
      console.error('Error al crear usuario:', err);
      Alert.alert(
        'Error',
        err?.response?.data?.message || 'No se pudo crear el usuario'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={commonStyles.screen}
      contentContainerStyle={commonStyles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <BackButton onPress={() => setVista('usuarios')} />

      <Text style={commonStyles.title}>Nuevo Usuario</Text>

      <Text style={commonStyles.label}>Nombre</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Ej: Juan Pérez"
        value={nombre}
        onChangeText={setNombre}
        editable={!loading}
        returnKeyType="next"
      />

      <Text style={commonStyles.label}>RUT</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Ej: 12345678-9"
        value={rut}
        onChangeText={setRut}
        editable={!loading}
        returnKeyType="next"
      />

      <Text style={commonStyles.label}>Departamento ID</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Ej: 1"
        value={departamento}
        onChangeText={setDepartamento}
        keyboardType="numeric"
        editable={!loading}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

      <TouchableOpacity
        style={[
          commonStyles.successButton,
          loading && { opacity: 0.6 },
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={commonStyles.successButtonText}>
          {loading ? 'Guardando...' : 'Guardar usuario'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
