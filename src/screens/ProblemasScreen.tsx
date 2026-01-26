import { ScrollView, View, Text } from 'react-native';
import { useProblemas } from '../hooks/useProblemas';
import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';

export default function ProblemasScreen({
  setVista,
}: {
  setVista: (v: Vista) => void;
}) {
  const { problemas, loading, error } = useProblemas();

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

      {problemas.map(p => (
        <View key={p.id} style={commonStyles.card}>
          <Text style={commonStyles.cardTitle}>
            Equipo #{p.equipo_id}
          </Text>

          <Text style={commonStyles.problemDescription}>
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
      ))}

      {/* espacio al final */}
      <View style={{ height: 24 }} />
    </ScrollView>
  );
}
