import { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';

export default function NuevoEquipoScreen({
  setVista,
}: {
  setVista: (v: Vista) => void;
}) {
  const [estado, setEstado] = useState('Operativo');
  const [departamento, setDepartamento] = useState('');
  const [ubicacion, setUbicacion] = useState('Sede');

  const handleSubmit = () => {
    if (!estado || !departamento || !ubicacion) {
      alert('Completa todos los campos');
      return;
    }

    const nuevoEquipo = {
      estado,
      departamento,
      ubicacion,
      fecha_control: new Date().toISOString(),
      tiene_problema: false,
      usuario_id: 3, // Sin Asignar
    };

    console.log('POST /equipos', nuevoEquipo);

    // 👉 aquí después va el POST real
    alert('Equipo creado (mock)');
    setVista('equipos');
  };

  return (
    <ScrollView
      style={commonStyles.screen}
      contentContainerStyle={commonStyles.scrollContent}
    >
      <BackButton onPress={() => setVista('equipos')} />

      <Text style={commonStyles.title}>
        Nuevo Equipo
      </Text>

      {/* ESTADO */}
      <Text style={commonStyles.label}>Estado</Text>
      <TextInput
        style={commonStyles.input}
        value={estado}
        onChangeText={setEstado}
      />

      {/* DEPARTAMENTO */}
      <Text style={commonStyles.label}>Departamento</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Ej: Mantención, Flota"
        value={departamento}
        onChangeText={setDepartamento}
      />

      {/* UBICACIÓN */}
      <Text style={commonStyles.label}>Ubicación</Text>
      <TextInput
        style={commonStyles.input}
        value={ubicacion}
        onChangeText={setUbicacion}
      />

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
