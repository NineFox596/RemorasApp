import { useState } from 'react';
import {
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';

export default function NuevoUsuarioScreen({
  setVista,
}: {
  setVista: (v: Vista) => void;
}) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [departamento, setDepartamento] = useState('');

  const handleSubmit = () => {
    if (!nombre || !email || !departamento) {
      alert('Completa todos los campos');
      return;
    }

    // 👉 acá después llamas a tu API
    console.log({
      nombre,
      email,
      departamento,
    });

    alert('Usuario creado (mock)');
    setVista('usuarios');
  };

  return (
    <ScrollView
      style={commonStyles.screen}
      contentContainerStyle={commonStyles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <BackButton onPress={() => setVista('usuarios')} />

      <Text style={commonStyles.title}>
        Nuevo Usuario
      </Text>

      {/* NOMBRE */}
      <Text style={commonStyles.label}>Nombre</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Ej: Juan Pérez"
        value={nombre}
        onChangeText={setNombre}
      />

      {/* EMAIL */}
      <Text style={commonStyles.label}>Email</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="correo@empresa.cl"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* DEPARTAMENTO */}
      <Text style={commonStyles.label}>Departamento</Text>
      <TextInput
        style={commonStyles.input}
        placeholder="Ej: Flota, Robot, Mantención"
        value={departamento}
        onChangeText={setDepartamento}
      />

      {/* BOTÓN */}
      <TouchableOpacity
        style={commonStyles.successButton}
        onPress={handleSubmit}
      >
        <Text style={commonStyles.successButtonText}>
          Guardar usuario
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
