import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useUsuarios } from '../hooks/useUsuarios';
import { Vista } from '../types/Vista';
import BackButton from '../../components/BackButton';
import commonStyles from './styles/commonstyles';
import { useEffect } from 'react';


export default function UsuariosScreen({ setVista }: { setVista: (v: Vista) => void }) {
  const { usuarios } = useUsuarios();

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

      {usuarios.map(u => (
      <View key={u.id} style={commonStyles.card}>
        <Text style={commonStyles.cardTitle}>
          #{u.id} – {u.nombre}
       </Text>
       <Text style={commonStyles.textMuted}>
         {u.departamento}
       </Text>
      </View>
    ))}

    </ScrollView>
  );
}
