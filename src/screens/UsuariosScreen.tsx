import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useEquipos } from '../hooks/useEquipos';
import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';

export default function UsuariosScreen({
  setVista,
}: {
  setVista: (v: Vista) => void;
}) {
  const { equipos } = useEquipos();

  return (
    <ScrollView
      style={commonStyles.screen}
      contentContainerStyle={commonStyles.scrollContent}
    >
      <BackButton onPress={() => setVista('menu')} />

      <TouchableOpacity
        style={commonStyles.successButton}
        onPress={() => setVista('nuevoUsuario')}
      >
        <Text style={commonStyles.successButtonText}>
          + Nuevo usuario
        </Text>
      </TouchableOpacity>

      {equipos
        .filter(e => e.usuario)
        .map(e => (
          <View key={`${e.id}-${e.usuario!.id}`} style={commonStyles.card}>
            <Text style={commonStyles.cardTitle}>
              {e.usuario!.nombre}
            </Text>
            <Text style={commonStyles.textMuted}>
              Equipo #{e.id}
            </Text>
          </View>
        ))}
    </ScrollView>
  );
}
