import { ScrollView, Text, View } from 'react-native';
import { useEquipos } from '../hooks/useEquipos';
import { useProblemas } from '../hooks/useProblemas';
import { getEquipoComponentes, EquipoComponente } from '../api/componentes';
import { useEffect, useState } from 'react';

export function HomeScreen() {
  const { equipos, loading, error } = useEquipos();
  const { problemas } = useProblemas();

  const [componentes, setComponentes] = useState<EquipoComponente[]>([]);

  useEffect(() => {
    getEquipoComponentes().then(setComponentes);
  }, []);

  if (loading) return <Text>Cargando equipos...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
        Equipos (Debug)
      </Text>

      {equipos.map(e => {
        const componentesEquipo = componentes.filter(
          c => c.equipo_id === e.id
        );

        const problemasEquipo = problemas.filter(
          p => p.equipo_id === e.id
        );

        return (
          <View
            key={e.id}
            style={{
              marginVertical: 12,
              padding: 12,
              borderWidth: 1,
            }}
          >
            <Text>Equipo ID: {e.id}</Text> 
            <Text>Estado: {e.estado}</Text>
            <Text>
              Departamento: {e.departamento} ({e.ubicacion})
            </Text>

            <Text style={{ marginTop: 8, fontWeight: 'bold' }}>
              Componentes ({componentesEquipo.length})
            </Text>

            {componentesEquipo.length === 0 && (
              <Text>- Sin componentes</Text>
            )}

            {componentesEquipo.map((c, idx) => (
              <Text key={`${c.componente_id}-${idx}`}>
                - {c.nombre} ({c.tipo}) x{c.cantidad}
                {'\n'}  {c.descripcion}
              </Text>
            ))}

            <Text style={{ marginTop: 8, fontWeight: 'bold' }}>
              Problemas ({problemasEquipo.length})
            </Text>

            {problemasEquipo.length === 0 && (
              <Text>- Sin problemas</Text>
            )}

            {problemasEquipo.map(p => (
              <Text key={p.id}>
                - {p.descripcion} [{p.reparado ? 'OK' : 'Pendiente'}]
              </Text>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}
