import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { getEquipoComponentes, EquipoComponente } from '../api/componentes';
import { Vista } from '../types/Vista';

import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';

export default function ComponentesScreen({
  setVista,
}: {
  setVista: (v: Vista) => void;
}) {
  const [componentes, setComponentes] = useState<EquipoComponente[]>([]);

  useEffect(() => {
    getEquipoComponentes().then(setComponentes);
  }, []);

  return (
    <ScrollView
      style={commonStyles.screen}
      contentContainerStyle={commonStyles.scrollContent}
    >
      <BackButton onPress={() => setVista('menu')} />

      {componentes.map((c, index) => (
        <View
          key={`${c.equipo_id}-${index}`}
          style={commonStyles.componentCard}
        >
          <View style={commonStyles.componentHeader}>
            <Text style={commonStyles.componentTitle}>
              {c.nombre}
            </Text>
            <Text style={commonStyles.componentSubtitle}>
              {c.tipo}
            </Text>
          </View>

          <View style={commonStyles.componentDetails}>
            <View style={commonStyles.componentRow}>
              <Text style={commonStyles.componentLabel}>Cantidad</Text>
              <Text style={commonStyles.componentValue}>
                {c.cantidad}
              </Text>
            </View>

            <Text style={commonStyles.textMuted}>
              {c.descripcion}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
