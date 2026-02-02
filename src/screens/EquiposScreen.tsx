import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useEquipos } from '../hooks/useEquipos';
import {
  getEquipoComponentes,
  EquipoComponente,
} from '../api/componentes';

import { getProblemas } from '../api/problemas';
import { eliminarEquipo } from '../api/equipos';
import { Problema, Equipo } from '../types/api';

import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';

type Props = {
  setVista: (v: Vista) => void;
  setEquipoSeleccionado: (equipo: Equipo) => void;
};

export default function EquiposScreen({
  setVista,
  setEquipoSeleccionado,
}: Props) {
  const { equipos, loading, error, refetch } = useEquipos();

  const [equipoAbierto, setEquipoAbierto] = useState<number | null>(null);
  const [componentes, setComponentes] = useState<EquipoComponente[]>([]);
  const [problemas, setProblemas] = useState<Problema[]>([]);

  useEffect(() => {
    getEquipoComponentes().then(setComponentes);
    getProblemas().then(setProblemas);
  }, []);

  const toggleEquipo = (id: number) => {
    setEquipoAbierto(prev => (prev === id ? null : id));
  };

  const handleEliminar = (id: number) => {
    Alert.alert(
      'Eliminar equipo',
      '¿Estás seguro que deseas eliminar este equipo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarEquipo(id);
              await refetch();
              Alert.alert('OK', 'Equipo eliminado correctamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el equipo');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={commonStyles.screen}>
        <Text>Cargando equipos...</Text>
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

      <Text style={commonStyles.title}>Equipos</Text>

      <TouchableOpacity
        style={commonStyles.successButton}
        onPress={() => setVista('nuevoEquipo')}
      >
        <Text style={commonStyles.successButtonText}>
          + Nuevo equipo
        </Text>
      </TouchableOpacity>

      {equipos.map(e => {
        const abierto = equipoAbierto === e.id;

        const componentesEquipo = componentes.filter(
          c => c.equipo_id === e.id
        );

        const problemasEquipo = problemas.filter(
          p => p.equipo_id === e.id && !p.reparado
        );

        return (
          <View key={e.id} style={commonStyles.card}>
            
            {/* HEADER */}
            <TouchableOpacity onPress={() => toggleEquipo(e.id)}>
              <Text style={commonStyles.cardTitle}>
                Equipo #{e.id} {abierto ? '▲' : '▼'}
              </Text>
              <Text style={commonStyles.textMuted}>
                Estado: {e.estado}
              </Text>
            </TouchableOpacity>

            {/* USUARIO */}
            <View style={commonStyles.userBox}>
              <Text style={commonStyles.sectionTitle}>
                Usuario asignado
              </Text>
              <Text style={commonStyles.textMuted}>
                {e.usuario
                  ? `${e.usuario.nombre} – ${e.departamento}`
                  : 'No asignado'}
              </Text>
            </View>

            {/* PROBLEMAS ACTIVOS */}
            {problemasEquipo.length > 0 && (
              <View style={{ marginTop: 10 }}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}>
                  ⚠ Problemas activos ({problemasEquipo.length})
                </Text>

                {problemasEquipo.map(p => (
                  <Text
                    key={p.id}
                    style={{ color: 'red', fontSize: 13 }}
                  >
                    • {p.descripcion}
                  </Text>
                ))}
              </View>
            )}

            {/* BOTONES */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                gap: 10,
              }}
            >
              <TouchableOpacity
                style={[
                  commonStyles.warningButton,
                  { flex: 1 }
                ]}
                onPress={() => {
                  setEquipoSeleccionado(e);
                  setVista('editarEquipo');
                }}
              >
                <Text style={commonStyles.warningButtonText}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  commonStyles.successButton,
                  { flex: 1, backgroundColor: '#c0392b' },
                ]}
                onPress={() => handleEliminar(e.id)}
              >
                <Text style={commonStyles.successButtonText}>
                  Eliminar
                </Text>
              </TouchableOpacity>
            </View>

            {/* COMPONENTES */}
            {abierto && (
              <View style={commonStyles.expand}>
                <Text style={commonStyles.sectionTitle}>
                  Componentes ({componentesEquipo.length})
                </Text>

                {componentesEquipo.length === 0 && (
                  <Text style={commonStyles.textMuted}>
                    – Sin componentes
                  </Text>
                )}

                {componentesEquipo.map((c, index) => (
                  <Text key={index} style={commonStyles.textMuted}>
                    • {c.nombre} ({c.tipo}) x{c.cantidad}
                  </Text>
                ))}
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}
