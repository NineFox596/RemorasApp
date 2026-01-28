import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useEquipos } from '../hooks/useEquipos';
import {
  getEquipoComponentes,
  EquipoComponente,
} from '../api/componentes';

import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';

export default function EquiposScreen({
  setVista,
}: {
  setVista: (v: Vista) => void;
}) {
  const { equipos, loading, error } = useEquipos();

  const [equipoAbierto, setEquipoAbierto] = useState<number | null>(null);
  const [componentes, setComponentes] = useState<EquipoComponente[]>([]);

  useEffect(() => {
    getEquipoComponentes().then(setComponentes);
  }, []);

  const toggleEquipo = (id: number) => {
    setEquipoAbierto(prev => (prev === id ? null : id));
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

            {/* USUARIO – SIEMPRE VISIBLE */}
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

            {/* EXPAND – SOLO COMPONENTES */}
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
