import { useState, useEffect } from 'react';
import {
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';
import { crearUsuario } from '../api/usuarios';

type Departamento = {
  id: number;
  nombre: string;
};

type Props = {
  setVista: (v: Vista) => void;
};

export default function NuevoUsuarioScreen({ setVista }: Props) {
  const [nombre, setNombre] = useState('');
  const [rut, setRut] = useState('');
  const [departamentoId, setDepartamentoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);

  // Cargar departamentos de referencia (hardcodeados)
  useEffect(() => {
    const listaDepartamentos: Departamento[] = [
      { id: 1, nombre: 'Abastecimiento y Bodega' },
      { id: 2, nombre: 'Mantención' },
      { id: 3, nombre: 'Prevención' },
      { id: 4, nombre: 'Operaciones Robóticas' },
      { id: 5, nombre: 'Contabilidad RRHH' },
      { id: 6, nombre: 'Flota' },
      { id: 7, nombre: 'Administración y Finanzas' },
      { id: 8, nombre: 'Recepción' },
    ];
    setDepartamentos(listaDepartamentos);
  }, []);

  const handleSubmit = async () => {
    if (loading) return;

    if (!nombre.trim() || !rut.trim() || !departamentoId) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    try {
      setLoading(true);

      await crearUsuario({
        nombre: nombre.trim(),
        rut: rut.trim(),
        departamento_id: departamentoId,
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

      {/* Nombre */}
      <Text style={commonStyles.label}>Nombre</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Ej: Juan Pérez"
        value={nombre}
        onChangeText={setNombre}
        editable={!loading}
      />

      {/* RUT */}
      <Text style={commonStyles.label}>RUT</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Ej: 12345678-9"
        value={rut}
        onChangeText={setRut}
        editable={!loading}
      />

      {/* Departamento */}
      <Text style={commonStyles.label}>Departamento</Text>
      <Picker
        selectedValue={departamentoId}
        onValueChange={(value) => setDepartamentoId(Number(value))}
        enabled={!loading}
      >
        <Picker.Item label="Selecciona un departamento" value={null} />
        {departamentos.map((d) => (
          <Picker.Item key={d.id} label={d.nombre} value={d.id} />
        ))}
      </Picker>

      {/* Botón Guardar */}
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
