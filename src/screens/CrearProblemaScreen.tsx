import { View, Text, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { RouteProp, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useCrearProblema } from '../hooks/useCrearProblema';
import type { ProblemasStackParamList } from '../navigation/stacks/ProblemasStack';

type CrearProblemaRouteProp = RouteProp<
  ProblemasStackParamList,
  'CrearProblema'
>;

type NavigationProp = NativeStackNavigationProp<
  ProblemasStackParamList,
  'CrearProblema'
>;

type Props = {
  route: CrearProblemaRouteProp;
};

export function CrearProblemaScreen({ route }: Props) {
  const { equipoId } = route.params;
  const navigation = useNavigation<NavigationProp>();

  const [descripcion, setDescripcion] = useState('');

  const {
    problema,
    loading,
    error,
    crear,
  } = useCrearProblema(
    descripcion
      ? { equipoId, descripcion }
      : null
  );

  useEffect(() => {
    if (problema) {
      navigation.goBack();
    }
  }, [problema, navigation]);

  return (
    <View>
      <Text>Reportar problema</Text>

      <TextInput
        placeholder="Descripción del problema"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      {error && <Text>{error}</Text>}

      <Button
        title={loading ? 'Enviando...' : 'Crear problema'}
        onPress={crear}
        disabled={!descripcion || loading}
      />
    </View>
  );
}
