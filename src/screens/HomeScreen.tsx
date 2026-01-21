import { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useEquipos } from '../hooks/useEquipos';
import { useProblemas } from '../hooks/useProblemas';
import { getEquipoComponentes, EquipoComponente } from '../api/componentes';

type Vista = 'menu' | 'equipos' | 'problemas' | 'componentes';

export function HomeScreen() {
  const [vista, setVista] = useState<Vista>('menu');
  const [equipoAbierto, setEquipoAbierto] = useState<number | null>(null);

  const { equipos, loading, error } = useEquipos();
  const { problemas } = useProblemas();

  const [componentes, setComponentes] = useState<EquipoComponente[]>([]);

  const toggleEquipo = (id: number) => {
    setEquipoAbierto(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    getEquipoComponentes().then(setComponentes);
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.centerText}>Cargando datos...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.centerText}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Remoras</Text>

        {/* ---------- MENÚ ---------- */}
        {vista === 'menu' && (
          <View style={styles.menu}>
            <MenuButton title="Equipos" onPress={() => setVista('equipos')} />
            <MenuButton title="Problemas" onPress={() => setVista('problemas')} />
            <MenuButton
              title="Componentes"
              onPress={() => setVista('componentes')}
            />
          </View>
        )}

        {/* ---------- EQUIPOS ---------- */}
        {vista === 'equipos' && (
          <View style={styles.content}>
            <BackButton onPress={() => setVista('menu')} />

            {equipos.map(e => {
              const abierto = equipoAbierto === e.id;

              const componentesEquipo = componentes.filter(
                c => c.equipo_id === e.id
              );

              const problemasEquipo = problemas.filter(
                p => p.equipo_id === e.id
              );

              return (
                <View key={e.id} style={styles.card}>
                  <TouchableOpacity onPress={() => toggleEquipo(e.id)}>
                    <Text style={styles.cardTitle}>
                      Equipo #{e.id} {abierto ? '▲' : '▼'}
                    </Text>
                    <Text>Estado: {e.estado}</Text>
                    <Text>
                      {e.departamento} – {e.ubicacion}
                    </Text>
                  </TouchableOpacity>

                  {abierto && (
                    <View style={styles.expand}>
                      <Text style={styles.sectionTitle}>Usuario asignado</Text>
                      <Text>- {e.usuario?.nombre ?? 'No asignado'}</Text>

                      <Text style={styles.sectionTitle}>
                        Componentes ({componentesEquipo.length})
                      </Text>

                      {componentesEquipo.length === 0 && (
                        <Text>- Sin componentes</Text>
                      )}

                      {componentesEquipo.map((c, i) => (
                        <Text key={i}>
                          • {c.nombre} ({c.tipo}) x{c.cantidad}
                        </Text>
                      ))}

                      <Text style={styles.sectionTitle}>
                        Problemas ({problemasEquipo.length})
                      </Text>

                      {problemasEquipo.length === 0 && (
                        <Text>- Sin problemas</Text>
                      )}

                      {problemasEquipo.map(p => (
                        <Text key={p.id}>
                          • {p.descripcion} [{p.reparado ? 'OK' : 'Pendiente'}]
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* ---------- PROBLEMAS ---------- */}
        {vista === 'problemas' && (
          <View style={styles.content}>
            <BackButton onPress={() => setVista('menu')} />
            {problemas.map(p => (
              <View key={p.id} style={styles.card}>
                <Text style={styles.cardTitle}>Equipo {p.equipo_id}</Text>
                <Text>{p.descripcion}</Text>
                <Text>
                  Estado: {p.reparado ? 'Reparado' : 'Pendiente'}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* ---------- COMPONENTES ---------- */}
        {vista === 'componentes' && (
          <View style={styles.content}>
            <BackButton onPress={() => setVista('menu')} />
            {componentes.map((c, i) => (
              <View key={i} style={styles.card}>
                <Text style={styles.cardTitle}>{c.nombre}</Text>
                <Text>Tipo: {c.tipo}</Text>
                <Text>Cantidad: {c.cantidad}</Text>
                <Text>{c.descripcion}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- COMPONENTES REUTILIZABLES ---------- */

function MenuButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <Text style={styles.menuButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Text style={styles.backButtonText}>← Volver</Text>
    </TouchableOpacity>
  );
}

/* ---------- ESTILOS ---------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    padding: 16,
    paddingBottom: 32,
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },

  centerText: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18,
  },

  menu: {
    width: '100%',
    maxWidth: 360,
    gap: 16,
  },

  menuButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
  },

  menuButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  content: {
    width: '100%',
    maxWidth: 600,
  },

  backButton: {
    marginBottom: 16,
  },

  backButtonText: {
    fontSize: 18,
    color: '#2563eb',
  },

  card: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 6,
  },

  expand: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
  },

  sectionTitle: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
