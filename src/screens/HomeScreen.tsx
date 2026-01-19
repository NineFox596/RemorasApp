import { View, Text, Button, ScrollView } from 'react-native';
import { useProblemas } from '../hooks/useProblemas';

export function HomeScreen() {
  const { problemas, loading, error, reload } = useProblemas();

  if (loading) return <Text>Cargando...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <ScrollView>
      {problemas.map(p => (
        <View key={p.id} style={{ padding: 10, borderBottomWidth: 1 }}>
          <Text>{p.descripcion}</Text>
          <Text>Equipo: {p.equipo_nombre}</Text>
          <Text>Estado: {p.reparado ? 'Reparado' : 'Pendiente'}</Text>
        </View>
      ))}
      <Button title="Recargar" onPress={reload} />
    </ScrollView>
  );
}
