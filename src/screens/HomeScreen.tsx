import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuScreen from './MenuScreen';
import UsuariosScreen from './UsuariosScreen';
import NuevoUsuarioScreen from './NuevoUsuarioScreen';
import EquiposScreen from './EquiposScreen';
import ProblemasScreen from './ProblemasScreen';
import ComponentesScreen from './ComponentesScreen';
import LoginScreen from './LoginScreen';
import NuevoEquipoScreen from './NuevoEquipoScreen';

import { Vista } from '../types/Vista';

export function HomeScreen() {
  const [vista, setVista] = useState<Vista>('menu');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {vista === 'menu' && <MenuScreen setVista={setVista} />}
      {vista === 'usuarios' && <UsuariosScreen setVista={setVista} />}
      {vista === 'nuevoUsuario' && (
        <NuevoUsuarioScreen setVista={setVista} />
      )}
      {vista === 'equipos' && <EquiposScreen setVista={setVista} />}
      {vista === 'nuevoEquipo' && (
        <NuevoEquipoScreen setVista={setVista} />)}

      {vista === 'problemas' && <ProblemasScreen setVista={setVista} />}
      {vista === 'componentes' && <ComponentesScreen setVista={setVista} />}
      {vista === 'login' && <LoginScreen setVista={setVista} />}
    </SafeAreaView>
  );
}
