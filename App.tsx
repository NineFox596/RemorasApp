import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNetworkStatus } from './src/hooks/useNetworkStatus';
import OfflineBanner from './src/components/OfflineBanner';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const { isConnected } = useNetworkStatus();

  return (
    <View className="flex-1">
      {!isConnected && <OfflineBanner />}

      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
}
