import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Vista } from '../types/Vista';


export default function MenuScreen({ setVista }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Remoras</Text>

      <MenuButton title="Usuarios" onPress={() => setVista('usuarios')} />
      <MenuButton title="Equipos" onPress={() => setVista('equipos')} />
      <MenuButton title="Problemas" onPress={() => setVista('problemas')} />
      <MenuButton title="Componentes" onPress={() => setVista('componentes')} />
    {/* <MenuButton title="Login" onPress={() => setVista('login')} /> */}
    </View>
  );
}

function MenuButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24 },
  button: {
    backgroundColor: '#2563eb',
    padding: 18,
    borderRadius: 14,
    marginBottom: 16,
    alignItems: 'center',
  },
  text: { color: '#fff', fontSize: 20 },
});
