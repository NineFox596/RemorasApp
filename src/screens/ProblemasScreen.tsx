import { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { useProblemas } from '../hooks/useProblemas';
import { useEquipos } from '../hooks/useEquipos';
import { reportarProblemaEquipo } from '../api/problemas';
import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';

export default function ProblemasScreen({
  setVista,
}: {
  setVista: (v: Vista) => void;
}) {
  const { problemas, loading, error, reload } = useProblemas();
  const { equipos } = useEquipos();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [equipoId, setEquipoId] = useState<number | null>(null);

  const crearProblema = async () => {
  if (!equipoId || !descripcion.trim()) return;

  try {
    await reportarProblemaEquipo(equipoId, descripcion);
    setDescripcion('');
    setEquipoId(null);
    setMostrarForm(false);
    reload(); // 👈 esto es clave
  } catch (error) {
    console.error(error);
  }
};


  if (loading) {
    return (
      <View style={commonStyles.screen}>
        <Text>Cargando problemas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={commonStyles.screen}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={commonStyles.screen}
      contentContainerStyle={commonStyles.scrollContent}
    >
      <BackButton onPress={() => setVista('menu')} />
      <Text style={commonStyles.title}>Problemas</Text>

      {/* BOTÓN AÑADIR */}
      <TouchableOpacity
        style={commonStyles.addButton}
        onPress={() => setMostrarForm(!mostrarForm)}
      >
        <Text style={commonStyles.addButtonText}>
          ➕ Añadir problema
        </Text>
      </TouchableOpacity>

      {/* FORMULARIO */}
      {mostrarForm && (
        <View style={commonStyles.card}>
          <Text style={commonStyles.cardTitle}>
            Nuevo problema
          </Text>

          {/* SELECCIONAR EQUIPO */}
          {equipos.map(e => (
            <TouchableOpacity
              key={e.id}
              style={[
                commonStyles.selectItem,
                equipoId === e.id &&
                  commonStyles.selectItemActive,
              ]}
              onPress={() => setEquipoId(e.id)}
            >
              <Text>
                Equipo #{e.id} · {e.departamento}
              </Text>
              <Text>
                Usuario:{' '}
                {e.usuario?.nombre ?? 'Sin asignar'}
              </Text>
            </TouchableOpacity>
          ))}

          {/* DESCRIPCIÓN */}
          <TextInput
            placeholder="Describe el problema"
            value={descripcion}
            onChangeText={setDescripcion}
            style={commonStyles.input}
            multiline
          />

          {/* GUARDAR */}
          <TouchableOpacity
            style={commonStyles.confirmButton}
            onPress={crearProblema}
          >
            <Text style={commonStyles.confirmButtonText}>
              Guardar problema
            </Text>
          </TouchableOpacity>

          {/* CANCELAR */}
          <TouchableOpacity
            onPress={() => setMostrarForm(false)}
          >
            <Text style={commonStyles.cancelText}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* LISTADO DE PROBLEMAS */}
      {problemas.map(p => {
        const equipo = equipos.find(
          e => e.id === p.equipo_id
        );

        return (
          <View key={p.id} style={commonStyles.card}>
            <Text style={commonStyles.cardTitle}>
              Equipo #{p.equipo_id}
            </Text>

            <Text style={commonStyles.subtitle}>
              Usuario:{' '}
              {equipo?.usuario?.nombre ?? 'Sin asignar'}
            </Text>

            <Text style={commonStyles.meta}>
              Departamento:{' '}
              {equipo?.departamento ?? '—'}
            </Text>

            <Text
              style={commonStyles.problemDescription}
            >
              {p.descripcion}
            </Text>

            <Text
              style={[
                commonStyles.status,
                p.reparado
                  ? commonStyles.statusOk
                  : commonStyles.statusPending,
              ]}
            >
              {p.reparado ? 'Reparado' : 'Pendiente'}
            </Text>
          </View>
        );
      })}

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}
