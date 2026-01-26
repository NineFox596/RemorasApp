import { View, Text } from 'react-native';
import { Vista } from '../types/Vista';

import BackButton from '../../components/BackButton';


export default function LoginScreen({
  setVista,
}: {
  setVista: (v: Vista) => void;
}) {
  return (
    <View style={{ padding: 16 }}>
      <BackButton onPress={() => setVista('menu')} />

      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
        Login
      </Text>

      <Text style={{ marginTop: 12 }}>
        Pantalla de login en construcción 🚧
      </Text>
    </View>
  );
}
