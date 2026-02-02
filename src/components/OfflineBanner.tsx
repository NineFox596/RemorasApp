import { View, Text } from 'react-native';

export default function OfflineBanner() {
  return (
    <View className="bg-orange-500 px-4 py-2">
      <Text className="text-white text-center text-sm">
        Sin conexión a internet. Algunas acciones no están disponibles.
      </Text>
    </View>
  );
}
