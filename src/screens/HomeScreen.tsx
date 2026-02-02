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
import EditarEquipoScreen from './EditarEquipoScreen';

import { Vista } from '../types/Vista';
import { Equipo } from '../types/api';

export function HomeScreen() {
  const [vista, setVista] = useState<Vista>('menu');
  const [equipoSeleccionado, setEquipoSeleccionado] =
    useState<Equipo | null>(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {vista === 'menu' && <MenuScreen setVista={setVista} />}

      {vista === 'usuarios' && (
        <UsuariosScreen setVista={setVista} />
      )}

      {vista === 'nuevoUsuario' && (
        <NuevoUsuarioScreen setVista={setVista} />
      )}

      {vista === 'equipos' && (
        <EquiposScreen
          setVista={setVista}
          setEquipoSeleccionado={setEquipoSeleccionado}
        />
      )}

      {vista === 'nuevoEquipo' && (
        <NuevoEquipoScreen setVista={setVista} />
      )}

      {vista === 'editarEquipo' && equipoSeleccionado && (
        <EditarEquipoScreen
          setVista={setVista}
          equipo={equipoSeleccionado}
        />
      )}

      {vista === 'problemas' && (
        <ProblemasScreen setVista={setVista} />
      )}

      {vista === 'componentes' && (
        <ComponentesScreen setVista={setVista} />
      )}

      {vista === 'login' && (
        <LoginScreen setVista={setVista} />
      )}
    </SafeAreaView>
  );
}
